import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const GRID_SIZE = 4;

const Puzzle2048 = () => {
    const navigate = useNavigate();
    const [grid, setGrid] = useState(Array(GRID_SIZE * GRID_SIZE).fill(0));
    const [score, setScore] = useState(0);

    // 🎲 Add a random tile (2 or 4)
    const addRandomTile = useCallback((currentGrid) => {
        const emptyTiles = currentGrid.map((val, idx) => (val === 0 ? idx : null)).filter(v => v !== null);
        if (emptyTiles.length === 0) return currentGrid;
        const randomIdx = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        const newGrid = [...currentGrid];
        newGrid[randomIdx] = Math.random() > 0.1 ? 2 : 4;
        return newGrid;
    }, []);

    // ✨ Initialize Game
    useEffect(() => {
        let initialGrid = Array(16).fill(0);
        initialGrid = addRandomTile(initialGrid);
        initialGrid = addRandomTile(initialGrid);
        setGrid(initialGrid);
    }, [addRandomTile]);

    // 🛠️ Movement Logic Functions
    const slide = (row) => {
        let arr = row.filter(val => val !== 0);
        let missing = GRID_SIZE - arr.length;
        let zeros = Array(missing).fill(0);
        return arr.concat(zeros);
    };

    const combine = (row) => {
        for (let i = 0; i < GRID_SIZE - 1; i++) {
            if (row[i] !== 0 && row[i] === row[i + 1]) {
                row[i] = row[i] * 2;
                setScore(prev => prev + row[i]);
                row[i + 1] = 0;
            }
        }
        return row;
    };

    const moveLeft = useCallback(() => {
        let newGrid = [...grid];
        let changed = false;
        for (let i = 0; i < GRID_SIZE; i++) {
            let startRow = newGrid.slice(i * 4, i * 4 + 4);
            let slided = slide(startRow);
            let combined = combine(slided);
            let finalRow = slide(combined);
            if (JSON.stringify(startRow) !== JSON.stringify(finalRow)) changed = true;
            newGrid.splice(i * 4, 4, ...finalRow);
        }
        if (changed) setGrid(addRandomTile(newGrid));
    }, [grid, addRandomTile]);

    const moveRight = useCallback(() => {
        let newGrid = [...grid];
        let changed = false;
        for (let i = 0; i < GRID_SIZE; i++) {
            let startRow = newGrid.slice(i * 4, i * 4 + 4).reverse();
            let slided = slide(startRow);
            let combined = combine(slided);
            let finalRow = slide(combined).reverse();
            if (JSON.stringify(newGrid.slice(i * 4, i * 4 + 4)) !== JSON.stringify(finalRow)) changed = true;
            newGrid.splice(i * 4, 4, ...finalRow);
        }
        if (changed) setGrid(addRandomTile(newGrid));
    }, [grid, addRandomTile]);

    const moveUp = useCallback(() => {
        let newGrid = [...grid];
        let changed = false;
        for (let i = 0; i < GRID_SIZE; i++) {
            let startRow = [grid[i], grid[i + 4], grid[i + 8], grid[i + 12]];
            let slided = slide(startRow);
            let combined = combine(slided);
            let finalRow = slide(combined);
            for (let j = 0; j < GRID_SIZE; j++) {
                if (newGrid[i + j * 4] !== finalRow[j]) changed = true;
                newGrid[i + j * 4] = finalRow[j];
            }
        }
        if (changed) setGrid(addRandomTile(newGrid));
    }, [grid, addRandomTile]);

    const moveDown = useCallback(() => {
        let newGrid = [...grid];
        let changed = false;
        for (let i = 0; i < GRID_SIZE; i++) {
            let startRow = [grid[i], grid[i + 4], grid[i + 8], grid[i + 12]].reverse();
            let slided = slide(startRow);
            let combined = combine(slided);
            let finalRow = slide(combined).reverse();
            for (let j = 0; j < GRID_SIZE; j++) {
                if (newGrid[i + j * 4] !== finalRow[j]) changed = true;
                newGrid[i + j * 4] = finalRow[j];
            }
        }
        if (changed) setGrid(addRandomTile(newGrid));
    }, [grid, addRandomTile]);

    // 🎹 Keyboard Event Listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") moveLeft();
            if (e.key === "ArrowRight") moveRight();
            if (e.key === "ArrowUp") moveUp();
            if (e.key === "ArrowDown") moveDown();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [moveLeft, moveRight, moveUp, moveDown]);

    const getTileStyle = (val) => {
        if (val === 0) return "bg-white/5 border-white/5";
        const colors = {
            2: "bg-slate-800 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)] border-white/10",
            4: "bg-slate-700 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] border-white/10",
            8: "bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] border-orange-500/50",
            16: "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] border-orange-400/50",
            32: "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] border-red-400/50",
            64: "bg-red-700 text-white shadow-[0_0_25px_rgba(220,38,38,0.6)] border-red-500",
            128: "bg-yellow-500 text-black shadow-[0_0_30px_rgba(234,179,8,0.7)] border-yellow-300",
            256: "bg-yellow-400 text-black shadow-[0_0_35px_#facc15] border-white",
        };
        return colors[val] || "bg-green-500 text-black shadow-[0_0_35px_#22c55e]";
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
            <div className="mb-10 text-center">
                <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-tight">
                    2048 <span className="text-orange-500 underline decoration-4 underline-offset-8">CORE</span>
                </h2>
                <div className="mt-8 flex gap-6 justify-center items-center">
                    <div className="bg-white/5 px-8 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                        <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-1">Score</p>
                        <p className="text-2xl font-black text-white">{score}</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-green-500 transition-all active:scale-95"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3 bg-white/5 p-4 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-sm">
                {grid.map((val, i) => (
                    <div
                        key={i}
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl font-black transition-all duration-300 border-2 ${getTileStyle(val)}`}
                    >
                        {val !== 0 ? val : ""}
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center space-y-4">
                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">
                    Use Arrow Keys to Navigate
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="block mx-auto text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
                >
                    ← Return to Vault
                </button>
            </div>
        </div>
    );
};

export default Puzzle2048;