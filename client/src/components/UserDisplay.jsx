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

import { getAuctions, getUserForgeData } from '../utils/getData';

function UserDisplay({ user }) {
    const [forges, setForges] = useState([]);
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        forgeData();
        auctionData();
    }, []);

    async function forgeData() {
        const data = await getUserForgeData(user.username, user.profileID);

        setForges(() =>
            data?.processes
                ? data.processes
                : 'You have no forges currently running'
        );
    }

    async function auctionData() {
        const data = await getAuctions();

        const auctions = data.filter(
            (auction) => auction.profile_id === user.profileID
        );

        setAuctions(() =>
            auctions.length > 0
                ? auctions
                : 'You have no auctions currently running'
        );
    }

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

export default UserDisplay;
