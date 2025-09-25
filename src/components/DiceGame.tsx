import React, { useState, useEffect } from 'react';
import { RotateCcw, Dice5, Crown } from 'lucide-react';

function DiceGame() {
  const maxScore = 50;

  const [players, setPlayers] = useState<string[]>([]);
  const [playerScores, setPlayerScores] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentTurnScore, setCurrentTurnScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [displayNumber, setDisplayNumber] = useState<number | null>(null);

  // Start game with names
  const startGame = (names: string[]) => {
    setPlayers(names);
    setPlayerScores(new Array(names.length).fill(0));
    setCurrentPlayer(0);
    setCurrentTurnScore(0);
    setDiceValue(null);
    setWinner(null);
    setGameStarted(true);
  };

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;
    
    // Start the rolling animation
    const rollInterval = setInterval(() => {
      setDisplayNumber(Math.floor(Math.random() * 6) + 1);
    }, 100);

    // Stop the animation and show final result after 1 second
    setTimeout(() => {
      clearInterval(rollInterval);
      setDisplayNumber(roll);
      setDiceValue(roll);
      setIsRolling(false);

      if (roll === 1) {
        setCurrentTurnScore(0);
        nextPlayer();
      } else {
        setCurrentTurnScore(prev => prev + roll);
      }
    }, 1000);
  };

  const holdTurn = () => {
    const newScores = [...playerScores];
    newScores[currentPlayer] += currentTurnScore;

    if (newScores[currentPlayer] >= maxScore) {
      setWinner(players[currentPlayer]);
      setGameStarted(false);
    } else {
      setPlayerScores(newScores);
      setCurrentTurnScore(0);
      nextPlayer();
    }
  };

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
    setCurrentTurnScore(0);
  };

  // Update the resetGame function
  const resetGame = () => {
    if (gameStarted && !winner) {
      const confirmed = window.confirm('Are you sure you want to reset the game?');
      if (!confirmed) return;
    }
    
    setPlayers([]);
    setPlayerScores([]);
    setCurrentPlayer(0);
    setCurrentTurnScore(0);
    setDiceValue(null);
    setWinner(null);
    setGameStarted(false);
  };

  // Add useEffect for keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || winner) return;
      
      switch (e.key.toLowerCase()) {
        case 'r':
          rollDice();
          break;
        case 'h':
          holdTurn();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, winner]);

  // Pre-game setup: ask for 2–4 player names
  if (!gameStarted && !winner && players.length === 0) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">🎲 Dice Game Setup</h2>
        <p className="text-gray-600 mb-4">Enter names for 2–4 players</p>

        <PlayerSetup onStart={startGame} />
      </div>
    );
  }

  // Winner screen
  if (winner) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 We have a winner!</h2>
        <p className="text-xl mb-6 flex items-center justify-center gap-2">
          <Crown className="text-yellow-500" /> {winner} wins with {Math.max(...playerScores)} points!
        </p>
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          Play Again
        </button>
      </div>
    );
  }

  // Main game screen
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6">🎲 Dice Game to {maxScore}</h2>
      
      <GameRules />
      
      {/* Players & Scores */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {players.map((player, idx) => (
          <div
            key={player}
            className={`p-4 rounded-lg border-2 ${
              idx === currentPlayer ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="font-bold">{player}</div>
            <div className="text-lg">Score: {playerScores[idx]}</div>
            {idx === currentPlayer && <div className="text-sm text-blue-600">Current turn</div>}
          </div>
        ))}
      </div>

      {/* Dice result */}
      {(displayNumber || diceValue) && (
        <div className="text-center mb-6">
          <p className="text-xl">
            You rolled: <span className={`font-bold ${isRolling ? 'text-gray-400' : ''}`}>
              {isRolling ? displayNumber : diceValue}
            </span>
          </p>
        </div>
      )}

      {/* Turn score */}
      <p className="text-center mb-6 text-lg">
        Turn score: <span className="font-bold">{currentTurnScore}</span>
      </p>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={rollDice}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          title="Press 'R' to roll"
        >
          <Dice5 size={20} /> Roll (R)
        </button>
        <button
          onClick={holdTurn}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
          title="Press 'H' to hold"
        >
          Hold (H)
        </button>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        Use keyboard shortcuts: R = Roll, H = Hold
      </div>
    </div>
  );
}

// Add this component after the imports
function GameRules() {
  return (
    <div className="text-left text-sm text-gray-600 mb-6">
      <h3 className="font-bold mb-2">Game Rules:</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Roll the dice to accumulate points</li>
        <li>If you roll a 1, you lose your turn and current points</li>
        <li>Click "Hold" to save your points and end your turn</li>
        <li>First player to reach 50 points wins!</li>
      </ul>
    </div>
  );
}

// Component for setting up players
function PlayerSetup({ onStart }: { onStart: (names: string[]) => void }) {
  const [names, setNames] = useState<string[]>(['', '']);
  const [error, setError] = useState('');

  const addPlayer = () => {
    if (names.length < 4) setNames([...names, '']);
  };

  const updateName = (index: number, value: string) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  // Update the PlayerSetup component's handleStart function
  const handleStart = () => {
    const validNames = names.filter(n => n.trim() !== '');
    if (validNames.length < 2) {
      setError('Please enter at least 2 player names.');
      return;
    }
    
    // Check for duplicate names
    const uniqueNames = new Set(validNames);
    if (uniqueNames.size !== validNames.length) {
      setError('Each player must have a unique name.');
      return;
    }
    
    // Check name length
    if (validNames.some(name => name.length > 15)) {
      setError('Names must be 15 characters or less.');
      return;
    }

    setError('');
    onStart(validNames);
  };

  return (
    <div className="space-y-4">
      {names.map((name, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Player ${idx + 1} name`}
          value={name}
          onChange={(e) => updateName(idx, e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
        />
      ))}
      {names.length < 4 && (
        <button
          onClick={addPlayer}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          + Add Player
        </button>
      )}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        onClick={handleStart}
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
      >
        Start Game
      </button>
    </div>
  );
}

export default DiceGame;
