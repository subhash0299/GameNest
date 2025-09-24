import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

const WORDS = {
  Animals: ["ELEPHANT","TIGER","LION","GIRAFFE","KANGAROO","ZEBRA","MONKEY","PANDA","LEOPARD","CHEETAH","RHINOCEROS","HIPPOPOTAMUS","BEAR","WOLF","FOX","DEER","SQUIRREL","CAMEL","ALLIGATOR","COBRA","DOLPHIN","SHARK","WHALE","HORSE","DOG"],
  Birds: ["PARROT","PEACOCK","EAGLE","SPARROW","FLAMINGO","PIGEON","OWL","DUCK","SWAN","KINGFISHER","WOODPECKER","ROBIN","CANARY","HAWK","CRANE","PARAKEET","MACAW","HUMMINGBIRD","SEAGULL","PELICAN","TURKEY","QUAIL","PARTRIDGE","CROW","RAVEN"],
  Cars: ["TESLA","FERRARI","MERCEDES","BMW","TOYOTA","AUDI","HONDA","FORD","LAMBORGHINI","PORSCHE","JEEP","NISSAN","VOLKSWAGEN","HYUNDAI","KIA","MAZDA","CHEVROLET","SUBARU","MITSUBISHI","RENAULT","VOLVO","LAND ROVER","JAGUAR","BUGATTI","ALFA ROMEO"],
  "Brands": ["NIKE","ADIDAS","APPLE","SAMSUNG","COCA-COLA","PEPSI","MICROSOFT","GOOGLE","AMAZON","FACEBOOK","LEVIS","PUMA","SONY","DELL","HP","LACOSTE","H&M","GUCCI","CHANEL","PRADA","TOYOTA","HONDA","TESLA","FORD","NINTENDO"]
};

function shuffleWord(word: string) {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
}

function WordScrambleGame() {
  const [category, setCategory] = useState<keyof typeof WORDS>("Animals");
  const [word, setWord] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");

  const generateWord = () => {
    const randomWord = WORDS[category][Math.floor(Math.random() * WORDS[category].length)];
    setWord(randomWord);
    setScrambled(shuffleWord(randomWord));
    setGuess("");
    setFeedback("");
  };

  useEffect(() => {
    generateWord();
  }, [category]);

  const handleSubmit = () => {
    setAttempts(prev => prev + 1);
    if (guess.toUpperCase() === word) {
      setScore(prev => prev + 1);
      setFeedback("✅ Correct!");
      setTimeout(generateWord, 1500);
    } else {
      setFeedback("❌ Wrong! Try again.");
    }
    setGuess("");
  };

  const handleReset = () => {
    setScore(0);
    setAttempts(0);
    generateWord();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl text-center">
      <h2 className="text-2xl font-bold mb-4">Word Scramble</h2>

      {/* Category Selector */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as keyof typeof WORDS)}
        className="mb-4 p-2 border rounded-lg"
      >
        {Object.keys(WORDS).map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Scrambled Word */}
      <div className="text-3xl font-mono font-bold mb-4 tracking-widest">{scrambled}</div>

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        className="w-full px-4 py-2 border rounded-lg text-center mb-2 uppercase"
        placeholder="Type your guess"
      />

      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-2"
      >
        Submit
      </button>

      {feedback && <div className="mb-2 text-lg font-semibold">{feedback}</div>}

      <div className="flex justify-between text-gray-600 text-sm mb-4">
        <div>Score: {score}</div>
        <div>Attempts: {attempts}</div>
      </div>

      <button
        onClick={handleReset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg mx-auto"
      >
        <RotateCcw size={16} /> Reset
      </button>
    </div>
  );
}

export default WordScrambleGame;
