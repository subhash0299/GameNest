import React, { useState } from 'react';
import GameMenu from './components/GameMenu';
import SpellingGame from './components/SpellingGame';
import NumberGuessingGame from './components/NumberGuessingGame';
import MathQuizGame from './components/MathQuizGame';
import WordScrambleGame from './components/WordScrambleGame';
import MastermindGame from './components/MastermindGame';  // Add this import
import DiceGame from './components/DiceGame';
import RockPaperScissors from './components/RockPaperScissors';
import SimonSays from './components/SimonSays';
import ReactionTime from './components/ReactionTime';
import FlagGame from './components/FlagGame';
import { ArrowLeft } from 'lucide-react';

type GameType = 'menu' | 'spelling' | 'number' | 'math' | 'scramble' | 'mastermind' | 'dicegame' | 'rps' | 'simon' | 'reaction' | 'flag';  // Add mastermind

function App() {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');

  const handleBackToMenu = () => {
    setCurrentGame('menu');
  };

  const renderCurrentGame = () => {
    switch (currentGame) {
      case 'spelling':
        return <SpellingGame />;
      case 'number':
        return <NumberGuessingGame />;
      case 'math':
        return <MathQuizGame />;
      case 'scramble':
        return <WordScrambleGame />;
      case 'mastermind':
        return <MastermindGame />;  // Add this case
      case 'dicegame':
        return <DiceGame />;
      case 'rps':
        return <RockPaperScissors />;
      case 'simon':
        return <SimonSays />;
      case 'reaction':
        return <ReactionTime />;
      case 'flag':
        return <FlagGame />;
      
      default:
        return <GameMenu onSelectGame={setCurrentGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {currentGame !== 'menu' && (
          <button
            onClick={handleBackToMenu}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            Back to Menu
          </button>
        )}
        {renderCurrentGame()}
      </div>
    </div>
  );
}

export default App;