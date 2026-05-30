import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TicTacToe = () => {
    const navigate = useNavigate();
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
        }
        return null;
    };

    const winner = calculateWinner(board);
    const status = winner ? `Winner: ${winner}` : board.every(s => s) ? "Draw!" : `Next: ${isXNext ? "X" : "O"}`;

    const handleClick = (i) => {
        if (board[i] || winner) return;
        const nextBoard = [...board];
        nextBoard[i] = isXNext ? "X" : "O";
        setBoard(nextBoard);
        setIsXNext(!isXNext);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
            <h2 className="text-5xl font-black italic mb-8 tracking-tighter uppercase">
                TIC TAC <span className="text-green-500">TOE</span>
            </h2>

            <p className="mb-6 text-sm font-bold uppercase tracking-[0.4em] text-gray-500">{status}</p>

            <div className="grid grid-cols-3 gap-4">
                {board.map((val, i) => (
                    <button
                        key={i}
                        onClick={() => handleClick(i)}
                        className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl text-4xl font-black flex items-center justify-center hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 shadow-2xl"
                    >
                        <span className={val === "X" ? "text-green-400" : "text-blue-400"}>{val}</span>
                    </button>
                ))}
            </div>

            <div className="mt-12 flex gap-4">
                <button onClick={() => setBoard(Array(9).fill(null))} className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-500 transition-all">Reset</button>
                <button onClick={() => navigate("/")} className="border border-white/20 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all">Home</button>
            </div>
        </div>
    );
};

export default TicTacToe;