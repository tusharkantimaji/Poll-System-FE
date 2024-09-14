// src/components/AddPoll.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const AddPoll = () => {
    const [question, setQuestion] = useState('');
    const { setPollId } = useContext(GlobalContext);

    const [options, setOptions] = useState([{ text: '', isCorrect: false }]);
    const [timer, setTimer] = useState(60); // default to 60 seconds
    const [questionLength, setQuestionLength] = useState(0);
    const navigate = useNavigate();

    // Handle adding a new option
    const addOption = () => {
        setOptions([...options, { text: '', isCorrect: false }]);
    };

    // Handle input change for the question
    const handleQuestionChange = (e) => {
        const text = e.target.value;
        setQuestion(text);
        setQuestionLength(text.length);
    };

    // Handle input change for options
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index].text = value;
        setOptions(newOptions);
    };

    // Handle changing the correct answer
    const handleCorrectChange = (index) => {
        const newOptions = options.map((option, idx) => ({
            option: option.text,
            isCorrect: idx === index,
        }));
        setOptions(newOptions);
    };

    // Handle the poll submission
    const handleSubmit = async () => {
        // Perform API call to save the poll
        const pollData = {
          question,
          options: options.map((option) => ({
            option: option.text,
            isCorrect: option.isCorrect,
          })),
          timeLimit: timer,
        };

        try {
            console.log('Poll Data:', pollData);
            const response = await fetch("http://localhost:3000/poll", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pollData),
            });
            if (!response.ok) {
                alert(" You are already logged in in different Tab");
                navigate('/');
            } else {
                const data = await response.json();
                setPollId(data.id);
                navigate(`/poll-result/${data.id}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-8">
            <div className="text-center mb-8">
                <button className="bg-purple-500 text-white rounded-full px-4 py-2 mb-4">
                     Intervue Poll
                </button>
                <h1 className="text-3xl font-bold">
                    Let’s <span className="text-indigo-600">Get Started</span>
                </h1>
                <p className="text-gray-600">
                    you’ll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.
                </p>
            </div>
            <div className="w-full max-w-2xl">
                <label className="text-lg block mb-2">Enter your question</label>
                <textarea
                    className="w-full border-2 border-gray-300 p-2 rounded mb-4"
                    value={question}
                    onChange={handleQuestionChange}
                    placeholder="Type your question here..."
                    maxLength={100}
                    rows="3"
                />
                <div className="text-right text-gray-500">{questionLength}/100</div>
                <div className="flex justify-between items-center my-4">
                    <span className="text-gray-700">Timer:</span>
                    <select
                        value={timer}
                        onChange={(e) => setTimer(Number(e.target.value))}
                        className="border-2 border-gray-300 p-2 rounded"
                    >
                        {[30, 45, 60, 90, 120].map((time) => (
                            <option key={time} value={time}>
                                {time} seconds
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-6">
                    <h2 className="text-lg mb-4">Edit Options</h2>
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <span className="mr-2 text-lg">{index + 1}.</span>
                            <input
                                type="text"
                                value={option.text}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder="Option text"
                                className="w-full border-2 border-gray-300 p-2 rounded mr-4"
                            />
                            <div className="flex items-center">
                                <span className="mr-2">Is it Correct?</span>
                                <input
                                    type="radio"
                                    name={`correct-${index}`}
                                    checked={option.isCorrect}
                                    onChange={() => handleCorrectChange(index)}
                                    className="form-radio text-purple-600"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addOption}
                        className="text-purple-500 mt-4"
                    >
                        + Add More option
                    </button>
                </div>
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-purple-500 text-white rounded-full px-6 py-2 hover:bg-purple-600"
                    >
                        Ask Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPoll;
