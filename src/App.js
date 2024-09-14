// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RoleSelection from './components/RoleSelection';
import NameInput from './components/NameInput';
import AddPoll from './components/AddPoll';
import GetQuestion from './components/GetQuestion';
import GlobalProvider from './context/GlobalState';

function App() {
    return (
        <GlobalProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<RoleSelection />} />
                        <Route path="/name" element={<NameInput />} />
                        <Route path="/add-poll" element={<AddPoll />} />
                        <Route path="/get-question" element={<GetQuestion />} />
                    </Routes>
                </div>
            </Router>
        </GlobalProvider>
    );
}

export default App;
