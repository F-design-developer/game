import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SaanpSidi() {
    const navigate = useNavigate();

    const [playerPos, setPlayerPos] = useState(1);
    const [cpuPos, setCpuPos] = useState(1); // Computer ki position
    const [diceNum, setDiceNum] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [turn, setTurn] = useState("PLAYER"); // "PLAYER" ya "CPU"
    const [message, setMessage] = useState("Your turn! Roll the dice.");

    const portals = {
        4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 63: 81, 71: 91,
        17: 7, 54: 34, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 79
    };

    // 🤖 Computer Turn Logic
    useEffect(() => {
        if (turn === "CPU" && !isRolling && playerPos < 100 && cpuPos < 100) {
            setMessage("Computer is thinking...");
            const timer = setTimeout(() => {
                rollDice();
            }, 1500); // 1.5 second wait karega computer
            return () => clearTimeout(timer);
        }
    }, [turn]);

    const rollDice = () => {
        if (isRolling || playerPos === 100 || cpuPos === 100) return;

        setIsRolling(true);
        const interval = setInterval(() => {
            setDiceNum(Math.floor(Math.random() * 6) + 1);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            const finalRoll = Math.floor(Math.random() * 6) + 1;
            setDiceNum(finalRoll);
            setIsRolling(false);
            handleMove(finalRoll);
        }, 800);
    };

    const handleMove = (roll) => {
        if (turn === "PLAYER") {
            let newPos = playerPos + roll;
            if (newPos <= 100) {
                if (portals[newPos]) newPos = portals[newPos];
                setPlayerPos(newPos);
                if (newPos === 100) {
                    setMessage("🎉 YOU WON! Computer lost.");
                    return;
                }
            }
            setTurn("CPU");
            setMessage("Computer's Turn...");
        } else {
            let newPos = cpuPos + roll;
            if (newPos <= 100) {
                if (portals[newPos]) newPos = portals[newPos];
                setCpuPos(newPos);
                if (newPos === 100) {
                    setMessage("💀 CPU WON! Better luck next time.");
                    return;
                }
            }
            setTurn("PLAYER");
            setMessage("Your Turn! Roll it.");
        }
    };

    const resetGame = () => {
        setPlayerPos(1);
        setCpuPos(1);
        setDiceNum(1);
        setTurn("PLAYER");
        setMessage("New game started!");
    };

    const renderBoard = () => {
        const cells = [];
        for (let r = 9; r >= 0; r--) {
            for (let c = 0; c < 10; c++) {
                const rowVal = r * 10;
                const colVal = r % 2 === 0 ? c + 1 : 10 - c;
                const cellNum = rowVal + colVal;

                cells.push(
                    <div
                        key={cellNum}
                        className={`relative flex items-center justify-center border-[0.5px] border-white/5 text-[9px] font-bold h-10 w-10 md:h-12 md:w-12
                        ${(r + c) % 2 === 0 ? "bg-white/5" : "bg-transparent"}`}
                    >
                        <span className="opacity-20">{cellNum}</span>
                        {playerPos === cellNum && (
                            <div className="absolute z-20 text-xl animate-bounce drop-shadow-[0_0_5px_red]">🔴</div>
                        )}
                        {cpuPos === cellNum && (
                            <div className="absolute z-10 text-xl translate-x-2 translate-y-2 drop-shadow-[0_0_5px_blue]">🔵</div>
                        )}
                        {portals[cellNum] && (
                            <span className={`absolute top-0 right-0 text-[8px] ${portals[cellNum] > cellNum ? "text-green-500" : "text-red-500"}`}>
                                {portals[cellNum] > cellNum ? "🪜" : "🐍"}
                            </span>
                        )}
                    </div>
                );
            }
        }
        return cells;
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">

            <div className="text-center mb-6">
                <h2 className="text-4xl font-black italic tracking-tighter uppercase">
                    VS <span className="text-blue-500">COMPUTER</span>
                </h2>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-2 ${turn === "PLAYER" ? "text-red-500" : "text-blue-500"}`}>
                    {message}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="grid grid-cols-10 border-2 border-white/10 rounded-xl overflow-hidden bg-[#0a0a0a] shadow-2xl">
                    {renderBoard()}
                </div>

                <div className="flex flex-col items-center bg-white/5 p-6 rounded-[2rem] border border-white/10 w-full max-w-[280px]">
                    <div className="flex justify-around w-full mb-6">
                        <div className={`p-3 rounded-xl text-center ${turn === "PLAYER" ? "bg-red-500/20 border border-red-500" : "opacity-30"}`}>
                            <p className="text-[8px] font-bold">YOU (🔴)</p>
                            <p className="text-xl font-black">{playerPos}</p>
                        </div>
                        <div className={`p-3 rounded-xl text-center ${turn === "CPU" ? "bg-blue-500/20 border border-blue-500" : "opacity-30"}`}>
                            <p className="text-[8px] font-bold">CPU (🔵)</p>
                            <p className="text-xl font-black">{cpuPos}</p>
                        </div>
                    </div>

                    <div className={`text-6xl mb-6 ${isRolling ? "animate-spin" : ""}`}>
                        {["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][diceNum]}
                    </div>

                    <button
                        onClick={rollDice}
                        disabled={isRolling || turn === "CPU" || playerPos === 100 || cpuPos === 100}
                        className="w-full bg-white text-black font-black py-4 rounded-2xl uppercase text-xs tracking-widest hover:bg-gray-200 disabled:opacity-20 transition-all"
                    >
                        {turn === "CPU" ? "CPU Rolling..." : "Roll Dice"}
                    </button>

                    {(playerPos === 100 || cpuPos === 100) && (
                        <button onClick={resetGame} className="w-full mt-4 bg-red-600 text-white font-black py-4 rounded-2xl uppercase text-xs tracking-widest">
                            Restart Game
                        </button>
                    )}
                </div>
            </div>

            <button onClick={() => navigate("/")} className="mt-8 text-gray-700 hover:text-white text-[9px] font-black uppercase tracking-[0.4em]">
                ← Back to Dashboard
            </button>
        </div>
    );
}

export default SaanpSidi;