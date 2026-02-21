import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Lobby = () => {
    const { raceId } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>🎮 Race Lobby</h1>
            <p>Race ID: <strong>{raceId}</strong></p>
            <div style={{ margin: '2rem 0' }}>
                <h3>Waiting for players...</h3>
                <ul>
                    <li>You (Joined)</li>
                    <li>Player 2 (Waiting...)</li>
                </ul>
            </div>
            <button
                onClick={() => navigate(`/race/${raceId}`)}
                style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                Start Race!
            </button>
        </div>
    );
};

export default Lobby;
