import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Plus, Minus, Timer } from 'lucide-react';

interface Problem {
  num1: number;
  num2: number;
  operator: '+' | '-';
  answer: number;
}

const TIME_LIMITS = [
  { label: '30 sec', value: 30 },
  { label: '1 min', value: 60 },
  { label: '1.5 min', value: 90 },
  { label: '2 min', value: 120 },
  { label: '3 min', value: 180 },
  { label: '4 min', value: 240 },
  { label: '5 min', value: 300 },
];

function MathQuizGame() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [score, setScore] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameResults, setGameResults] = useState<{
    score: number;
    total: number;
    time: number;
  } | null>(null);

  const generateProblem = (): Problem => {
    const operator = Math.random() < 0.5 ? '+' : '-';
    let num1, num2, answer;

    if (operator === '+') {
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 50) + 25; // Ensure positive result
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      answer = num1 - num2;
    }

    return { num1, num2, operator, answer };
  };

  useEffect(() => {
    setProblem(generateProblem());
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && timeRemaining !== null && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === 1) {
            setIsGameActive(false);
            setGameResults({
              score,
              total: totalProblems,
              time: timeLimit || 0
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeRemaining]);

  const startGame = (selectedTime: number) => {
    setTimeLimit(selectedTime);
    setTimeRemaining(selectedTime);
    setIsGameActive(true);
    setScore(0);
    setTotalProblems(0);
    setStreak(0);
    setProblem(generateProblem());
    setUserAnswer('');
    setFeedback({ type: null, message: '' });
    setGameResults(null);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (!userAnswer.trim() || !problem || !isGameActive) return;

    const userNum = parseInt(userAnswer);
    if (isNaN(userNum)) return;

    setTotalProblems(prev => prev + 1);

    if (userNum === problem.answer) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setFeedback({
        type: 'success',
        message: `Correct! ${problem.num1} ${problem.operator} ${problem.num2} = ${problem.answer}`
      });
    } else {
      setStreak(0);
      setFeedback({
        type: 'error',
        message: `Wrong! ${problem.num1} ${problem.operator} ${problem.num2} = ${problem.answer}`
      });
    }

    setTimeout(() => {
      setProblem(generateProblem());
      setUserAnswer('');
      setFeedback({ type: null, message: '' });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const resetGame = () => {
    setTimeLimit(null);
    setTimeRemaining(null);
    setIsGameActive(false);
    setScore(0);
    setTotalProblems(0);
    setStreak(0);
    setProblem(null);
    setUserAnswer('');
    setFeedback({ type: null, message: '' });
    setGameResults(null);
  };

  if (!isGameActive && !gameResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Select Time Limit</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TIME_LIMITS.map(limit => (
              <button
                key={limit.value}
                onClick={() => startGame(limit.value)}
                className="p-4 bg-purple-100 hover:bg-purple-200 rounded-lg font-semibold text-purple-700"
              >
                {limit.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Game Results</h2>
          <div className="space-y-4 mb-8">
            <p className="text-2xl">Time: {formatTime(gameResults.time)}</p>
            <p className="text-2xl">Correct Answers: {gameResults.score}</p>
            <p className="text-2xl">Total Questions: {gameResults.total}</p>
            <p className="text-2xl">Accuracy: {((gameResults.score / gameResults.total) * 100 || 0).toFixed(1)}%</p>
          </div>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Math Quiz</h2>
          <p className="text-gray-600">Solve the math problems as fast as you can!</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-500 space-y-1">
            <div>Score: <span className="font-bold text-purple-600">{score}/{totalProblems}</span></div>
            <div>Streak: <span className="font-bold text-orange-600">{streak}</span></div>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {timeRemaining !== null && formatTime(timeRemaining)}
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 text-5xl font-bold text-gray-800 mb-6">
            <span>{problem.num1}</span>
            <span className="text-purple-600">
              {problem.operator === '+' ? <Plus size={40} /> : <Minus size={40} />}
            </span>
            <span>{problem.num2}</span>
            <span className="text-gray-400">=</span>
            <span className="text-purple-600">?</span>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            placeholder="Your answer"
            disabled={feedback.type !== null}
          />

          <button
            onClick={handleSubmit}
            disabled={!userAnswer.trim() || feedback.type !== null}
            className="w-full py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Submit Answer
          </button>
        </div>

        {feedback.type && (
          <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
            feedback.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {feedback.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {feedback.message}
          </div>
        )}

        {streak >= 5 && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg text-center">
            🔥 Amazing! You're on a {streak} problem streak!
          </div>
        )}
      </div>
    </div>
  );
}

export default MathQuizGame;