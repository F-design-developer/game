import React, { useState } from "react";
import { FaInstagram, FaDiscord, FaTwitter, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Games", href: "#games" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-lg border-b border-green-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* 🚀 Logo */}
          <div className="text-2xl font-black tracking-tighter text-green-400 italic">
            AROME<span className="text-white">GAMES</span>
          </div>

          {/* 💻 Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-green-400 transition-all hover:tracking-[0.3em]">
                {link.name}
              </a>
            ))}
          </nav>

          {/* 📱 Social Icons (Desktop) */}
          <div className="hidden md:flex gap-5 text-xl text-gray-300">
            <a href="#" className="hover:text-green-400 transition-transform hover:-translate-y-1"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400 transition-transform hover:-translate-y-1"><FaDiscord /></a>
            <a href="#" className="hover:text-blue-400 transition-transform hover:-translate-y-1"><FaTwitter /></a>
          </div>

          {/* 🍔 Hamburger Button */}
          <button
            className="md:hidden text-2xl text-green-400 p-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* 🌑 Mobile Sidebar Overlay (Background Blur) */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* 📂 Actual Side Bar Menu */}
      <div className={`fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-slate-950 z-[120] border-l border-green-500/20 shadow-2xl transition-transform duration-500 ease-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}>

        {/* Close Button Inside Sidebar */}
        <div className="flex justify-between items-center p-6 border-b border-white/5">
          <span className="text-green-400 font-black italic">MENU</span>
          <button
            className="text-2xl text-white hover:text-red-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-8 gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold uppercase tracking-widest text-gray-300 hover:text-green-400 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Sidebar Footer (Socials) */}
        <div className="absolute bottom-10 left-0 w-full px-8">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-4 font-bold">Follow Us</p>
          <div className="flex gap-6 text-2xl text-gray-400">
            <a href="#" className="hover:text-green-400"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400"><FaDiscord /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;