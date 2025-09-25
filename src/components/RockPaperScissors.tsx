import React, { useState } from 'react';
import { Swords } from 'lucide-react';

type Move = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw';

const moves: Move[] = ['rock', 'paper', 'scissors'];
const emojis: Record<Move, string> = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
};

function RockPaperScissors() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [computerMove, setComputerMove] = useState<Move | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [history, setHistory] = useState<{ player: Move; computer: Move; result: Result }[]>([]);

  const getComputerMove = (): Move => {
    return moves[Math.floor(Math.random() * moves.length)];
  };

  const determineWinner = (player: Move, computer: Move): Result => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const playRound = (playerChoice: Move) => {
    const computerChoice = getComputerMove();
    setPlayerMove(playerChoice);
    setComputerMove(computerChoice);

    const roundResult = determineWinner(playerChoice, computerChoice);
    setResult(roundResult);

    // Update scores
    if (roundResult === 'win') setPlayerScore(prev => prev + 1);
    if (roundResult === 'lose') setComputerScore(prev => prev + 1);

    // Add to history
    setHistory(prev => [...prev, {
      player: playerChoice,
      computer: computerChoice,
      result: roundResult
    }]);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerMove(null);
    setComputerMove(null);
    setResult(null);
    setHistory([]);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Rock Paper Scissors</h2>
        <div className="flex justify-center gap-8 text-xl">
          <div>You: {playerScore}</div>
          <div>Computer: {computerScore}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {moves.map((move) => (
          <button
            key={move}
            onClick={() => playRound(move)}
            className="p-4 text-3xl bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {emojis[move]}
          </button>
        ))}
      </div>

      {result && (
        <div className="text-center mb-8">
          <div className="flex justify-center gap-8 mb-4 text-4xl">
            <div>{playerMove && emojis[playerMove]}</div>
            <div>vs</div>
            <div>{computerMove && emojis[computerMove]}</div>
          </div>
          <div className={`text-xl font-bold ${
            result === 'win' ? 'text-green-600' :
            result === 'lose' ? 'text-red-600' :
            'text-gray-600'
          }`}>
            You {result}!
          </div>
        </div>
      )}

      <button
        onClick={resetGame}
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
      >
        Reset Game
      </button>

      {history.length > 0 && (
        <div className="mt-8">
          <h3 className="font-bold mb-2">Game History:</h3>
          <div className="max-h-40 overflow-y-auto">
            {history.map((round, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b"
              >
                <span>{emojis[round.player]} vs {emojis[round.computer]}</span>
                <span className={
                  round.result === 'win' ? 'text-green-600' :
                  round.result === 'lose' ? 'text-red-600' :
                  'text-gray-600'
                }>
                  {round.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RockPaperScissors;
