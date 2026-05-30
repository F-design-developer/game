import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WhackAMole = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [activeMole, setActiveMole] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const moleTimer = setInterval(() => {
      setActiveMole(Math.floor(Math.random() * 9));
    }, 800);
    return () => clearInterval(moleTimer);
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm flex justify-between items-end mb-12">
        <div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">CYBER <span className="text-green-500">STRIKE</span></h2>
            <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">Target the glitches</p>
        </div>
        <div className="text-right">
            <p className="text-red-500 font-black text-2xl tracking-tighter">{timeLeft}s</p>
            <p className="text-white font-black text-xl italic">{score}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            onClick={() => {
              if (i === activeMole && timeLeft > 0) {
                setScore(s => s + 1);
                setActiveMole(null);
              }
            }}
            className={`w-24 h-24 md:w-28 md:h-28 rounded-3xl border transition-all duration-150 flex items-center justify-center text-4xl cursor-crosshair
              ${activeMole === i 
                ? "bg-green-500 shadow-[0_0_30px_#22c55e] border-white scale-110" 
                : "bg-white/5 border-white/5 hover:bg-white/10"}`}
          >
            {activeMole === i ? "👾" : ""}
          </div>
        ))}
      </div>

      {timeLeft === 0 && (
        <div className="mt-12 text-center animate-bounce">
            <h3 className="text-2xl font-black text-white italic uppercase">Final Score: {score}</h3>
            <button onClick={() => window.location.reload()} className="mt-4 text-green-500 font-bold underline uppercase text-xs tracking-widest">Reboot System</button>
        </div>
      )}

      <button onClick={() => navigate("/")} className="mt-16 text-gray-700 hover:text-white uppercase text-[10px] font-black tracking-widest transition-all">← Exit Terminal</button>
    </div>
  );
};

export default WhackAMole;