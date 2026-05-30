import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function SpaceShooter() {
  const navigate = useNavigate()

  const WIDTH = 380
  const HEIGHT = 550
  const PLAYER_SIZE = 40
  const ENEMY_SIZE = 35

  const [playerX, setPlayerX] = useState(WIDTH / 2 - 20)
  const [bullets, setBullets] = useState([])
  const [enemy, setEnemy] = useState({ x: 150, y: -50 })
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  // 🎮 GAME LOOP
  useEffect(() => {
    if (gameOver) return
    const gameLoop = setInterval(() => {
      setEnemy((prev) => {
        let newY = prev.y + (4 + score / 10)
        if (newY > HEIGHT) {
          setGameOver(true)
          return prev
        }
        return { ...prev, y: newY }
      })

      setBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - 12 }))
          .filter((b) => b.y > -20)
      )
    }, 30)
    return () => clearInterval(gameLoop)
  }, [gameOver, score])

  // 💥 Collision Detection
  useEffect(() => {
    bullets.forEach((bullet) => {
      const dx = bullet.x - (enemy.x + ENEMY_SIZE / 2)
      const dy = bullet.y - (enemy.y + ENEMY_SIZE / 2)
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 25) {
        setScore((s) => s + 1)
        setEnemy({
          x: Math.floor(Math.random() * (WIDTH - ENEMY_SIZE)),
          y: -50,
        })
        setBullets(prev => prev.filter(b => b !== bullet))
      }
    })
  }, [bullets, enemy])

  // ⌨️ Controls (Fixed Scroll Issue)
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return

      // 🛑 Yahan hai fix: Space or Arrows se scroll band karne ke liye
      if ([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault() 
      }

      if (e.key === "ArrowLeft") {
        setPlayerX((x) => Math.max(0, x - 25))
      }
      if (e.key === "ArrowRight") {
        setPlayerX((x) => Math.min(WIDTH - PLAYER_SIZE, x + 25))
      }
      if (e.key === " " || e.key === "ArrowUp") {
        setBullets((prev) => [...prev, { x: playerX + 18, y: HEIGHT - 60 }])
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [playerX, gameOver])

  const resetGame = () => {
    setPlayerX(WIDTH / 2 - 20)
    setBullets([])
    setEnemy({ x: Math.floor(Math.random() * (WIDTH - ENEMY_SIZE)), y: -50 })
    setScore(0)
    setGameOver(false)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 outline-none">
      
      <div className="text-center mb-6">
        <h2 className="text-4xl font-black italic uppercase text-white">
            GALAXY <span className="text-red-500">WAR</span>
        </h2>
        <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Score: {score}</p>
      </div>

      <div 
        className="relative bg-[#0a0a0f] border-2 border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        style={{ width: WIDTH, height: HEIGHT }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,_#ffffff10_1px,_transparent_1px)] bg-[size:20px_20px]"></div>

        <div
          className="absolute transition-all duration-100 text-4xl"
          style={{ bottom: 20, left: playerX, width: PLAYER_SIZE }}
        >
          🚀
        </div>

        <div
          className="absolute text-4xl"
          style={{ top: enemy.y, left: enemy.x, width: ENEMY_SIZE }}
        >
          👾
        </div>

        {bullets.map((b, i) => (
          <div
            key={i}
            className="absolute w-1 h-4 bg-red-500 rounded-full shadow-[0_0_8px_red]"
            style={{ top: b.y, left: b.x }}
          />
        ))}

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
            <h3 className="text-3xl font-black text-red-500 mb-6 uppercase tracking-tighter italic">Mission Failed</h3>
            <button 
              onClick={resetGame}
              className="bg-white text-black px-10 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      <button 
        onClick={() => navigate("/")}
        className="mt-8 text-gray-700 hover:text-white transition-colors text-[9px] font-black uppercase tracking-[0.4em]"
      >
        ← Return to Base
      </button>
    </div>
  )
}

export default SpaceShooter