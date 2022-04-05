import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    const [profile, setProfile] = useState({
        uuid: '',
        profileID: '',
    });

    const UserContext = createContext([profile, setProfile]);

    return (
        <UserContext.Provider>
            <BrowserRouter>
                <Routes>
                    <Route path=''></Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
