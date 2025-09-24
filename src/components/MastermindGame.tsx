import React, { useState, useEffect } from "react";
import { RotateCcw, Info } from "lucide-react";
import clsx from "clsx";

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];
const CODE_LENGTH = 4;

function MastermindGame() {
  const [secretCode, setSecretCode] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [pastGuesses, setPastGuesses] = useState<Array<{ guess: string[]; feedback: string[] }>>([]);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false); // New state for instructions

  useEffect(() => {
    generateNewCode();
  }, []);

  const generateNewCode = () => {
    const newCode = Array(CODE_LENGTH)
      .fill("")
      .map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);
    setSecretCode(newCode);
  };

  const handleColorSelect = (index: number, color: string) => {
    const newGuess = [...currentGuess];
    // If the color is already selected at this position, clear it
    if (newGuess[index] === color) {
      newGuess[index] = "";
    } else {
      newGuess[index] = color;
    }
    setCurrentGuess(newGuess);
  };

  const checkGuess = () => {
    if (currentGuess.includes("")) return; // Don't allow incomplete guesses

    // First pass: Check for exact matches (black pegs)
    const feedback = Array(CODE_LENGTH).fill("empty");
    const secretCodeCopy = [...secretCode];
    const currentGuessCopy = [...currentGuess];

    // Check for correct position and color first (black pegs)
    for (let i = 0; i < CODE_LENGTH; i++) {
      if (currentGuessCopy[i] === secretCodeCopy[i]) {
        feedback[i] = "black";
        secretCodeCopy[i] = "";
        currentGuessCopy[i] = "";
      }
    }

    // Second pass: Check for correct color but wrong position (grey pegs)
    for (let i = 0; i < CODE_LENGTH; i++) {
      if (currentGuessCopy[i] && secretCodeCopy.includes(currentGuessCopy[i])) {
        feedback[i] = "#666666"; // grey color
        const indexInSecret = secretCodeCopy.indexOf(currentGuessCopy[i]);
        secretCodeCopy[indexInSecret] = "";
        currentGuessCopy[i] = "";
      }
    }

    const isWin = feedback.every(f => f === "black");
    
    const newPastGuesses = [...pastGuesses, { guess: [...currentGuess], feedback }];
    setPastGuesses(newPastGuesses);
    setCurrentGuess(Array(CODE_LENGTH).fill(""));

    if (isWin) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    generateNewCode();
    setCurrentGuess(Array(CODE_LENGTH).fill(""));
    setPastGuesses([]);
    setGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center relative">
      <h2 className="text-2xl font-bold mb-4">Mastermind 🎨</h2>

      {/* How to Play Button */}
      <button
        onClick={() => setShowInstructions(true)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        title="How to Play"
      >
        <Info size={20} />
      </button>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md text-left shadow-lg max-h-[90vh] flex flex-col">
            <h3 className="text-xl font-bold mb-4 sticky top-0 bg-white">How to Play Mastermind</h3>
            
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              <section>
                <h4 className="font-bold text-lg text-blue-600 mb-2">Game Objective</h4>
                <p className="text-gray-700 mb-2">
                  Crack the secret color code in as few attempts as possible. The code consists of {CODE_LENGTH} colors, and colors can be repeated.
                </p>
              </section>

              <section>
                <h4 className="font-bold text-lg text-blue-600 mb-2">Making Your Guess</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Click a color from the palette to place it in the first empty position</li>
                  <li><strong>To deselect:</strong> Simply click on the placed color again to remove it</li>
                  <li>Fill all {CODE_LENGTH} positions to make a complete guess</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-lg text-blue-600 mb-2">Understanding Feedback</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Black peg (⚫):</strong> Correct color in the correct position</li>
                  <li><strong>Grey peg (⚫):</strong> Correct color but in the wrong position</li>
                  <li><strong>Empty peg (⚪):</strong> Color not in the code</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-lg text-blue-600 mb-2">Game Controls</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Click "Check Guess" to submit your guess and see feedback</li>
                  <li>Use the "Reset" button to start a new game at any time</li>
                  <li>Previous guesses and their feedback remain visible for reference</li>
                </ul>
              </section>

              <section>
                <h4 className="font-bold text-lg text-blue-600 mb-2">Winning the Game</h4>
                <p className="text-gray-700">
                  You win when you get {CODE_LENGTH} black pegs, meaning all colors are in their correct positions!
                </p>
              </section>
            </div>

            <button
              onClick={() => setShowInstructions(false)}
              className="mt-6 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors sticky bottom-0"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Color selection */}
      <div className="grid grid-cols-6 gap-2 mb-6">
        {COLORS.map((color) => (
          <div
            key={color}
            className="w-8 h-8 rounded-full cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => {
              const emptyIndex = currentGuess.findIndex((c) => c === "");
              if (emptyIndex !== -1) handleColorSelect(emptyIndex, color);
            }}
          />
        ))}
      </div>

      {/* Current guess */}
      <div className="flex justify-center gap-2 mb-4">
        {currentGuess.map((color, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full border-2 cursor-pointer"
            style={{ backgroundColor: color || "white" }}
            onClick={() => handleColorSelect(index, color)} // Add click handler
          />
        ))}
      </div>

      <button
        onClick={checkGuess}
        disabled={currentGuess.includes("") || gameOver}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 mb-4"
      >
        Check Guess
      </button>

      {/* Past guesses */}
      <div className="mt-6">
        {pastGuesses.map((pg, i) => (
          <div key={i} className="flex items-center gap-4 mb-2">
            <div className="flex gap-2">
              {pg.guess.map((color, j) => (
                <div
                  key={j}
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex gap-1">
              {pg.feedback.map((fb, j) => (
                <div
                  key={j}
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: fb }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="mt-4 text-center text-green-600 font-bold">
          Congratulations! You've cracked the code!
        </div>
      )}

      <button
        onClick={resetGame}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg mt-4"
      >
        <RotateCcw size={16} /> Reset
      </button>
    </div>
  );
}

export default MastermindGame;
