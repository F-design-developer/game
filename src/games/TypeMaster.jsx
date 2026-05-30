import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const WORDS = ["react", "tailwind", "javascript", "frontend", "developer", "component", "interface", "dynamic", "responsive", "perfume", "aurora", "coding", "velocity", "keyboard", "engine"];

function TypeMaster() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setGameOver(true);
      setIsActive(false);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!isActive && !gameOver) setIsActive(true);

    if (value.trim().toLowerCase() === targetWord) {
      setScore((s) => s + 1);
      setUserInput("");
      setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    } else {
      setUserInput(value);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setIsActive(false);
    setUserInput("");
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
          TYPE <span className="text-slate-400">MASTER</span>
        </h2>
        <p className="text-[10px] font-bold text-gray-500 tracking-[0.3em] mt-2">TEST YOUR VELOCITY</p>
      </div>

      <div className="w-full max-w-xl bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl text-center">
        {!gameOver ? (
          <>
            <div className="flex justify-between mb-12 px-4">
              <div className="text-left">
                <p className="text-[9px] font-black uppercase text-gray-500">Timer</p>
                <p className={`text-3xl font-black ${timeLeft < 10 ? "text-red-500 animate-pulse" : "text-white"}`}>{timeLeft}s</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black uppercase text-gray-500">Words</p>
                <p className="text-3xl font-black text-slate-400">{score}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-5xl font-black tracking-tight text-white/20 mb-2 blur-[1px] select-none">{targetWord}</p>
              <p className="text-6xl font-black tracking-tighter text-white animate-in slide-in-from-bottom-4">{targetWord}</p>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleChange}
              placeholder="Start typing..."
              className="w-full bg-white/5 border-b-2 border-slate-700 py-4 text-center text-3xl font-bold outline-none focus:border-white transition-all capitalize"
              autoFocus
            />
          </>
        ) : (
          <div className="py-10">
            <h3 className="text-3xl font-black uppercase text-red-500 italic mb-2">Time's Up!</h3>
            <p className="text-6xl font-black mb-8">{score} <span className="text-sm text-gray-500 uppercase">WPM</span></p>
            <button onClick={resetGame} className="bg-white text-black px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all">
              Try Again
            </button>
          </div>
        )}
      </div>
      <button onClick={() => navigate("/")} className="mt-12 text-gray-700 hover:text-white text-[9px] font-black uppercase tracking-[0.4em]">← Return to Base</button>
    </div>
  );
}

export default TypeMaster;