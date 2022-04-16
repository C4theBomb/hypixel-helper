import React, { useState, useEffect } from 'react';
import { groupBy } from 'lodash';

import { getAuctions } from '../utils/getData';
import BitsToCoinBase from '../components/BitsToCoinBase';

function BitsToCoin() {
    const [bitAuctions, setBitAuctions] = useState([]);

    useEffect(getBitAuctions, []);

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
        <BitsToCoinBase
            bitAuctions={bitAuctions}
            getBitAuctions={getBitAuctions}
        />
    );
}

export default BitsToCoin;
