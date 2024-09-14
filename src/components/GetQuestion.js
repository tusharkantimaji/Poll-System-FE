import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

const GetQuestion = () => {
    const { userId } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    // Polling function to fetch the question
    const fetchQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:3000/active-poll/${userId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.question) {
                    setQuestion(data);
                    setLoading(false);
                }
            }
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    // Start polling every 5 seconds
    useEffect(() => {
        if (question != null) {
            return;
        }

        const intervalId = setInterval(() => {
            fetchQuestion();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [question]);

    const handleOptionChange = (index) => {
        setSelectedOption(index);
    };

    const handleSubmit = async () => {
        if (selectedOption === null) {
            alert('Please select an option!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/submit-poll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: userId,
                    pollId: question.id,
                    answer: selectedOption,
                }),
            });

            if (response.ok) {
                alert('Answer submitted successfully!');
                setQuestion(null);
                setSelectedOption(null);
                setLoading(true);
            } else {
                alert('Error submitting answer.');
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-8">
            {loading ? (
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                    <p>Waiting for the next question...</p>
                </div>
            ) : (
                <div className="w-full max-w-2xl">
                    <h1 className="text-3xl font-bold mb-4">{question.question}</h1>
                    <div className="mb-6">
                        {question.options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    name="option"
                                    value={index}
                                    checked={selectedOption === index}
                                    onChange={() => handleOptionChange(index)}
                                    className="form-radio mr-2"
                                />
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600"
                    >
                        Submit Answer
                    </button>
                </div>
            )}
        </div>
    );
};

export default GetQuestion;
