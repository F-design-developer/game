import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

function CarGame() {
  const navigate = useNavigate()

  // ⚙️ Game Configurations
  const LANES_COUNT = 8
  const LANE_WIDTH = 45 // Har lane ki width
  const ROAD_WIDTH = LANES_COUNT * LANE_WIDTH
  const ROAD_HEIGHT = 600
  const ENEMY_COUNT = 3 // Ek baar mein 3 cars aayengi

  const [carLane, setCarLane] = useState(3) // Player start lane (0 to 7)
  const [enemies, setEnemies] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [speed, setSpeed] = useState(5)

  const requestRef = useRef()

  // 🚀 Shuffle Enemies function
  const spawnEnemies = () => {
    const shuffledLanes = [...Array(LANES_COUNT).keys()].sort(() => 0.5 - Math.random())
    const selectedLanes = shuffledLanes.slice(0, ENEMY_COUNT)
    return selectedLanes.map(lane => ({
      lane,
      y: -100 - Math.random() * 200, // Thoda offset taaki ek saath na dikhe
    }))
  }

  // 🏁 Game Loop
  const update = () => {
    if (gameOver || !gameStarted) return

    setEnemies((prevEnemies) => {
      let nextEnemies = prevEnemies.map(e => ({ ...e, y: e.y + speed }))

      // Check if all enemies passed
      const allPassed = nextEnemies.every(e => e.y > ROAD_HEIGHT)
      if (allPassed || nextEnemies.length === 0) {
        setScore(s => s + 1)
        setSpeed(prev => Math.min(prev + 0.1, 15)) // Har level pe speed badhegi
        return spawnEnemies()
      }

      // 💀 Collision Detection
      nextEnemies.forEach(e => {
        if (e.lane === carLane && e.y > ROAD_HEIGHT - 120 && e.y < ROAD_HEIGHT - 40) {
          setGameOver(true)
        }
      })

      return nextEnemies
    })

    requestRef.current = requestAnimationFrame(update)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(requestRef.current)
  }, [gameStarted, gameOver, carLane, speed])

  // ⌨️ Controls
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return
      if (!gameStarted) setGameStarted(true)

      if (e.key === "ArrowLeft") {
        setCarLane((l) => Math.max(l - 1, 0))
      }
      if (e.key === "ArrowRight") {
        setCarLane((l) => Math.min(l + 1, LANES_COUNT - 1))
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [gameOver, gameStarted])

  const resetGame = () => {
    setCarLane(3)
    setEnemies(spawnEnemies())
    setGameOver(false)
    setScore(0)
    setSpeed(5)
    setGameStarted(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4">
      
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-yellow-400">8-LANE DASH</h2>
        <p className="text-[10px] font-bold text-gray-500 tracking-[0.3em]">SCORE: {score}</p>
      </div>

      {/* 🛣️ The Highway */}
      <div 
        className="relative bg-[#151515] border-x-4 border-yellow-500/30 overflow-hidden shadow-2xl"
        style={{ width: ROAD_WIDTH, height: ROAD_HEIGHT }}
      >
        {/* 🧱 Lane Dividers (The "Rods") */}
        {[...Array(LANES_COUNT - 1)].map((_, i) => (
          <div 
            key={i} 
            className="absolute h-full w-[1px] bg-white/10"
            style={{ left: (i + 1) * LANE_WIDTH }}
          />
        ))}

        {/* 🚗 Player Car */}
        <div
          className="absolute transition-all duration-150 text-3xl flex justify-center items-center"
          style={{ 
            bottom: 60, 
            left: carLane * LANE_WIDTH, 
            width: LANE_WIDTH,
            height: 60
          }}
        >
          🏎️
        </div>

        {/* 🚔 Enemy Cars (3 at a time) */}
        {enemies.map((e, i) => (
          <div
            key={i}
            className="absolute text-3xl flex justify-center items-center"
            style={{ 
              top: e.y, 
              left: e.lane * LANE_WIDTH, 
              width: LANE_WIDTH,
              height: 60
            }}
          >
            🚔
          </div>
        ))}

        {/* Overlays */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center text-center p-4">
            <p className="text-xs font-black uppercase tracking-widest text-white leading-loose">
              Use ← → Keys to Switch Lanes<br/>
              Avoid 3 Enemy Cars!
            </p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center animate-in fade-in">
            <h3 className="text-4xl font-black text-red-600 italic uppercase">CRASHED</h3>
            <p className="text-white font-bold mt-2">Final Score: {score}</p>
            <button 
              onClick={resetGame}
              className="mt-8 bg-yellow-500 text-black px-10 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all"
            >
              Restart Race
            </button>
          </div>
        )}
      </div>

      <button 
        onClick={() => navigate("/")}
        className="mt-8 text-gray-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
      >
        ← Exit Highway
      </button>
    </div>
  )
}

export default CarGame