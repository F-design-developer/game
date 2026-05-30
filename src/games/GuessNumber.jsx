import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function GuessNumber() {
    const navigate = useNavigate()

    // Helper function naya number generate karne ke liye
    const generateNumber = () => Math.floor(Math.random() * 10) + 1

    const [targetNumber, setTargetNumber] = useState(generateNumber())
    const [guess, setGuess] = useState("")
    const [userLastGuess, setUserLastGuess] = useState(null)
    const [computerLastNumber, setComputerLastNumber] = useState(null)
    const [message, setMessage] = useState("Every guess changes the target!")
    const [attempts, setAttempts] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    const handleGuess = (e) => {
        if (e) e.preventDefault()
        if (!guess || gameOver) return

        const userNum = Number(guess)

        if (userNum < 1 || userNum > 10) {
            setMessage("Range is 1 to 10 only! 🛑")
            return
        }

        // 1. Aapka aur Computer ka purana number dikhao
        setUserLastGuess(userNum)
        setComputerLastNumber(targetNumber)
        setAttempts((prev) => prev + 1)

        // 2. Check karo ki match hua ya nahi
        if (userNum === targetNumber) {
            setMessage("🎉 BOOM! Exact Match! You Win!")
            setGameOver(true)
        } else {
            setMessage("❌ No Match! Computer changed the number.")

            // 3. ⚡ AUTOMATIC CHANGE: Agle guess ke liye naya number set karo
            setTargetNumber(generateNumber())
        }
        setGuess("")
    }

    const resetGame = () => {
        setTargetNumber(generateNumber())
        setGuess("")
        setUserLastGuess(null)
        setComputerLastNumber(null)
        setMessage("System Rebooted. New Target Set!")
        setAttempts(0)
        setGameOver(false)
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">

            <div className="text-center mb-8">
                <h2 className="text-4xl font-black italic tracking-tighter uppercase">
                    AUTO <span className="text-orange-500">SHUFFLE</span>
                </h2>
                <p className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase mt-1">Target changes every turn</p>
            </div>

            <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl">

                {/* 📊 Side-by-Side Display */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-orange-500/5 p-5 rounded-3xl border border-orange-500/10 text-center">
                        <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-2">Your Guess</p>
                        <div className="text-5xl font-black italic text-white">
                            {userLastGuess || "-"}
                        </div>
                    </div>
                    <div className="bg-white/5 p-5 rounded-3xl border border-white/10 text-center">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Computer Had</p>
                        <div className="text-5xl font-black italic text-orange-500">
                            {computerLastNumber || "?"}
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <div className="min-h-[50px] flex items-center justify-center mb-6 px-4">
                        <h3 className={`text-sm font-bold uppercase italic tracking-wider leading-tight ${gameOver ? "text-green-400" : "text-gray-400"}`}>
                            {message}
                        </h3>
                    </div>

                    <form onSubmit={handleGuess} className="space-y-4">
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            disabled={gameOver}
                            className="w-full bg-white/5 border border-white/10 py-5 rounded-2xl text-center text-4xl font-black focus:border-orange-500/50 outline-none transition-all"
                            placeholder="1-10"
                        />

                        {!gameOver ? (
                            <button
                                type="submit"
                                className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-orange-500 active:scale-95 transition-all"
                            >
                                Try My Luck
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={resetGame}
                                className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition-all"
                            >
                                Restart Core
                            </button>
                        )}
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-40">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-tighter">Total Tries</p>
                            <p className="text-lg font-bold">{attempts}</p>
                        </div>
                        <div className="text-right text-orange-500 font-black italic text-xs">
                            ACTIVE SHUFFLE
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate("/")}
                className="mt-10 text-gray-700 hover:text-white transition-colors text-[9px] font-black uppercase tracking-[0.4em]"
            >
                ← Return to Base
            </button>
        </div>
    )
}

export default GuessNumber