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

import { getAuctions } from '../utils/getData';

function BitsToCoin() {
    const theme = useTheme();

    const [bitAuctions, setBitAuctions] = useState([]);

    useEffect(() => getBitAuctions(), []);

    async function getBitAuctions() {
        const bits = await fetch('../data.json').then((response) =>
            response.json()
        );

        const auctions = await getAuctions().then(async (auctions) => {
            const bitsItems = auctions.filter((auction) =>
                Object.keys(bits).includes(auction.item_name)
            );

            return groupBy(bitsItems, 'item_name');
        });

        const data = Object.keys(auctions).reduce((acc, key) => {
            const prices = auctions[key]
                .map(({ starting_bid }) => starting_bid)
                .sort((a, b) => a - b);

            const effectiveLength = prices.length > 10 ? 10 : prices.length;

            const averagePrice = Math.round(
                prices
                    .slice(0, effectiveLength)
                    .reduce((acc, price) => acc + price, 0) / effectiveLength
            );

            acc.push({
                name: key,
                lowestBid: prices[0],
                count: prices.length,
                bitsToCoin: Math.round(prices[0] / bits[key].cost),
                averagePrice,
            });

            return acc;
        }, []);

        setBitAuctions(() => data.sort((a, b) => b.bitsToCoin - a.bitsToCoin));
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

export default BitsToCoin;
