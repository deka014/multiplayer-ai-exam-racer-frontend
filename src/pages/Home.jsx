import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const startRace = () => {
        // Generate a random race ID for demo purposes
        const raceId = Math.random().toString(36).substring(7);
        navigate(`/lobby/${raceId}`);
    };

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>🏎️ Exam Racer</h1>
            <p>Race against others to answer questions and climb the ranks!</p>
            <button
                onClick={startRace}
                style={{
                    padding: '1rem 2rem',
                    fontSize: '1.2rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '1rem'
                }}
            >
                Start New Race
            </button>
        </div>
    );
};

export default Home;
