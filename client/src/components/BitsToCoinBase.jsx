import React, { useState, useEffect } from 'react';
import { groupBy } from 'lodash';

import {
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Button,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

function BitsToCoinBase(bitAuctions, getBitAuctions) {
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
            <Typography variant='h6' textAlign='center'>
                Best Bits to Coin Items
            </Typography>
            <Divider sx={{ paddingBottom: '2vh' }}>
                <Button onClick={getBitAuctions}>Refresh</Button>
            </Divider>
            {bitAuctions ? (
                bitAuctions.map((item) => (
                    <Accordion key={item.name}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            {item.name} ({item.bitsToCoin})
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lowest Bid: {item.lowestBid}
                            </Typography>
                            <Typography>
                                Average Price: {item.averagePrice}
                            </Typography>
                            <Typography>
                                Number of Auctions: {item.count}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography textAlign='center'>Loading...</Typography>
            )}
        </Paper>
    );
}

export default BitsToCoinBase;
