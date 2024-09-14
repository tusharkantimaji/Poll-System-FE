// src/context/GlobalState.js

import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null); // Add role state

    return (
        <GlobalContext.Provider value={{ userId, setUserId, role, setRole }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
