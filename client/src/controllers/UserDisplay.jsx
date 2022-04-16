import React, { useState, useEffect } from 'react';

import { getAuctions, getUserForgeData } from '../utils/getData';

function UserDisplay({ user }) {
    const [forges, setForges] = useState([]);
    const [auctions, setAuctions] = useState([]);

    useEffect(forgeData, []);
    useEffect(auctionData, []);

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
        <UserDisplayBase
            forges={forges}
            auctions={auctions}
            forgeData={forgeData}
            auctionData={auctionData}
        />
    );
}

export default UserDisplay;
