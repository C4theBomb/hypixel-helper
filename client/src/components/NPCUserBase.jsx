import React, { useState, useEffect } from 'react';

import {
    Button,
    FormGroup,
    Paper,
    TextField,
    Typography,
    Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

function NPCUser({ handleSubmit, itemData }) {
    const theme = useTheme();

    const [search, setSearch] = useState('');

    function handleSearchChange(e) {
        setSearch(() => e.target.value);
    }

    return (
        <Paper
            sx={{
                ...theme.typography.body2,
                padding: '2vh',
                color: theme.palette.text.secondary,
                flexGrow: 1,
                height: '89vh',
                margin: '2vh',
                overflowY: 'auto',
            }}
        >
            <Typography textAlign='center'>NPC Price</Typography>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <TextField
                        label='Item Name'
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <Button
                        type='submit'
                        color='inherit'
                        variant='outlined'
                        disableElevation
                        sx={{ padding: '0.5vh' }}
                    >
                        Submit
                    </Button>
                </FormGroup>
            </form>
            <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={2}
                sx={{ height: '70vh' }}
            >
                {itemData ? (
                    <Typography textAlign='center'>
                        An {search} sells for {itemData} coins to an NPC
                    </Typography>
                ) : (
                    <Typography textAlign='center'>
                        This item cannot be sold to NPCs
                    </Typography>
                )}
            </Stack>
        </Paper>
    );
}

export default NPCUser;
