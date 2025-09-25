import React, { useState, useRef, useEffect } from 'react';
import { Timer, RotateCcw } from 'lucide-react';

type GameState = 'waiting' | 'ready' | 'started' | 'finished';

function ReactionTime() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const startTime = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const startGame = () => {
    setGameState('ready');
    setReactionTime(null);
    
    // Random delay between 1-5 seconds
    const delay = Math.random() * 4000 + 1000;
    timeoutRef.current = setTimeout(() => {
      setGameState('started');
      startTime.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    switch (gameState) {
      case 'waiting':
        startGame();
        break;
      
      case 'ready':
        // Clicked too early
        clearTimeout(timeoutRef.current);
        setGameState('finished');
        setReactionTime(-1);
        break;
      
      case 'started':
        // Valid click - calculate reaction time
        const time = Date.now() - startTime.current;
        setReactionTime(time);
        setBestTime(prev => prev === null ? time : Math.min(prev, time));
        setGameState('finished');
        break;
      
      case 'finished':
        startGame();
        break;
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Reaction Time Test</h2>
        <p className="text-gray-600 mt-2">
          Click when the screen turns green!
        </p>
      </div>

      <button
        onClick={handleClick}
        className={`
          w-full h-64 rounded-xl mb-8 transition-all duration-200
          flex flex-col items-center justify-center gap-4 text-white
          ${gameState === 'waiting' ? 'bg-blue-500 hover:bg-blue-600' : ''}
          ${gameState === 'ready' ? 'bg-red-500' : ''}
          ${gameState === 'started' ? 'bg-green-500' : ''}
          ${gameState === 'finished' ? 'bg-gray-200' : ''}
        `}
      >
        {gameState === 'waiting' && (
          <>
            <Timer size={48} />
            <span className="text-xl font-semibold">Click to start</span>
          </>
        )}
        {gameState === 'ready' && (
          <span className="text-xl font-semibold">Wait for green...</span>
        )}
        {gameState === 'started' && (
          <span className="text-xl font-semibold">Click!</span>
        )}
        {gameState === 'finished' && (
          <div className="text-gray-800">
            {reactionTime === -1 ? (
              <span className="text-xl font-semibold text-red-500">Too early! Click to retry</span>
            ) : (
              <>
                <span className="text-3xl font-bold">{reactionTime}ms</span>
                <p className="text-gray-500 mt-2">Click to try again</p>
              </>
            )}
          </div>
        )}
      </button>

      {bestTime && (
        <div className="text-center text-gray-600">
          Best time: <span className="font-semibold text-green-600">{bestTime}ms</span>
        </div>
      )}
    </div>
  );
}

export default ReactionTime;
