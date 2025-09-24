import React from 'react';
import { Brain, Target, Calculator, Shuffle } from 'lucide-react';

type GameType = 'spelling' | 'number' | 'math' | 'scramble';

interface GameMenuProps {
  onSelectGame: (game: GameType) => void;
}

const games = [
  {
    id: 'spelling' as GameType,
    title: 'Complete the Spelling',
    description: 'Fill in the missing letters to complete words',
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700'
  },
  {
    id: 'number' as GameType,
    title: 'Guess the Number',
    description: 'Can you guess the number between 1-20?',
    icon: Target,
    color: 'from-green-500 to-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-700'
  },
  {
    id: 'math' as GameType,
    title: 'Math Quiz',
    description: 'Solve simple addition and subtraction problems',
    icon: Calculator,
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700'
  },
  {
    id: 'scramble' as GameType,
    title: 'Word Scramble',
    description: 'Unscramble the letters to form the correct word',
    icon: Shuffle,
    color: 'from-orange-500 to-orange-600',
    hoverColor: 'hover:from-orange-600 hover:to-orange-700'
  },
  {
    id: 'mastermind' as GameType,
    title: 'Mastermind',
    description: 'Guess the color code in the correct order',
    icon: Brain,
    color: 'from-red-500 to-red-600',
    hoverColor: 'hover:from-red-600 hover:to-red-700'
  }
];

function GameMenu({ onSelectGame }: GameMenuProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎮 Game Center
        </h1>
        <p className="text-lg text-gray-600">
          Choose your favorite game and start playing!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => {
          const IconComponent = game.icon;
          return (
            <button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className={`group relative overflow-hidden bg-gradient-to-r ${game.color} ${game.hoverColor} text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-left`}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">{game.title}</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {game.description}
                </p>
              </div>
              
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GameMenu;