import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

function NumberGuessingGame() {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 20) + 1);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'high' | 'low' | null; message: string }>({ type: null, message: '' });
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);

  const handleSubmit = () => {
    if (!guess.trim()) return;

    const userGuess = parseInt(guess);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 20) {
      setFeedback({
        type: null,
        message: 'Please enter a number between 1 and 20'
      });
      return;
    }

    setAttempts(prev => prev + 1);

    if (userGuess === targetNumber) {
      setGameWon(true);
      setGamesWon(prev => prev + 1);
      setFeedback({
        type: 'success',
        message: `🎉 Correct! You found it in ${attempts + 1} attempts!`
      });
    } else if (userGuess > targetNumber) {
      setFeedback({
        type: 'high',
        message: 'Too high! Try a lower number.'
      });
    } else {
      setFeedback({
        type: 'low',
        message: 'Too low! Try a higher number.'
      });
    }

    setGuess('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const newGame = () => {
    setTargetNumber(Math.floor(Math.random() * 20) + 1);
    setGuess('');
    setAttempts(0);
    setGameWon(false);
    setFeedback({ type: null, message: '' });
    setGamesPlayed(prev => prev + 1);
  };

  const resetStats = () => {
    setGamesPlayed(0);
    setGamesWon(0);
    newGame();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Guess the Number</h2>
          <p className="text-gray-600">I'm thinking of a number between 1 and 20</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-500">
            <div>Attempts: <span className="font-bold text-blue-600">{attempts}</span></div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={newGame}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
            >
              New Game
            </button>
            <button
              onClick={resetStats}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="number"
            min="1"
            max="20"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="Enter your guess"
            disabled={gameWon}
          />

          <button
            onClick={handleSubmit}
            disabled={!guess.trim() || gameWon}
            className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {gameWon ? 'Game Won!' : 'Make Guess'}
          </button>
        </div>

        {feedback.message && (
          <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
            feedback.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : feedback.type === 'high'
              ? 'bg-orange-50 text-orange-700 border border-orange-200'
              : feedback.type === 'low'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {feedback.type === 'success' && <CheckCircle size={20} />}
            {feedback.type === 'high' && <TrendingDown size={20} />}
            {feedback.type === 'low' && <TrendingUp size={20} />}
            {feedback.type === null && <XCircle size={20} />}
            {feedback.message}
          </div>
        )}

        {gameWon && (
          <div className="mt-6 text-center">
            <button
              onClick={newGame}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NumberGuessingGame;