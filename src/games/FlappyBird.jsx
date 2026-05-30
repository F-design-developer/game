import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function FlappyBird() {
    const navigate = useNavigate();

    // ⚙️ Super Chill Constants (Speed aur kam kar di hai)
    const BIRD_SIZE = 34;
    const GAME_WIDTH = 350;
    const GAME_HEIGHT = 500;
    const GRAVITY = 0.25;         // Bahut halki gravity (Penguin dheere girega)
    const JUMP_STRENGTH = -5.5;   // Choti jump taaki control bana rahe
    const PIPE_WIDTH = 55;
    const PIPE_GAP = 180;         // Gap bada kar diya hai (Niklana aasaan hoga)
    const PIPE_SPEED = 1.8;       // Super Slow Speed (Pehle 3 thi, ab 1.8 hai)

    const [birdY, setBirdY] = useState(250);
    const [pipes, setPipes] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const velocityRef = useRef(0);
    const requestRef = useRef();

    const jump = () => {
        if (gameOver) return;
        if (!gameStarted) setGameStarted(true);
        velocityRef.current = JUMP_STRENGTH;
    };

    const update = () => {
        if (gameOver || !gameStarted) return;

        velocityRef.current += GRAVITY;
        setBirdY((y) => {
            const newY = y + velocityRef.current;
            if (newY >= GAME_HEIGHT - BIRD_SIZE || newY <= 0) {
                setGameOver(true);
            }
            return newY;
        });

        setPipes((prevPipes) => {
            let nextPipes = prevPipes.map((p) => ({ ...p, x: p.x - PIPE_SPEED }));

            if (nextPipes.length === 0 || nextPipes[nextPipes.length - 1].x < GAME_WIDTH - 220) {
                nextPipes.push({
                    x: GAME_WIDTH,
                    topHeight: Math.random() * (GAME_HEIGHT - PIPE_GAP - 120) + 60,
                });
            }

            if (nextPipes[0].x < -PIPE_WIDTH) {
                setScore((s) => s + 1);
                nextPipes.shift();
            }

            nextPipes.forEach((p) => {
                const birdX = 50; 
                // Hitbox thoda chota rakha hai taaki Penguin aasani se nikal jaye
                if (
                    birdX + BIRD_SIZE - 8 > p.x && 
                    birdX + 8 < p.x + PIPE_WIDTH &&
                    (birdY + 8 < p.topHeight || birdY + BIRD_SIZE - 8 > p.topHeight + PIPE_GAP)
                ) {
                    setGameOver(true);
                }
            });

            return nextPipes;
        });

        requestRef.current = requestAnimationFrame(update);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current);
    }, [gameStarted, gameOver, birdY]);

    const resetGame = () => {
        setBirdY(250);
        velocityRef.current = 0;
        setPipes([]);
        setGameOver(false);
        setScore(0);
        setGameStarted(false);
    };

    return (
        <div 
            className="min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden touch-none"
            onClick={jump}
        >
            <div className="mb-6 text-center">
                <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">
                    CHILL <span className="text-cyan-400">PENGUIN</span>
                </h2>
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] mt-1">
                    Score: {score}
                </p>
            </div>

            <div 
                className="relative bg-gradient-to-b from-slate-900 to-black border-4 border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            >
                {/* 🐧 Penguin */}
                <div
                    className="absolute z-20 transition-transform duration-100 text-3xl"
                    style={{
                        top: birdY,
                        left: 50,
                        width: BIRD_SIZE,
                        height: BIRD_SIZE,
                        transform: `rotate(${velocityRef.current * 4}deg)`
                    }}
                >
                    🐧
                </div>

                {/* 🧱 Pipes (Safe Green) */}
                {pipes.map((pipe, i) => (
                    <React.Fragment key={i}>
                        <div 
                            className="absolute bg-gradient-to-r from-emerald-600 to-emerald-400 border-x-2 border-b-4 border-black/20 rounded-b-xl shadow-lg"
                            style={{ left: pipe.x, top: 0, width: PIPE_WIDTH, height: pipe.topHeight }}
                        />
                        <div 
                            className="absolute bg-gradient-to-r from-emerald-600 to-emerald-400 border-x-2 border-t-4 border-black/20 rounded-t-xl shadow-lg"
                            style={{ left: pipe.x, top: pipe.topHeight + PIPE_GAP, width: PIPE_WIDTH, height: GAME_HEIGHT - pipe.topHeight - PIPE_GAP }}
                        />
                    </React.Fragment>
                ))}

                {!gameStarted && !gameOver && (
                    <div className="absolute inset-0 z-30 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
                        <p className="text-white font-black uppercase tracking-widest text-xs border border-white/20 px-4 py-2 rounded-full">
                            Tap to Float
                        </p>
                    </div>
                )}

                {gameOver && (
                    <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-black text-white italic mb-1">REBOOT NEEDED</h3>
                        <p className="text-cyan-400 font-bold mb-6">Final Score: {score}</p>
                        <button 
                            onClick={(e) => { e.stopPropagation(); resetGame(); }}
                            className="bg-white text-black px-10 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-transform active:scale-90"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            <button 
                onClick={(e) => { e.stopPropagation(); navigate("/"); }}
                className="mt-8 text-gray-700 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.4em]"
            >
                ← Exit Game
            </button>
        </div>
    );
}

export default FlappyBird;