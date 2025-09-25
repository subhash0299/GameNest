import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const DELAYS = {
  BETWEEN_SEQUENCE: 500,
  BUTTON_LIGHT_UP: 300,
  NEXT_SEQUENCE: 1000
};

const COLORS = [
  { id: 'green', bg: 'bg-green-500', active: 'bg-green-300', sound: 261.63 }, // C4
  { id: 'red', bg: 'bg-red-600', active: 'bg-red-200', sound: 329.63 },      // E4
  { id: 'yellow', bg: 'bg-yellow-500', active: 'bg-yellow-300', sound: 392.00 }, // G4
  { id: 'blue', bg: 'bg-blue-500', active: 'bg-blue-300', sound: 523.25 }    // C5
];

function SimonSays() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContext.current = new AudioContext();
    return () => {
      audioContext.current?.close();
    };
  }, []);

  const playSound = (frequency: number) => {
    if (isMuted || !audioContext.current) return;
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.current.currentTime + 0.5);
    oscillator.stop(audioContext.current.currentTime + 0.5);
  };

  const startGame = () => {
    if (isProcessing) return;
    const initialSequence = [Math.floor(Math.random() * 4)];
    setSequence(initialSequence);
    setPlayerSequence([]);
    setScore(0);
    setIsPlaying(true);
    playSequence(initialSequence);
  };

  const playSequence = async (sequence: number[]) => {
    setIsPlaying(true);
    setIsProcessing(true);
    
    try {
      for (let i = 0; i < sequence.length; i++) {
        await new Promise(resolve => setTimeout(resolve, DELAYS.BETWEEN_SEQUENCE));
        setActiveColor(sequence[i]);
        playSound(COLORS[sequence[i]].sound);
        await new Promise(resolve => setTimeout(resolve, DELAYS.BUTTON_LIGHT_UP));
        setActiveColor(null);
      }
    } finally {
      setIsPlaying(false);
      setIsProcessing(false);
    }
  };

  const handleColorClick = async (colorIndex: number) => {
    if (isPlaying || isProcessing) return;

    const newPlayerSequence = [...playerSequence, colorIndex];
    setPlayerSequence(newPlayerSequence);
    setActiveColor(colorIndex);
    playSound(COLORS[colorIndex].sound);
    
    // Validate the current move
    const currentIndex = newPlayerSequence.length - 1;
    if (sequence[currentIndex] !== colorIndex) {
      setHighScore(Math.max(highScore, score));
      setIsProcessing(true);
      
      // Delay to show the wrong button press
      await new Promise(resolve => setTimeout(resolve, DELAYS.BUTTON_LIGHT_UP));
      setActiveColor(null);
      
      setTimeout(() => {
        alert(`Game Over! Score: ${score}`);
        setIsPlaying(false);
        setSequence([]);
        setPlayerSequence([]);
        setIsProcessing(false);
      }, 500);
      return;
    }

    // Clear button highlight
    setTimeout(() => setActiveColor(null), DELAYS.BUTTON_LIGHT_UP);

    // Check if sequence is complete
    if (newPlayerSequence.length === sequence.length) {
      setScore(prev => prev + 1);
      const newSequence = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(newSequence);
      setPlayerSequence([]);
      
      // Add delay before playing next sequence
      setTimeout(() => {
        if (!isProcessing) {
          playSequence(newSequence);
        }
      }, DELAYS.NEXT_SEQUENCE);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Simon Says</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg">Score: {score}</div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          <div className="text-lg">High Score: {highScore}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {COLORS.map((color, index) => (
          <button
            key={color.id}
            disabled={isPlaying || isProcessing}
            onClick={() => handleColorClick(index)}
            className={`
              w-32 h-32 rounded-2xl ${color.bg}
              transform transition-all duration-200
              ${activeColor === index ? color.active : ''}
              ${(isPlaying || isProcessing) ? 'cursor-not-allowed opacity-80' : 'hover:scale-105'}
            `}
          />
        ))}
      </div>

      <button
        onClick={startGame}
        disabled={isPlaying}
        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {sequence.length ? 'Restart Game' : 'Start Game'}
      </button>
    </div>
  );
}

export default SimonSays;
