import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import TicTacToe from "./games/TicTacToe"
import SnakeGame from "./games/SnakeGame"
import RockPaper from "./games/RockPaper"
import MemoryGame from "./games/MemoryGame"
import FlappyBird from "./games/FlappyBird"
import Breakout from "./games/Breakout"
import GuessNumber from "./games/GuessNumber"
import CarGame from "./games/CarGame"
import SpaceShooter from "./games/SpaceShooter"
import Puzzle2048 from "./games/Puzzle2048"
import WhackAMole from "./games/WhackAMole"
import Tetris from "./games/Tetris"
import SaanpSidi from "./games/SaanpSidi"
import TypeMaster from "./games/TypeMaster"
import NeonRunner from "./games/NeonRunner"

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* 1. Header sabhi pages par dikhega */}
      <Header />

      {/* 2. Main Content Area */}
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/snake" element={<SnakeGame />} />
          <Route path="/rock" element={<RockPaper />} />
          <Route path="/memory" element={<MemoryGame />} />
          <Route path="/flappy" element={<FlappyBird />} />
          <Route path="/breakout" element={<Breakout />} />
          <Route path="/guess" element={<GuessNumber />} />
          <Route path="/car" element={<CarGame />} />
          <Route path="/space" element={<SpaceShooter />} />
          <Route path="/puzzle-2048" element={<Puzzle2048 />} />
          <Route path="/strike" element={<WhackAMole />} />
          <Route path="/tetris" element={<Tetris />} />
          <Route path="/saanp-sidi" element={<SaanpSidi />} />
          <Route path="/speed-typer" element={<TypeMaster />} />
          <Route path="/dino-run" element={<NeonRunner />} />
          <Route />
        </Routes>
      </main>

      {/* 3. Footer sabhi pages par dikhega */}
      <Footer />
    </div>
  )
}

export default App