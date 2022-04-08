import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import BitsToCoin from './components/BitsToCoin';
import NPCUser from './components/NPCUser';

function ExternLink({ to }) {
    window.location.replace(to);
    return null;
}

function App() {
    const [user, setUser] = useState({
        username: '',
        uuid: '',
        profileID: '',
    });

    const MinionLink = () => (
        <ExternLink
            to={`https://hyminions.herokuapp.com/minions?name=${user.username}`}
        />
    );
    const ForgeLink = () => (
        <ExternLink
            to={`https://hyminions.herokuapp.com/forge?name=${user.username}`}
        />
    );
    const SlotLink = () => (
        <ExternLink
            to={`https://hyminions.herokuapp.com/minionscost?name=${user.username}`}
        />
    );
    const EventsLink = () => (
        <ExternLink to={`https://hyminions.herokuapp.com/events`} />
    );
    const BazaarLink = () => <ExternLink to='https://bazaartracker.com/' />;
    const AuctionLink = () => (
        <ExternLink to='https://www.brandonfowler.me/skyblockah/' />
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<Navbar user={[user, setUser]} />}>
                    <Route index element={<MainPage user={user} />} />

                    <Route path='calculators'>
                        <Route path='bits-to-coin' element={<BitsToCoin />} />
                        <Route path='minion' element={<MinionLink />} />
                        <Route path='forge' element={<ForgeLink />} />
                        <Route path='slot' element={<SlotLink />} />
                    </Route>

                    <Route path='npc-user' element={<NPCUser />} />
                    <Route path='events' element={<EventsLink />} />
                    <Route path='auction-house' element={<AuctionLink />} />
                    <Route path='bazaar' element={<BazaarLink />} />

                    <Route path='*' element={<Navigate to='' />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
