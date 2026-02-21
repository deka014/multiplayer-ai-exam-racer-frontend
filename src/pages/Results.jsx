import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Results = () => {
    const { raceId } = useParams();
    const navigate = useNavigate();

    const rankings = [
        { name: "You", score: 300, rank: 1 },
        { name: "Player 2", score: 250, rank: 2 },
        { name: "Player 3", score: 100, rank: 3 }
    ];

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>🏆 Final Rankings</h1>
            <p>Race ID: {raceId}</p>
            <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #333' }}>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankings.map(r => (
                            <tr key={r.rank} style={{ borderBottom: '1px solid #eee' }}>
                                <td>{r.rank}</td>
                                <td>{r.name}</td>
                                <td>{r.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => navigate('/')}
                style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                Back to Home
            </button>
        </div>
    );
};

export default Results;
