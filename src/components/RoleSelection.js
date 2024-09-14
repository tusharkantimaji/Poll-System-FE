// src/components/RoleSelection.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const RoleSelection = () => {
    const { setRole } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        navigate('/name');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center mb-8">
                <button className="bg-purple-500 text-white rounded-full px-4 py-2 mb-4">
                    Intervue Poll
                </button>
                <h1 className="text-3xl font-bold">Welcome to the <span className="text-indigo-600">Live Polling System</span></h1>
                <p className="text-gray-600">Please select the role that best describes you to begin using the live polling system</p>
            </div>
            <div className="flex space-x-4">
                <div 
                    className="border-2 border-blue-500 p-4 rounded cursor-pointer hover:bg-blue-100" 
                    onClick={() => handleRoleSelect('student')}
                >
                    <h2 className="text-xl font-semibold">I’m a Student</h2>
                    <p className="text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                </div>
                <div 
                    className="border-2 border-blue-500 p-4 rounded cursor-pointer hover:bg-blue-100" 
                    onClick={() => handleRoleSelect('teacher')}
                >
                    <h2 className="text-xl font-semibold">I’m a Teacher</h2>
                    <p className="text-gray-600">Submit answers and view live poll results in real-time.</p>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
