import React from 'react';
import { Brain, Target, Calculator, Shuffle, DicesIcon, Swords, Music } from 'lucide-react';

type GameType = 'spelling' | 'number' | 'math' | 'scramble' | 'mastermind' | 'dicegame' | 'rps' | 'sudoku' | 'simon';

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
  },
    {
    id: 'dicegame' as GameType,
    title: 'Dice Game',
    description: 'Roll dice and compete with friends to reach 50 points',
    icon: DicesIcon,
    color: 'from-pink-500 to-pink-600',
    hoverColor: 'hover:from-pink-600 hover:to-pink-700'
  },
  {
    id: 'rps' as GameType,
    title: 'Rock Paper Scissors',
    description: 'Challenge the computer in this classic game',
    icon: Swords,
    color: 'from-cyan-500 to-cyan-600',
    hoverColor: 'hover:from-cyan-600 hover:to-cyan-700'
  },
  {
    id: 'simon' as GameType,
    title: 'Simon Says',
    description: 'Test your memory by repeating the color sequence',
    icon: Music,
    color: 'from-violet-500 to-violet-600',
    hoverColor: 'hover:from-violet-600 hover:to-violet-700'
  }
];

function GameMenu({ onSelectGame }: GameMenuProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img 
            src="/logo.png" 
            alt="Game Nest Logo" 
            className="w-20 h-20 object-contain"
          />
          <h1 className="text-4xl font-bold text-gray-800">
            Game Nest
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          Choose your favorite game and start playing!
        </p>
        <p className="text-sm text-gray-500 mt-1">
          No sign-up required. Just have fun!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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

      {/* Creator Footer */}
      <footer className="mt-16 border-t pt-8 pb-4">
        <div className="flex flex-col items-center gap-4">
          <img 
            src="/sk.jpg" 
            alt="Creator" 
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">Subhash Bishnoi</h3>
            <p className="text-gray-600 mt-1">Full Stack Developer</p>
          </div>
          
          <div className="flex gap-4 mt-2">
            <a 
              href="https://github.com/subhash0299" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/subhash-bishnoi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com/subhash6699" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Game Nest. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default GameMenu;