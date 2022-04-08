import React from 'react';

import { Box, Grid, Stack } from '@mui/material';

function PageBase({ children }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={2}
                alignItems='center'
                style={{ height: '95vh' }}
            >
                <Grid item xs />
                <Grid item xs={11}>
                    <Stack spacing={2}>{children}</Stack>
                </Grid>
                <Grid item xs />
            </Grid>
        </Box>
    );
}

export default PageBase;
