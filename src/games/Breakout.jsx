import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ROWS = 5;
const COLS = 7;
const GAME_WIDTH = 340; // Desktop ke liye thoda wide
const GAME_HEIGHT = 500;
const BALL_SIZE = 14;
const PADDLE_WIDTH = 80;

function Breakout() {
  const navigate = useNavigate();

  const [ball, setBall] = useState({ x: 160, y: 300, dx: 3, dy: -3 });
  const [paddle, setPaddle] = useState(130);
  const [bricks, setBricks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  // 🧱 Bricks Initialize (Cool Gradients)
  useEffect(() => {
    const newBricks = [];
    const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        newBricks.push({
          x: c * 45 + 15,
          y: r * 25 + 50,
          visible: true,
          color: colors[r % colors.length]
        });
      }
    }
    setBricks(newBricks);
  }, []);

  // 🎮 Smooth Game Loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveBall = setInterval(() => {
      setBall((prev) => {
        let { x, y, dx, dy } = prev;
        x += dx;
        y += dy;

        // 🛡️ Wall Bounce
        if (x <= 0 || x >= GAME_WIDTH - BALL_SIZE) dx *= -1;
        if (y <= 0) dy *= -1;

        // 🎮 Paddle Collision Logic
        if (y >= 470 && y <= 485 && x >= paddle - 10 && x <= paddle + PADDLE_WIDTH + 10) {
          dy = -Math.abs(dy);
          // Speed increase slightly
          dx *= 1.01;
          dy *= 1.01;
        }

        // 💀 Game Over
        if (y >= GAME_HEIGHT) {
          setGameOver(true);
        }

        return { x, y, dx, dy };
      });

      // 🧱 Brick Collision
      setBricks((prevBricks) => {
        let collisionFound = false;
        const nextBricks = prevBricks.map((brick) => {
          if (
            brick.visible &&
            ball.x + BALL_SIZE > brick.x &&
            ball.x < brick.x + 40 &&
            ball.y + BALL_SIZE > brick.y &&
            ball.y < brick.y + 20
          ) {
            if (!collisionFound) {
              setBall(b => ({ ...b, dy: -b.dy }));
              setScore(s => s + 10);
              collisionFound = true;
            }
            return { ...brick, visible: false };
          }
          return brick;
        });
        return nextBricks;
      });
    }, 16); // 60fps feel

    return () => clearInterval(moveBall);
  }, [paddle, gameOver, isPaused, ball.x, ball.y]);

  // 🕹️ Controls (Keyboard + Touch/Mouse)
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    let newPos = mouseX - PADDLE_WIDTH / 2;
    if (newPos < 0) newPos = 0;
    if (newPos > GAME_WIDTH - PADDLE_WIDTH) newPos = GAME_WIDTH - PADDLE_WIDTH;
    setPaddle(newPos);
  };

  const resetGame = () => {
    setBall({ x: 160, y: 300, dx: 3, dy: -3 });
    setPaddle(130);
    setScore(0);
    setGameOver(false);
    setIsPaused(true);
    setBricks(prev => prev.map(b => ({ ...b, visible: true })));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center font-sans selection:bg-green-500">

      {/* 🌌 Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="z-10 w-full max-w-md px-6">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
            ← Exit
          </button>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">Current Score</p>
            <h2 className="text-3xl font-black text-green-500 italic leading-none">{score}</h2>
          </div>
        </div>

        {/* 🕹️ Game Arena */}
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setIsPaused(false)}
          className="relative mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl cursor-none overflow-hidden"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
          {/* ⚪ Neon Ball */}
          <div
            className="absolute bg-white rounded-full shadow-[0_0_15px_white] transition-all duration-[16ms] ease-linear"
            style={{ left: ball.x, top: ball.y, width: BALL_SIZE, height: BALL_SIZE }}
          />

          {/* 🧱 Bricks Grid */}
          {bricks.map((brick, i) => brick.visible && (
            <div
              key={i}
              className="absolute transition-transform duration-300"
              style={{
                left: brick.x,
                top: brick.y,
                width: 40,
                height: 20,
                backgroundColor: brick.color,
                borderRadius: "4px",
                boxShadow: `0 4px 15px ${brick.color}44`
              }}
            />
          ))}

          {/* 🎮 Paddle (Neon) */}
          <div
            className="absolute bottom-4 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-[0_0_20px_#22c55e]"
            style={{ width: PADDLE_WIDTH, left: paddle }}
          />

          {/* ⏸️ Start Overlay */}
          {isPaused && !gameOver && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-center p-6">
              <div className="animate-bounce">
                <p className="text-green-500 font-black uppercase tracking-widest mb-2">Ready?</p>
                <p className="text-white/60 text-xs">Click inside the box to Start</p>
              </div>
            </div>
          )}

          {/* 💀 Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-red-500 text-5xl font-black italic uppercase tracking-tighter mb-4">Wasted</h3>
              <p className="text-gray-400 font-medium mb-8">Score: {score}</p>
              <button
                onClick={resetGame}
                className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-green-500 transition-all active:scale-95"
              >
                Respawn
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-gray-600 text-[10px] uppercase font-bold tracking-[0.2em]">
          Move your mouse/finger to control the paddle
        </p>
      </div>
    </div>
  );
}

export default Breakout;