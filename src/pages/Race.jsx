import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Race = () => {
    const { raceId } = useParams();
    const navigate = useNavigate();

    const [questionIndex, setQuestionIndex] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [pulse, setPulse] = useState(false);
    const [wrongShake, setWrongShake] = useState(false);

    // Fake opponents data
    const [opponents, setOpponents] = useState([
        { id: 1, name: 'Ghost', car: '👻', progress: 12, color: '#aaaaaa' },
        { id: 2, name: 'Lightning', car: '⚡', progress: 37, color: '#f1c40f' },
        { id: 3, name: 'Storm', car: '🌪️', progress: 5, color: '#3498db' },
        { id: 4, name: 'Blaze', car: '🔥', progress: 58, color: '#e67e22' },
        { id: 5, name: 'Shadow', car: '👤', progress: 24, color: '#7f8c8d' }
    ]);

    // Timer for user
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Simulate opponents moving
    useEffect(() => {
        const interval = setInterval(() => {
            setOpponents(prev => prev.map(opp => ({
                ...opp,
                progress: Math.min(100, opp.progress + (Math.random() * 2 + 0.3))
            })));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const questions = [
        {
            q: "Which article of the Indian Constitution deals with the abolition of untouchability?",
            options: ["Article 14", "Article 15", "Article 17", "Article 21"],
            answer: "Article 17"
        },
        {
            q: "The 'Basic Structure' doctrine of the Indian Constitution was propounded in which landmark case?",
            options: ["Kesavananda Bharati", "Golaknath", "Minerva Mills", "Maneka Gandhi"],
            answer: "Kesavananda Bharati"
        },
        {
            q: "Which of the following is NOT a Fundamental Right under the Indian Constitution?",
            options: ["Right to Equality", "Right to Freedom", "Right to Property", "Right to Constitutional Remedies"],
            answer: "Right to Property"
        },
        {
            q: "The famous Battle of Plassey was fought in which year?",
            options: ["1757", "1764", "1857", "1776"],
            answer: "1757"
        },
        {
            q: "Who is known as the 'Father of the Indian Constitution'?",
            options: ["Mahatma Gandhi", "Jawaharlal Nehru", "B.R. Ambedkar", "Sardar Patel"],
            answer: "B.R. Ambedkar"
        }
    ];

    const currentQ = questions[questionIndex];
    const progressPercentage = (questionIndex / questions.length) * 100;

    const handleAnswerClick = (selectedOption) => {
        if (isLocked) return;

        if (selectedOption === currentQ.answer) {
            setPulse(true);
            setTimeout(() => setPulse(false), 300);
            if (questionIndex < questions.length - 1) {
                setQuestionIndex(questionIndex + 1);
            } else {
                navigate(`/results/${raceId}`, { state: { finalTime: timeElapsed } });
            }
        } else {
            setIsLocked(true);
            setWrongShake(true);
            setTimeout(() => setWrongShake(false), 500);
            setTimeout(() => setIsLocked(false), 1000);
        }
    };

    const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                body { background: #f5f3f0; }

                .race-root {
                    min-height: 100vh;
                    background: #f5f3f0;
                    font-family: 'DM Sans', sans-serif;
                    display: flex;
                    flex-direction: column;
                    padding: 24px;
                    gap: 24px;
                    position: relative;
                    overflow: hidden;
                }

                .race-root::before {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
                    background-size: 40px 40px;
                    pointer-events: none;
                    z-index: 0;
                }

                .content { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto; width: 100%; }

                /* Header */
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    border-bottom: 2px solid #1a1a1a;
                    padding-bottom: 20px;
                }

                .brand-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    letter-spacing: 2px;
                    color: #1a1a1a;
                    line-height: 1;
                }

                .brand-title span {
                    color: #e63329;
                }

                .session-id {
                    font-size: 0.7rem;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: #888;
                    margin-top: 4px;
                }

                .timer-block {
                    text-align: right;
                }

                .timer-display {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    letter-spacing: 2px;
                    line-height: 1;
                    color: ${isLocked ? '#e63329' : '#1a1a1a'};
                    transition: color 0.3s;
                }

                .timer-label {
                    font-size: 0.65rem;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    color: #aaa;
                    margin-top: 4px;
                }

                /* Player's track */
                .track-container {
                    background: #1a1a1a;
                    border-radius: 8px;
                    padding: 12px 16px;
                    position: relative;
                    overflow: hidden;
                    height: 72px;
                    display: flex;
                    align-items: center;
                }

                .track-dashes {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    gap: 28px;
                    padding: 0 16px;
                }

                .dash {
                    width: 24px;
                    height: 3px;
                    background: rgba(255,255,255,0.12);
                    border-radius: 2px;
                    flex-shrink: 0;
                }

                .track-inner {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: ${progressPercentage}%;
                    transition: left 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .car-emoji {
                    font-size: 2rem;
                    filter: ${isLocked ? 'grayscale(1) brightness(0.5)' : 'none'};
                    transition: filter 0.3s;
                }

                .car-trail {
                    width: 40px;
                    height: 2px;
                    background: linear-gradient(to left, #e63329, transparent);
                    border-radius: 2px;
                    opacity: ${isLocked ? 0 : 1};
                    transition: opacity 0.3s;
                }

                .finish-flag {
                    position: absolute;
                    right: 16px;
                    font-size: 1.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .you-badge {
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: #e63329;
                    color: white;
                    font-size: 0.7rem;
                    font-weight: 700;
                    padding: 4px 8px;
                    border-radius: 20px;
                    letter-spacing: 1px;
                    z-index: 2;
                }

                /* Opponents single track */
                .opponents-section {
                    margin-top: 8px;
                }

                .opponents-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }

                .opponents-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.4rem;
                    letter-spacing: 2px;
                    color: #1a1a1a;
                }

                .opponents-count {
                    font-size: 0.65rem;
                    letter-spacing: 3px;
                    background: #1a1a1a;
                    color: #f5f3f0;
                    padding: 4px 10px;
                    border-radius: 30px;
                }

                .opponents-track-container {
                    background: #1a1a1a;
                    border-radius: 8px;
                    padding: 12px 16px;
                    position: relative;
                    overflow: hidden;
                    height: 72px;
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .opponents-track-dashes {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    gap: 28px;
                    padding: 0 16px;
                }

                .opponents-dash {
                    width: 24px;
                    height: 3px;
                    background: rgba(255,255,255,0.12);
                    border-radius: 2px;
                    flex-shrink: 0;
                }

                .opponents-cars {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                .opponent-car-on-track {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 1.8rem;
                    transition: left 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
                    pointer-events: auto;
                }

                .opponents-track-finish {
                    position: absolute;
                    right: 16px;
                    font-size: 1.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                }

                /* Opponents list (grid) */
                .opponents-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 12px;
                    margin-top: 8px;
                }

                .opponent-card {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255,255,255,0.6);
                    border: 1.5px solid #1a1a1a;
                    border-radius: 12px;
                    padding: 8px 12px;
                    box-shadow: 3px 3px 0 #1a1a1a;
                }

                .opponent-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    background: #ddd;
                    border: 2px solid #1a1a1a;
                    flex-shrink: 0;
                }

                .opponent-info {
                    flex: 1;
                    min-width: 0;
                }

                .opponent-name {
                    font-weight: 700;
                    font-size: 0.75rem;
                    letter-spacing: 1px;
                    color: #1a1a1a;
                }

                .opponent-progress-value {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1rem;
                    color: #1a1a1a;
                }

                /* Question card - fixed min-height to prevent shifting */
                .question-card {
                    background: #fff;
                    border: 2px solid ${isLocked ? '#e63329' : '#1a1a1a'};
                    border-radius: 12px;
                    padding: clamp(24px, 5vw, 48px);
                    transition: border-color 0.3s, box-shadow 0.3s, transform 0.15s;
                    box-shadow: ${pulse ? '0 0 0 4px rgba(230,51,41,0.15)' : '6px 6px 0px #1a1a1a'};
                    transform: ${wrongShake ? 'translateX(-6px)' : pulse ? 'scale(1.01)' : 'none'};
                    animation: ${wrongShake ? 'shake 0.4s ease' : 'none'};
                }

                .question-content {
                    min-height: 280px; /* Ensures stable height across questions */
                    display: flex;
                    flex-direction: column;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-8px); }
                    40% { transform: translateX(8px); }
                    60% { transform: translateX(-6px); }
                    80% { transform: translateX(6px); }
                }

                .question-number {
                    font-size: 0.68rem;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    color: #e63329;
                    font-weight: 600;
                    margin-bottom: 14px;
                }

                .question-text {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(1.6rem, 4vw, 2.5rem);
                    letter-spacing: 1px;
                    color: #1a1a1a;
                    line-height: 1.1;
                    margin-bottom: 32px;
                }

                .options-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                @media (max-width: 560px) {
                    .options-grid { grid-template-columns: 1fr; }
                    .header { flex-direction: column; gap: 12px; }
                    .timer-block { text-align: left; }
                }

                .option-btn {
                    background: #f5f3f0;
                    border: 2px solid #1a1a1a;
                    border-radius: 8px;
                    padding: 16px 20px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #1a1a1a;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    text-align: left;
                    position: relative;
                    overflow: hidden;
                    transition: background 0.15s, border-color 0.15s, transform 0.1s, box-shadow 0.1s;
                    box-shadow: 3px 3px 0 #1a1a1a;
                    width: 100%;
                }

                .option-btn:not(:disabled):hover {
                    background: #e63329;
                    color: #fff;
                    border-color: #e63329;
                    box-shadow: 3px 3px 0 #9e231a;
                    transform: translate(-1px, -1px);
                }

                .option-btn:not(:disabled):active {
                    transform: translate(1px, 1px);
                    box-shadow: 1px 1px 0 #1a1a1a;
                }

                .option-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    border-color: #e63329;
                    box-shadow: none;
                }

                .option-num {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.3rem;
                    opacity: 0.35;
                    letter-spacing: 1px;
                    flex-shrink: 0;
                }

                /* Stall notice */
                .stall-notice {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #fff0ef;
                    border: 1.5px solid #e63329;
                    border-radius: 8px;
                    padding: 12px 18px;
                    margin-top: 20px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #e63329;
                }

                .stall-dot {
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    background: #e63329;
                    animation: blink 0.6s infinite alternate;
                    flex-shrink: 0;
                }

                @keyframes blink { from { opacity: 1; } to { opacity: 0.2; } }

                /* Progress row */
                .progress-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .progress-label {
                    font-size: 0.7rem;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: #888;
                }

                .progress-fraction {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.2rem;
                    color: #1a1a1a;
                    letter-spacing: 2px;
                }

                /* Bottom footer */
                .race-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 8px;
                    border-top: 1px solid #ddd;
                }

                .footer-stat {
                    font-size: 0.7rem;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #bbb;
                }

                .footer-stat strong {
                    color: #1a1a1a;
                    font-weight: 700;
                }
            `}</style>

            <div className="race-root">
                <div className="content">

                    {/* Header */}
                    <div className="header">
                        <div>
                            <div className="brand-title">ADRE LOVERS<span>_</span>RACE<span>.exe</span></div>
                            <div className="session-id">Session · {raceId}</div>
                        </div>
                        <div className="timer-block">
                            <div className="timer-display">{formatTime(timeElapsed)}</div>
                            <div className="timer-label">Live Timer</div>
                        </div>
                    </div>

                    {/* Player's track */}
                    <div className="track-container">
                        <div className="you-badge">YOU</div>
                        <div className="track-dashes">
                            {[...Array(18)].map((_, i) => <div key={i} className="dash" />)}
                        </div>
                        <div className="track-inner">
                            <div className="car-trail" />
                            <div className="car-emoji">{isLocked ? '💥' : '🏎️'}</div>
                        </div>
                        <div className="finish-flag">🏁</div>
                    </div>

                    {/* Progress row */}
                    <div className="progress-row">
                        <span className="progress-label">Checkpoint</span>
                        <span className="progress-fraction">{questionIndex + 1} / {questions.length}</span>
                    </div>

                    {/* Question card with fixed min-height */}
                    <div className="question-card">
                        <div className="question-content">
                            <div className="question-number">Question · {questionIndex + 1}</div>
                            <div className="question-text">{currentQ.q}</div>

                            <div className="options-grid">
                                {currentQ.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        className="option-btn"
                                        disabled={isLocked}
                                        onClick={() => handleAnswerClick(option)}
                                    >
                                        <span className="option-num">{idx + 1}</span>
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {isLocked && (
                                <div className="stall-notice">
                                    <div className="stall-dot" />
                                    Engine stalled — hold tight...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Opponents section with single track */}
                    <div className="opponents-section">
                        <div className="opponents-header">
                            <span className="opponents-title">OTHERS</span>
                            <span className="opponents-count">LIVE</span>
                        </div>

                        {/* Single track for all opponents */}
                        <div className="opponents-track-container">
                            <div className="opponents-track-dashes">
                                {[...Array(18)].map((_, i) => <div key={i} className="opponents-dash" />)}
                            </div>
                            <div className="opponents-cars">
                                {opponents.map(opp => (
                                    <div
                                        key={opp.id}
                                        className="opponent-car-on-track"
                                        style={{ left: `${opp.progress}%` }}
                                    >
                                        {opp.car}
                                    </div>
                                ))}
                            </div>
                            <div className="opponents-track-finish">🏁</div>
                        </div>

                        {/* Opponent details grid */}
                        <div className="opponents-grid">
                            {opponents.map(opp => (
                                <div key={opp.id} className="opponent-card">
                                    <div className="opponent-icon" style={{ background: opp.color }}>{opp.car}</div>
                                    <div className="opponent-info">
                                        <div className="opponent-name">{opp.name}</div>
                                        <div className="opponent-progress-value">{Math.round(opp.progress)}%</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="race-footer">
                        <span className="footer-stat">Elapsed <strong>{timeElapsed}s</strong></span>
                        <span className="footer-stat">Progress <strong>{Math.round(progressPercentage)}%</strong></span>
                        <span className="footer-stat">Race <strong>#{raceId}</strong></span>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Race;