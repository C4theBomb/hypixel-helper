import React from 'react';

import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import UserDisplay from './UserDisplay';

function MainPage({ user }) {
    const theme = useTheme();

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
            {user.profileID ? (
                <UserDisplay user={user} />
            ) : (
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    sx={{ flexGrow: 1, height: '85vh' }}
                >
                    <Typography>Nothing to see here</Typography>
                </Box>
            )}
        </Paper>
    );
}

export default MainPage;
