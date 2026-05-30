import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ICONS = ["🎮", "🕹️", "🚀", "👾", "💎", "🎯", "⚡", "🔥"];

const MemoryGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon }));
    setCards(shuffled);
  }, []);

  const handleClick = (id) => {
    if (flipped.length === 2 || solved.includes(id) || flipped.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setSolved([...solved, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">BRAIN <span className="text-blue-500">FUSE</span></h2>
        <p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">Moves: {moves}</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`w-16 h-20 md:w-20 md:h-24 cursor-pointer rounded-xl border transition-all duration-500 flex items-center justify-center text-3xl 
              ${flipped.includes(card.id) || solved.includes(card.id) 
                ? "bg-blue-600/20 border-blue-500 rotate-y-180 shadow-[0_0_15px_#3b82f6]" 
                : "bg-white/5 border-white/10 hover:border-white/30"}`}
          >
            {flipped.includes(card.id) || solved.includes(card.id) ? card.icon : "❓"}
          </div>
        ))}
      </div>

      {solved.length === cards.length && (
        <button onClick={() => window.location.reload()} className="mt-10 bg-blue-500 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-400 transition-all">Play Again</button>
      )}
      
      <button onClick={() => navigate("/")} className="mt-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">← Back to Store</button>
    </div>
  );
};

export default MemoryGame;
