import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const COLS = 10;
const ROWS = 20;

const SHAPES = {
  I: [[1, 1, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
  O: [[1, 1], [1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  T: [[0, 1, 0], [1, 1, 1]],
  Z: [[1, 1, 0], [0, 1, 1]],
};

const COLORS = {
  I: "bg-cyan-400 shadow-[0_0_10px_#22d3ee]",
  J: "bg-blue-500 shadow-[0_0_10px_#3b82f6]",
  L: "bg-orange-500 shadow-[0_0_10px_#f97316]",
  O: "bg-yellow-400 shadow-[0_0_10px_#facc15]",
  S: "bg-green-500 shadow-[0_0_10px_#22c55e]",
  T: "bg-purple-500 shadow-[0_0_10px_#a855f7]",
  Z: "bg-red-500 shadow-[0_0_10px_#ef4444]",
};

const Tetris = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [activePiece, setActivePiece] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const spawnPiece = useCallback(() => {
    const keys = Object.keys(SHAPES);
    const type = keys[Math.floor(Math.random() * keys.length)];
    const shape = SHAPES[type];
    return {
      pos: { x: Math.floor(COLS / 2) - 1, y: 0 },
      shape,
      type,
    };
  }, []);

  useEffect(() => {
    setActivePiece(spawnPiece());
  }, [spawnPiece]);

  const collision = (x, y, shape) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          let newX = x + c;
          let newY = y + r;
          if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && grid[newY][newX])) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const moveDown = useCallback(() => {
    if (!activePiece || gameOver) return;
    if (!collision(activePiece.pos.x, activePiece.pos.y + 1, activePiece.shape)) {
      setActivePiece((prev) => ({ ...prev, pos: { ...prev.pos, y: prev.pos.y + 1 } }));
    } else {
      // Landed
      const newGrid = [...grid.map(row => [...row])];
      activePiece.shape.forEach((row, r) => {
        row.forEach((value, c) => {
          if (value) {
            const y = activePiece.pos.y + r;
            const x = activePiece.pos.x + c;
            if (y >= 0) newGrid[y][x] = activePiece.type;
          }
        });
      });

      // Clear Rows
      let rowsCleared = 0;
      const finalGrid = newGrid.filter(row => {
        if (row.every(cell => cell !== 0)) {
          rowsCleared++;
          return false;
        }
        return true;
      });
      
      while (finalGrid.length < ROWS) finalGrid.unshift(Array(COLS).fill(0));
      
      setGrid(finalGrid);
      setScore(s => s + (rowsCleared * 100));
      
      const nextPiece = spawnPiece();
      if (collision(nextPiece.pos.x, nextPiece.pos.y, nextPiece.shape)) {
        setGameOver(true);
      } else {
        setActivePiece(nextPiece);
      }
    }
  }, [activePiece, grid, gameOver, spawnPiece]);

  useEffect(() => {
    const interval = setInterval(moveDown, 800);
    return () => clearInterval(interval);
  }, [moveDown]);

  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;
      if (e.key === "ArrowLeft" && !collision(activePiece.pos.x - 1, activePiece.pos.y, activePiece.shape)) {
        setActivePiece(prev => ({ ...prev, pos: { ...prev.pos, x: prev.pos.x - 1 } }));
      }
      if (e.key === "ArrowRight" && !collision(activePiece.pos.x + 1, activePiece.pos.y, activePiece.shape)) {
        setActivePiece(prev => ({ ...prev, pos: { ...prev.pos, x: prev.pos.x + 1 } }));
      }
      if (e.key === "ArrowDown") moveDown();
      if (e.key === "ArrowUp") {
        const rotated = activePiece.shape[0].map((_, i) => activePiece.shape.map(row => row[i]).reverse());
        if (!collision(activePiece.pos.x, activePiece.pos.y, rotated)) {
          setActivePiece(prev => ({ ...prev, shape: rotated }));
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activePiece, gameOver, moveDown]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase">BLOCK <span className="text-blue-500">FALL</span></h2>
        <div className="mt-4 bg-white/5 border border-white/10 px-6 py-2 rounded-xl inline-block">
          <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Score</p>
          <p className="text-xl font-bold text-blue-400">{score}</p>
        </div>
      </div>

      <div className="relative border-4 border-white/10 bg-black p-1 rounded-xl shadow-2xl">
        <div className="grid grid-cols-10 gap-px bg-white/5" style={{ width: "240px", height: "480px" }}>
          {grid.map((row, y) => row.map((cell, x) => {
            let color = cell ? COLORS[cell] : "bg-transparent";
            
            // Draw active piece
            if (activePiece) {
              const { pos, shape, type } = activePiece;
              const r = y - pos.y;
              const c = x - pos.x;
              if (r >= 0 && r < shape.length && c >= 0 && c < shape[r].length && shape[r][c]) {
                color = COLORS[type];
              }
            }

            return <div key={`${y}-${x}`} className={`w-full h-full rounded-[2px] ${color}`} />;
          }))}
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center rounded-lg">
            <h3 className="text-2xl font-black text-red-500 mb-4 italic">CRASHED!</h3>
            <button onClick={() => window.location.reload()} className="bg-white text-black px-6 py-2 rounded-full font-bold uppercase text-xs">Restart</button>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={() => navigate("/")} className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">← Exit Terminal</button>
      </div>
    </div>
  );
};

export default Tetris;