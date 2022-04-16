import React, { useState, useEffect } from 'react';

import {
    Grid,
    Typography,
    Divider,
    Button,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function UserDisplayBase({ forges, auctions, forgeData, auctionData }) {
    return (
        <Grid container spacing={2} sx={{ flexGrow: 1, height: '85vh' }}>
            <Grid item xs={6}>
                <Typography variant='h6' textAlign='center'>
                    Forges
                </Typography>
                <Divider>
                    <Button onClick={forgeData}>Refresh</Button>
                </Divider>
                <Stack>
                    {Array.isArray(forges) ? (
                        forges.map((forge) => (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    Slot {forge.slot}: {forge.name}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Complete: {forge.timeFinishedText}
                                    </Typography>
                                    <Typography>
                                        Exact Time:{' '}
                                        {Date.parse(forge.timeFinished)}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Typography textAlign='center'>{forges}</Typography>
                    )}
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h6' textAlign='center'>
                    Auctions
                </Typography>
                <Divider>
                    <Button onClick={auctionData}>Refresh</Button>
                </Divider>
                <Stack>
                    {Array.isArray(auctions) ? (
                        auctions.map((auction) => (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    {auction.item_name} ({auction.tier})
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Starting Bid: {auction.starting_bid}
                                    </Typography>
                                    <Typography>
                                        Highest Bid:{' '}
                                        {auction.highest_bid_amount}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Typography textAlign='center'>{auctions}</Typography>
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
}

export default UserDisplayBase;
