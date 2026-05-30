import React from "react";
import { FaDiscord, FaTwitter, FaGithub, FaInstagram, FaArrowRight } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative bg-slate-950 border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden">

            {/* 🌌 Background Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

                {/* 🛡️ Brand Identity (4 Columns) */}
                <div className="md:col-span-4 space-y-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-black text-black">A</div>
                        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                            AROME <span className="text-green-500 underline decoration-2 underline-offset-4">STORE</span>
                        </h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
                        Experience the best hand-crafted React games. From retro classics to modern arcade,
                        we bring the fun directly to your browser with zero latency.
                    </p>

                    {/* 📱 Social Icons */}
                    <div className="flex space-x-4">
                        {[FaDiscord, FaTwitter, FaInstagram, FaGithub].map((Icon, idx) => (
                            <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* 🔗 Navigation Sections (4 Columns) */}
                <div className="md:col-span-4 grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Platform</h4>
                        <ul className="text-gray-500 space-y-4 text-sm font-medium uppercase tracking-wider">
                            <li className="hover:text-green-400 cursor-pointer transition-colors flex items-center group">
                                <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 text-green-500">•</span> Games
                            </li>
                            <li className="hover:text-green-400 cursor-pointer transition-colors">Mission</li>
                            <li className="hover:text-green-400 cursor-pointer transition-colors">The Vault</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Support</h4>
                        <ul className="text-gray-500 space-y-4 text-sm font-medium uppercase tracking-wider">
                            <li className="hover:text-green-400 cursor-pointer transition-colors">Bug Report</li>
                            <li className="hover:text-green-400 cursor-pointer transition-colors">Feedback</li>
                            <li className="hover:text-green-400 cursor-pointer transition-colors">Privacy</li>
                        </ul>
                    </div>
                </div>

                {/* 📩 Premium Newsletter (4 Columns) */}
                <div className="md:col-span-4">
                    <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full group-hover:bg-green-500/20 transition-all"></div>

                        <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-[0.2em]">Join the Squad</h4>
                        <p className="text-gray-500 text-xs mb-6 font-medium">Get notified about new game drops.</p>

                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-slate-900 border border-white/10 px-5 py-4 text-sm rounded-2xl outline-none focus:border-green-500/50 transition-all text-white pr-14"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-green-500 text-black px-4 rounded-xl hover:bg-green-400 transition-all active:scale-95 flex items-center justify-center">
                                <FaArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* 📜 Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-[10px] uppercase font-bold tracking-[0.3em]">
                    &copy; 2026 Arome Games. All rights reserved.
                </p>
                <div className="flex space-x-8 text-gray-700 text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="hover:text-gray-400 cursor-pointer">Terms</span>
                    <span className="hover:text-gray-400 cursor-pointer">Security</span>
                    <span className="hover:text-gray-400 cursor-pointer">Status</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;  