import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    FormControl,
    FormGroup,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import axiosGet from '../utils/axiosGet';
import PageBase from './utils/PageBase';
import BaseLink from './utils/BaseLink';

function Navbar(props) {
    const [user, setUser] = props.user;
    const [username, setUsername] = useState('');
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [profiles, setProfiles] = useState([]);
    const [menu, setMenus] = useState({
        anchorEl: null,
        open: '',
    });

    const linkStyle = { textDecoration: 'none', color: 'inherit' };
    const darkTheme = createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 768,
                md: 1024,
            },
        },
    });

    function handleProfileChange(e) {
        setUser((initial) => ({ ...initial, [e.target.name]: e.target.value }));
    }

    function handleUsernameChange(e) {
        setUsername(() => e.target.value);
    }

    function handleMenuOpen(e) {
        setMenus(() => ({ anchorEl: e.target, open: e.target.name }));
    }

    function handleMenuClose() {
        setMenus(() => ({ anchorEl: null, open: '' }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await axiosGet(`https://api.ashcon.app/mojang/v2/user/${username}`)
            .then(async (res) => {
                setUser((initial) => ({
                    ...initial,
                    uuid: res.data.uuid,
                    username,
                }));

                return await axiosGet(
                    `https://api.hypixel.net/skyblock/profiles`,
                    {
                        uuid: res.data.uuid,
                        key: process.env.REACT_APP_API_KEY,
                    }
                );
            })
            .then((res) => {
                setUser((initial) => ({ ...initial, profile: '' }));
                setProfiles([]);
                const data = res.data.profiles;
                if (data) {
                    const profiles = res.data.profiles.map((profile) => {
                        const { profile_id, cute_name } = profile;
                        return { profileID: profile_id, cuteName: cute_name };
                    });
                    setProfiles(() => profiles);
                }
            });
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ margin: '0 2vh 0 0' }}
                    >
                        <Link to='/' style={linkStyle}>
                            Hypixel Helper
                        </Link>
                    </Typography>

                    <Button
                        onClick={handleMenuOpen}
                        name='calculators'
                        color='inherit'
                    >
                        Calculators
                    </Button>
                    <Button
                        onClick={handleMenuOpen}
                        name='misc'
                        color='inherit'
                    >
                        Misc
                    </Button>

                    <Menu
                        anchorEl={menu.anchorEl}
                        open={menu.open === 'calculators'}
                        onClose={handleMenuClose}
                        name='calculators'
                    >
                        <MenuItem>
                            <BaseLink to='calculators/bits-to-coin'>
                                Best Bits to Coin
                            </BaseLink>
                        </MenuItem>
                        <MenuItem>
                            <BaseLink to='calculators/minion'>
                                Minion Profit
                            </BaseLink>
                        </MenuItem>
                        <MenuItem>
                            <BaseLink to='calculators/forge'>
                                Best Forges
                            </BaseLink>
                        </MenuItem>
                        <MenuItem>
                            <BaseLink to='calculators/slot'>
                                Optimal Minion Slot
                            </BaseLink>
                        </MenuItem>
                    </Menu>
                    <Menu
                        anchorEl={menu.anchorEl}
                        open={menu.open === 'misc'}
                        onClose={handleMenuClose}
                        name='misc'
                    >
                        <MenuItem>
                            <BaseLink to='auction-house'>
                                Auction Item Comparison
                            </BaseLink>
                        </MenuItem>
                        <MenuItem>
                            <BaseLink to='events'>Events</BaseLink>
                        </MenuItem>
                        <MenuItem>
                            <BaseLink to='bazaar'>Bazaar Trends</BaseLink>
                        </MenuItem>
                        <MenuItem>
                            <BaseLink to='npc-user'>NPC Price</BaseLink>
                        </MenuItem>
                    </Menu>

                    <Box sx={{ flexGrow: 1 }} />
                    {profiles.length !== 0 && (
                        <FormControl sx={{ width: '20vw' }}>
                            <InputLabel>Select Profile</InputLabel>
                            <Select
                                value={user.profileID}
                                onChange={handleProfileChange}
                                label='Profile'
                                name='profileID'
                            >
                                {profiles.map((profile, index) => (
                                    <MenuItem
                                        value={profile.profileID}
                                        key={index}
                                    >
                                        {profile.cuteName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <form onSubmit={handleSubmit}>
                        <FormGroup row>
                            <TextField
                                label='Username'
                                name='username'
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <Button
                                type='submit'
                                color='inherit'
                                variant='outlined'
                                disableElevation
                                sx={{ padding: '0 3vh' }}
                            >
                                Submit
                            </Button>
                        </FormGroup>
                    </form>
                </Toolbar>
            </AppBar>
            <PageBase>
                <Outlet />
            </PageBase>
        </ThemeProvider>
    );
}

export default Navbar;
