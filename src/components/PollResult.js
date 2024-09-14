import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

const GetQuestion = () => {
    const { userId } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);
    const [stat, setStat] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    // Polling function to fetch the question
    const fetchState = async () => {
        try {
            const response = await fetch('poll-result/:id');
            if (response.ok) {
                const data = await response.json();
                if (data.question) {
                    setStat(data);
                }
            }
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    // Start polling every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchState();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="flex flex-col items-center justify-center h-screen p-8">
            {loading ? (
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                    <p>Waiting For the response </p>
                </div>
            ) : (
                <div className="w-full max-w-2xl">
                    <h1 className="text-3xl font-bold mb-4">{stat.question}</h1>
                    <div className="mb-6">
                    {stat.stat.map((option) => (
                        <div>option.count, option.option</div>
                    ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default GetQuestion;
