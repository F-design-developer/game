import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import GameCard from "../components/GameCard";


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 📝 Form State for Contact
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // ⚠️ Error State
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Bhai, saare fields bharna zaroori hai! 🛑");
      return;
    }
    setError("");
    alert("Message Sent Successfully! 🚀");
  };

  const games = [
    { id: "tic-tac-toe", name: "Tic Tac Toe", icon: "❌", color: "from-blue-600 to-cyan-400", shadow: "shadow-blue-500/20" },
    { id: "snake", name: "Snake Game", icon: "🐍", color: "from-green-600 to-emerald-400", shadow: "shadow-green-500/20" },
    { id: "rock", name: "Rock Paper", icon: "✊", color: "from-red-600 to-orange-400", shadow: "shadow-red-500/20" },
    { id: "memory", name: "Memory Game", icon: "🧠", color: "from-purple-600 to-pink-400", shadow: "shadow-purple-500/20" },
    { id: "flappy", name: "Flappy Bird", icon: "🐦", color: "from-yellow-500 to-orange-400", shadow: "shadow-yellow-500/20" },
    { id: "breakout", name: "Breakout", icon: "🧱", color: "from-indigo-600 to-blue-500", shadow: "shadow-indigo-500/20" },
    { id: "guess", name: "Guess Number", icon: "🔢", color: "from-teal-500 to-green-400", shadow: "shadow-teal-500/20" },
    { id: "car", name: "Car Game", icon: "🏎️", color: "from-red-500 via-orange-600 to-red-700", shadow: "shadow-red-500/50" },
    { id: "space", name: "Space Shooter", icon: "🚀", color: "from-violet-600 to-fuchsia-500", shadow: "shadow-violet-500/20" },
    { id: "puzzle-2048", name: "2048 Core", icon: "🔢", color: "from-orange-600 to-yellow-500", shadow: "shadow-orange-500/30" },
    { id: "strike", name: "Cyber Strike", icon: "👾", color: "from-emerald-500 to-green-700", shadow: "shadow-green-500/40" },
    { id: "tetris", name: "Block Fall", icon: "🧱", color: "from-blue-500 to-indigo-700", shadow: "shadow-blue-500/30" },
    { id: "saanp-sidi", name: "Snake Ladder", icon: "🐍", color: "from-green-500 to-emerald-700", shadow: "shadow-green-500/30" },
    { id: "speed-typer", name: "Type Master", icon: "⌨️", color: "from-slate-600 to-slate-900", shadow: "shadow-slate-500/30" },
    { id: "dino-run", name: "Neon Runner", icon: "🦖", color: "from-gray-500 to-gray-700", shadow: "shadow-gray-500/20" }
  ];

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black text-white selection:bg-green-500 selection:text-black">
      {/* 🌌 Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* 🚀 Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 z-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-40"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 border border-green-500/30 rounded-full bg-green-500/5 backdrop-blur-sm">
            <span className="text-xs font-bold tracking-[0.3em] text-green-400 uppercase italic">Next Gen Gaming Portal</span>
          </div>
          <h1 className="text-6xl md:text-[120px] font-black leading-[0.9] tracking-tighter mb-8 italic uppercase">
            PLAY <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">BEYOND</span> <br />
            <span className="text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.4)]">LIMITS</span>
          </h1>
          <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Experience the future of browser gaming with AROME'S premium collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a href="#games" className="w-full sm:w-auto bg-green-500 text-black px-12 py-4 rounded-xl font-black hover:bg-green-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(34,197,94,0.3)] tracking-widest uppercase text-sm">
              EXPLORE GAMES
            </a>
            <a href="#about" className="w-full sm:w-auto border border-white/20 px-12 py-4 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-md uppercase tracking-widest text-sm text-white">
              THE MISSION
            </a>
          </div>
        </div>
      </section>

      {/* 🎮 Games Grid Section */}

      <section id="games" className="relative py-32 px-6 max-w-7xl mx-auto z-10">

        {/* 🛠️ Header Section: Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">

          {/* 🏷️ Left Side: Title Area */}
          <div className="order-1 flex flex-col items-start space-y-2">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              THE <span className="text-green-500">VAULT</span>
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-green-500 to-transparent"></div>
            <p className="text-gray-500 font-medium max-w-sm text-xs md:text-sm uppercase tracking-[0.2em]">
              {filteredGames.length} Games Available
            </p>
          </div>

          {/* 🔍 Right Side: Search Bar */}
          <div className="order-2 relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Filter games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-green-500/50 focus:bg-white/10 transition-all font-medium text-sm text-white shadow-2xl"
            />
          </div>
        </div>

        {/* 🎮 Games Grid: Using the Premium GameCard Component */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <GameCard
                key={game.id}
                title={game.name}
                link={`/${game.id}`}
                icon={game.icon}
                color={game.color}
                shadow={game.shadow}
              />
            ))
          ) : (
            /* 🔎 Empty State: No Games Found */
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem] backdrop-blur-sm">
              <p className="text-gray-500 italic text-xl">
                No games found for <span className="text-white">"{searchTerm}"</span>
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-green-500 text-sm font-bold underline uppercase tracking-widest hover:text-green-400 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ℹ️ About Section */}
      <section id="about" className="py-32 px-6 z-10">

        <div className="max-w-6xl mx-auto bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-20 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>

              <h2 className="text-4xl md:text-5xl font-black mb-8 italic uppercase leading-none">
                WE ARE <br /><span className="text-green-500">AROME STORE</span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">
                Ye koi aam gaming site nahi hai. Humne focus kiya hai speed aur accessibility par.
                Bina kisi download ya login ke, aap turant gaming shuru kar sakte hain.
                Hamara stack (React + Vite) aapko lag-free performance deta hai.
              </p>

              <div className="grid grid-cols-2 gap-6">

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-3xl font-black text-white">100%</p>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Responsive</p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-3xl font-black text-white">∞</p>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Fun Factor</p>
                </div>

              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full transition-all group-hover:scale-110"></div>
              <div className="relative aspect-square rounded-[2rem] border border-white/10 bg-slate-900 flex items-center justify-center overflow-hidden">
                <span className="text-[120px] animate-bounce">🎮</span>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* 📧 Contact Section */}
      <section id="contact" className="py-32 px-6 max-w-5xl mx-auto z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase italic tracking-tighter text-white">
            Connect <span className="text-green-500">With Us</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl text-center font-bold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-green-500 transition-all text-white" />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-green-500 transition-all text-white" />
          </div>

          <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-green-500 transition-all text-gray-400 appearance-none">
            <option value="" className="bg-slate-900">Select Subject</option>
            <option value="bug" className="bg-slate-900">Report a Bug</option>
            <option value="idea" className="bg-slate-900">Game Idea</option>
          </select>

          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl h-40 outline-none focus:border-green-500 transition-all text-white resize-none"></textarea>

          <button type="submit" className="w-full bg-white text-black font-black p-5 rounded-2xl hover:bg-green-500 transition-all duration-500 tracking-[0.2em] uppercase text-sm">
            Launch Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;