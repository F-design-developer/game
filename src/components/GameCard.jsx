import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaGamepad } from "react-icons/fa";

function GameCard({ title, link, icon = "🎮", color = "from-green-500 to-emerald-700", shadow = "shadow-green-500/20" }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(link)}
      className="group relative cursor-pointer"
    >
      {/* 🟢 Outer Glow Layer (Hover par chamkega) */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-[2rem] blur opacity-20 group-hover:opacity-60 transition duration-500`}></div>

      {/* 🛸 Main Card Body */}
      <div className="relative flex flex-col h-full bg-slate-950 border border-white/10 rounded-[2rem] p-8 overflow-hidden backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:border-white/20">
        
        {/* 🎇 Background Abstract Pattern (Optional) */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-all`}></div>

        {/* 🕹️ Icon Section */}
        <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-3xl shadow-lg ${shadow} transform transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110`}>
          {icon}
        </div>

        {/* 📝 Text Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-black text-white italic uppercase tracking-tighter group-hover:text-green-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online Now
          </p>
        </div>

        {/* ⚡ Action Button (Slide up animation) */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Arcade V1.0</span>
          
          <div className="flex items-center gap-2 text-green-500 font-black text-sm uppercase tracking-tighter opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
            Play <FaPlay size={10} />
          </div>
        </div>

        {/* 🏎️ Bottom Edge Accent */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
      </div>
    </div>
  );
}

export default GameCard;