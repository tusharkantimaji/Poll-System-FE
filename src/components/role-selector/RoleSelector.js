// // src/components/RoleSelector.js

// import React from 'react';
// import './RoleSelector.css'; // Import the CSS file for styling

// const RoleSelector = () => {
//     return (
//         <div className="role-selector">
//             <div className="header">
//                 <button className="intervue-poll"> Intervue Poll</button>
//                 <h1>Welcome to the <span className="highlight">Live Polling System</span></h1>
//                 <p>Please select the role that best describes you to begin using the live polling system</p>
//             </div>
//             <div className="role-options">
//                 <div className="role student selected">
//                     <h2>I’m a Student</h2>
//                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
//                 </div>
//                 <div className="role teacher">
//                     <h2>I’m a Teacher</h2>
//                     <p>Submit answers and view live poll results in real-time.</p>
//                 </div>
//             </div>
//             <button className="continue-button">Continue</button>
//         </div>
//     );
// };

// export default RoleSelector;
// src/components/RoleSelector.js

import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import './RoleSelector.css';

const RoleSelector = () => {
    const [role, setRole] = useState('student');
    const [name, setName] = useState('');
    const { setUserId } = useContext(GlobalContext);

    console.log("Role", role, name);
    const handleSubmit = async () => {
        // Define API endpoint based on role
        const apiUrl = role === 'student' ? 'http://localhost:3000/student' : '/http://localhost:3000teacher';

        try {
            // Call the API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });
            const data = await response.json();

            // Set the user ID in global state
            setUserId(data.id);
            
            // Proceed to next step (e.g., redirect)
            console.log('User ID stored in global state:', data.id);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="role-selector">
            <div className="header">
                <button className="intervue-poll">Intervue Poll</button>
                <h1>Welcome to the <span className="highlight">Live Polling System</span></h1>
                <p>Please select the role that best describes you to begin using the live polling system</p>
            </div>

            <div className="role-options">
                <div 
                    className={`role ${role === 'student' ? 'selected' : ''}`} 
                    onClick={() => setRole('student')}
                >
                    <h2>I’m a Student</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                </div>
                <div 
                    className={`role ${role === 'teacher' ? 'selected' : ''}`} 
                    onClick={() => setRole('teacher')}
                >
                    <h2>I’m a Teacher</h2>
                    <p>Submit answers and view live poll results in real-time.</p>
                </div>
            </div>

            {/* <div className="input-section">
                <label>Enter your Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Your Name" 
                />
            </div> */}
            
            <button className="continue-button" onClick={handleSubmit}>Continue</button>
        </div>
    );
};

export default RoleSelector;
