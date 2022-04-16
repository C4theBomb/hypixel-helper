import React, { useState } from 'react';

import axiosGet from '../utils/axiosGet';
import NavbarBase from '../components/NavbarBase';

function Navbar(props) {
    const [user, setUser] = props.user;
    const [username, setUsername] = useState('');

    const [profiles, setProfiles] = useState([]);

    function handleProfileChange(e) {
        setUser((initial) => ({ ...initial, [e.target.name]: e.target.value }));
    }

    function handleUsernameChange(e) {
        setUsername(() => e.target.value);
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
        <NavbarBase
            user={user}
            profiles={profiles}
            handleUsernameChange={handleUsernameChange}
            handleProfileChange={handleProfileChange}
        />
    );
}

export default Navbar;
