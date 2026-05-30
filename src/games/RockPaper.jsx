import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const choices = [
  { name: "Rock", icon: "✊", color: "from-red-500 to-orange-600" },
  { name: "Paper", icon: "✋", color: "from-blue-500 to-indigo-600" },
  { name: "Scissors", icon: "✌️", color: "from-green-500 to-emerald-600" },
];

const RockPaperScissors = () => {
  const navigate = useNavigate();
  const [userChoice, setUserChoice] = useState(null);
  const [compChoice, setCompChoice] = useState(null);
  const [result, setResult] = useState("Choose Your Move");

  const play = (choice) => {
    const comp = choices[Math.floor(Math.random() * 3)];
    setUserChoice(choice);
    setCompChoice(comp);

    if (choice.name === comp.name) setResult("IT'S A TIE!");
    else if (
      (choice.name === "Rock" && comp.name === "Scissors") ||
      (choice.name === "Paper" && comp.name === "Rock") ||
      (choice.name === "Scissors" && comp.name === "Paper")
    ) {
      setResult("YOU WIN! 🔥");
    } else {
      setResult("YOU LOST! 💀");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-5xl font-black italic mb-2 tracking-tighter uppercase">BATTLE <span className="text-red-500">ARENA</span></h2>
      <p className={`mb-12 font-bold uppercase tracking-widest text-sm ${result.includes('WIN') ? 'text-green-500' : 'text-gray-500'}`}>{result}</p>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full max-w-2xl mb-16">
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-gray-600">You</p>
          <div className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-6xl shadow-2xl">
            {userChoice?.icon || "?"}
          </div>
        </div>

        <div className="text-4xl font-black italic text-white/20">VS</div>

        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-gray-600">CPU</p>
          <div className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-6xl shadow-2xl">
            {compChoice?.icon || "?"}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {choices.map((c) => (
          <button
            key={c.name}
            onClick={() => play(c)}
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-3xl shadow-lg hover:scale-110 active:scale-95 transition-all`}
          >
            {c.icon}
          </button>
        ))}
      </div>

      <button onClick={() => navigate("/")} className="mt-20 text-gray-700 hover:text-white uppercase text-[10px] font-black tracking-widest transition-all">← Abort Mission</button>
    </div>
  );
};

export default RockPaperScissors;