// src/context/GlobalState.js

import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    return (
        <GlobalContext.Provider value={{ userId, setUserId }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;