import React, { useState, useEffect } from 'react';

import NPCUserBase from '../components/NPCUserBase';
import { getItems } from '../utils/getData';

function NPCUser() {
    const [itemData, setItemData] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        const items = await getItems();

        const data = items
            .filter((item) => item.name === search)
            .map((item) => item.npc_sell_price);

        setItemData(() => data[0]);
    }

    return <NPCUserBase handleSubmit={handleSubmit} itemData={itemData} />;
}

export default NPCUser;
