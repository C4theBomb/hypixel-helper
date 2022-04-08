import axios from 'axios';

async function getUserForgeData(username, profileID) {
    const data = await axios
        .get(`https://sky.shiiyu.moe/api/v2/profile/${username}`)
        .then((res) => res.data);

    const forgeData = data.profiles[profileID]?.data?.mining?.forge;

    return forgeData;
}

async function getAuctions() {
    const totalPages = await axios
        .get('https://api.hypixel.net/skyblock/auctions')
        .then((res) => res.data.totalPages);

    const auctionPages = await Promise.allSettled(
        Array.from(Array(totalPages)).map((_, i) => {
            return axios.get(`https://api.hypixel.net/skyblock/auctions`, {
                params: { page: i },
            });
        })
    ).then((responses) =>
        responses.filter((response) => response.status === 'fulfilled')
    );

    return auctionPages
        .reduce((acc, response) => acc.concat(response.value.data.auctions), [])
        .filter((auction) => auction.bin);
}

async function getBazaar() {
    const data = await axios
        .get('https://api.hypixel.net/skyblock/bazaar')
        .then((res) => res.data.products);

    return Object.keys(data).reduce((acc, key) => acc.concat(data[key]), []);
}

async function getItems() {
    return await axios
        .get('https://api.hypixel.net/resources/skyblock/items')
        .then((res) => res.data.items);
}

export { getAuctions, getBazaar, getItems, getUserForgeData };
