import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

// Word categories
const wordLists: Record<string, string[]> = {
  Animals: ["ELEPHANT","TIGER","LION","GIRAFFE","KANGAROO","ZEBRA","MONKEY","PANDA","LEOPARD","CHEETAH","RHINOCEROS","HIPPOPOTAMUS","BEAR","WOLF","FOX","DEER","SQUIRREL","CAMEL","ALLIGATOR","COBRA","DOLPHIN","SHARK","WHALE","HORSE","DOG"],
  Cars: ["TESLA","FERRARI","MERCEDES","BMW","TOYOTA","AUDI","HONDA","FORD","LAMBORGHINI","PORSCHE","JEEP","NISSAN","VOLKSWAGEN","HYUNDAI","KIA","MAZDA","CHEVROLET","SUBARU","MITSUBISHI","RENAULT","VOLVO","LAND ROVER","JAGUAR","BUGATTI","ALFA ROMEO"],
  Brands: ["NIKE","ADIDAS","APPLE","SAMSUNG","COCA-COLA","PEPSI","MICROSOFT","GOOGLE","AMAZON","FACEBOOK","LEVIS","PUMA","SONY","DELL","HP","LACOSTE","H&M","GUCCI","CHANEL","PRADA","TOYOTA","HONDA","TESLA","FORD","NINTENDO"],
  Birds: ["PARROT","PEACOCK","EAGLE","SPARROW","FLAMINGO","PIGEON","OWL","DUCK","SWAN","KINGFISHER","WOODPECKER","ROBIN","HAWK","CRANE","MACAW","HUMMINGBIRD","SEAGULL","TURKEY","QUAIL","CROW","RAVEN"]
};

function HangmanGame() {
  const maxAttempts = 6;

  const [category, setCategory] = useState<string>("Animals"); // default category
  const [answer, setAnswer] = useState<string>("");
  const [hint, setHint] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  // Start or restart game whenever category changes
  useEffect(() => {
    const words = wordLists[category];
    const newWord = words[Math.floor(Math.random() * words.length)];
    setAnswer(newWord);
    setHint(Array.from(newWord).map(ch => (ch === " " ? " " : "_")));
    setWrongGuesses(0);
    setGuessedLetters([]);
    setInput("");
    setGameOver(false);
    setMessage("");
  }, [category]);

  const handleGuess = () => {
    if (!input.trim()) return;
    const guess = input.toUpperCase();
    setInput("");

    if (guess.length !== 1 || !/[A-Z]/.test(guess)) {
      setMessage("⚠️ Enter a single letter A-Z");
      return;
    }

    if (guessedLetters.includes(guess)) {
      setMessage(`ℹ️ You already guessed '${guess}'`);
      return;
    }

    setGuessedLetters(prev => [...prev, guess]);

    if (answer.includes(guess)) {
      const newHint = [...hint];
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess) newHint[i] = guess;
      }
      setHint(newHint);

      if (!newHint.includes("_")) {
        setMessage(`🎉 You WIN! The word was ${answer}`);
        setGameOver(true);
      } else {
        setMessage(`✅ Correct: '${guess}'`);
      }
    } else {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      if (newWrong >= maxAttempts) {
        setMessage(`💀 Game Over! The word was ${answer}`);
        setGameOver(true);
      } else {
        setMessage(`❌ Wrong: '${guess}'`);
      }
    }
  };

  const resetGame = () => {
    const words = wordLists[category];
    const newWord = words[Math.floor(Math.random() * words.length)];
    setAnswer(newWord);
    setHint(Array.from(newWord).map(ch => (ch === " " ? " " : "_")));
    setWrongGuesses(0);
    setGuessedLetters([]);
    setInput("");
    setGameOver(false);
    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Hangman Game</h2>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-2 py-1 border rounded-lg"
        >
          {Object.keys(wordLists).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Hint display */}
      <p className="font-mono text-3xl tracking-widest mb-4">{hint.join(" ")}</p>
      <p className="mb-4 text-gray-600">Wrong guesses: {wrongGuesses}/{maxAttempts}</p>

      {!gameOver && (
        <div className="flex gap-2 justify-center mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value.toUpperCase())}
            maxLength={1}
            className="w-16 text-center text-2xl border-2 rounded-lg focus:outline-none"
          />
          <button
            onClick={handleGuess}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Guess
          </button>
        </div>
      )}

      {message && <div className="mb-4 p-2 rounded bg-gray-100 text-gray-800">{message}</div>}

      <button
        onClick={resetGame}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        <RotateCcw size={16} /> Reset
      </button>
    </div>
  );
}

export default HangmanGame;

