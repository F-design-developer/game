import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

const SnakeGame = () => {
    const navigate = useNavigate();
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // 🍎 Random Food Generator
    const generateFood = useCallback(() => {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    }, []);

    // 🎮 Game Logic
    useEffect(() => {
        if (gameOver) return;

        const moveSnake = setInterval(() => {
            setSnake((prev) => {
                const head = { x: prev[0].x + direction.x, y: prev[0].y + direction.y };

                // 💀 Wall/Self Collision
                if (
                    head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE ||
                    prev.some(s => s.x === head.x && s.y === head.y)
                ) {
                    setGameOver(true);
                    return prev;
                }

                const newSnake = [head, ...prev];
                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10);
                    setFood(generateFood());
                } else {
                    newSnake.pop();
                }
                return newSnake;
            });
        }, 150);

        return () => clearInterval(moveSnake);
    }, [direction, food, gameOver, generateFood]);

    // 🕹️ Controls
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowUp" && direction.y === 0) setDirection({ x: 0, y: -1 });
            if (e.key === "ArrowDown" && direction.y === 0) setDirection({ x: 0, y: 1 });
            if (e.key === "ArrowLeft" && direction.x === 0) setDirection({ x: -1, y: 0 });
            if (e.key === "ArrowRight" && direction.x === 0) setDirection({ x: 1, y: 0 });
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [direction]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <div className="mb-8 flex justify-between w-full max-w-[400px]">
                <button onClick={() => navigate("/")} className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white">← Exit</button>
                <div className="text-right">
                    <p className="text-[10px] text-green-500 uppercase font-black">Score</p>
                    <h2 className="text-3xl font-black italic">{score}</h2>
                </div>
            </div>

            <div className="relative border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl p-2 shadow-2xl">
                <div
                    className="grid gap-px bg-white/5"
                    style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, width: "300px", height: "300px" }}
                >
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                        const x = i % GRID_SIZE;
                        const y = Math.floor(i / GRID_SIZE);
                        const isSnake = snake.some(s => s.x === x && s.y === y);
                        const isHead = snake[0].x === x && snake[0].y === y;
                        const isFood = food.x === x && food.y === y;

                        return (
                            <div
                                key={i}
                                className={`rounded-sm transition-all duration-200 ${isHead ? "bg-green-400 shadow-[0_0_10px_#4ade80]" :
                                        isSnake ? "bg-green-700" :
                                            isFood ? "bg-red-500 shadow-[0_0_15px_#ef4444] animate-pulse" : "transparent"
                                    }`}
                            />
                        );
                    })}
                </div>

                {gameOver && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                        <h3 className="text-3xl font-black text-red-500 italic mb-4 uppercase">Game Over</h3>
                        <button onClick={() => { setSnake(INITIAL_SNAKE); setGameOver(false); setScore(0); }} className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-green-500 transition-all">Restart</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SnakeGame;