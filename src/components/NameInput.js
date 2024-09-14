// src/components/NameInput.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const NameInput = () => {
    const [name, setName] = useState('');
    const { role, setUserId } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const apiUrl = role === 'student' ? 'http://localhost:3000/student' : 'http://localhost:3000/teacher';
        const navigateUrl = role === 'student' ? '/get-question' : '/add-poll';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });
            if (!response.ok) {
                alert(" You are already logged in in different Tab");
                navigate('/');
            } else {
                const data = await response.json();
                console.log('Success:', data);
                setUserId(data.id);
                navigate(navigateUrl);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center mb-8">
                <button className="bg-purple-500 text-white rounded-full px-4 py-2 mb-4">
                    Intervue Poll
                </button>
                <h1 className="text-3xl font-bold">Let’s <span className="text-indigo-600">Get Started</span></h1>
                <p className="text-gray-600">If you’re a student, you’ll be able to submit your answers...</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
                <label className="text-lg">Enter your Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Your Name" 
                    className="border-2 border-gray-300 p-2 rounded w-64 text-center"
                />
                <button 
                    className="bg-blue-500 text-white rounded-full px-6 py-2 mt-4 hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default NameInput;
