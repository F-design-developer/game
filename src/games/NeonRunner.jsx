import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function NeonRunner() {
    const navigate = useNavigate();
    const [isJumping, setIsJumping] = useState(false);
    const [obstaclePos, setObstaclePos] = useState(600);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Jump Logic
    const jump = useCallback(() => {
        if (isJumping || gameOver) return;
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
    }, [isJumping, gameOver]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                if (!gameStarted) setGameStarted(true);
                jump();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [jump, gameStarted]);

    // Game Loop
    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const gameLoop = setInterval(() => {
            setObstaclePos((prev) => {
                if (prev < -20) {
                    setScore((s) => s + 1);
                    return 600;
                }
                return prev - (7 + score / 5); // Speed badhti jayegi
            });
        }, 20);

        return () => clearInterval(gameLoop);
    }, [gameStarted, gameOver, score]);

    // Collision
    useEffect(() => {
        if (obstaclePos < 70 && obstaclePos > 20 && !isJumping) {
            setGameOver(true);
        }
    }, [obstaclePos, isJumping]);

    const resetGame = () => {
        setObstaclePos(600);
        setScore(0);
        setGameOver(false);
        setGameStarted(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 outline-none">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                    NEON <span className="text-gray-500">RUNNER</span>
                </h2>
                <p className="text-[10px] font-bold text-gray-500 tracking-[0.3em] mt-2 italic">Score: {score}</p>
            </div>

            <div className="relative w-full max-w-[600px] h-[200px] border-b-2 border-white/20 overflow-hidden bg-white/[0.02]">
                {/* Dino (The Runner) */}
                <div
                    className={`absolute left-10 text-4xl transition-all duration-500 ${isJumping ? "-bottom-32" : "bottom-0"}`}
                    style={{ bottom: isJumping ? "100px" : "0px" }}
                >
                    🦖
                </div>

                {/* Obstacle */}
                <div
                    className="absolute bottom-0 text-3xl"
                    style={{ left: obstaclePos }}
                >
                    🌵
                </div>

                {!gameStarted && !gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <p className="text-xs font-black uppercase tracking-widest animate-pulse">Press Space to Start</p>
                    </div>
                )}

                {gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
                        <h3 className="text-2xl font-black text-red-500 uppercase italic mb-4">Wasted</h3>
                        <button onClick={resetGame} className="bg-white text-black px-8 py-2 rounded-full font-black uppercase text-[10px] tracking-widest">Restart</button>
                    </div>
                )}
            </div>

            <button onClick={() => navigate("/")} className="mt-12 text-gray-700 hover:text-white text-[9px] font-black uppercase tracking-[0.4em]">← Exit Game</button>
        </div>
    );
}

export default NeonRunner;