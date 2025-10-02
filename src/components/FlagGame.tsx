import React, { useState, useEffect, useCallback } from 'react';
import { Flag, RotateCcw, AlertCircle, Timer } from 'lucide-react';

interface Country {
  name: string;
  code: string;
}

// Backup data in case API fails
const backupCountries: Country[] = [
  { name: 'United States', code: 'us' },
  { name: 'United Kingdom', code: 'gb' },
  { name: 'France', code: 'fr' },
  { name: 'Germany', code: 'de' },
  { name: 'Italy', code: 'it' },
  { name: 'Spain', code: 'es' },
  { name: 'Canada', code: 'ca' },
  { name: 'Japan', code: 'jp' },
  { name: 'Australia', code: 'au' },
  { name: 'Brazil', code: 'br' },
  { name: 'India', code: 'in' },
  { name: 'China', code: 'cn' },
  { name: 'Russia', code: 'ru' },
  { name: 'Mexico', code: 'mx' },
  { name: 'South Korea', code: 'kr' },
  { name: 'South Africa', code: 'za' },
  { name: 'Argentina', code: 'ar' },
  { name: 'Sweden', code: 'se' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'Portugal', code: 'pt' },
  { name: 'Switzerland', code: 'ch' },
  { name: 'Poland', code: 'pl' },
  { name: 'Turkey', code: 'tr' },
  { name: 'Greece', code: 'gr' },
  { name: 'Egypt', code: 'eg' },
  { name: 'Thailand', code: 'th' },
  { name: 'Ireland', code: 'ie' },
  { name: 'New Zealand', code: 'nz' },
  { name: 'Singapore', code: 'sg' },
  { name: 'Norway', code: 'no' },
  { name: 'Finland', code: 'fi' },
  { name: 'Denmark', code: 'dk' },
  { name: 'Belgium', code: 'be' },
  { name: 'Austria', code: 'at' },
  { name: 'Czech Republic', code: 'cz' },
  { name: 'Hungary', code: 'hu' },
  { name: 'Romania', code: 'ro' },
  { name: 'Bulgaria', code: 'bg' },
  { name: 'Croatia', code: 'hr' },
  { name: 'Serbia', code: 'rs' },
  { name: 'Ukraine', code: 'ua' },
  { name: 'Belarus', code: 'by' },
  { name: 'Slovakia', code: 'sk' },
  { name: 'Slovenia', code: 'si' },
  { name: 'Lithuania', code: 'lt' },
  { name: 'Latvia', code: 'lv' },
  { name: 'Estonia', code: 'ee' },
  { name: 'Iceland', code: 'is' },
  { name: 'Luxembourg', code: 'lu' },
  { name: 'Malta', code: 'mt' },
  { name: 'Cyprus', code: 'cy' },
  { name: 'Israel', code: 'il' },
  { name: 'Saudi Arabia', code: 'sa' },
  { name: 'United Arab Emirates', code: 'ae' },
  { name: 'Qatar', code: 'qa' },
  { name: 'Kuwait', code: 'kw' },
  { name: 'Oman', code: 'om' },
  { name: 'Pakistan', code: 'pk' },
  { name: 'Bangladesh', code: 'bd' },
  { name: 'Nepal', code: 'np' },
  { name: 'Sri Lanka', code: 'lk' },
  { name: 'Myanmar', code: 'mm' },
  { name: 'Vietnam', code: 'vn' },
  { name: 'Malaysia', code: 'my' },
  { name: 'Philippines', code: 'ph' },
  { name: 'Indonesia', code: 'id' },
  { name: 'Cambodia', code: 'kh' },
  { name: 'Laos', code: 'la' },
  { name: 'Mongolia', code: 'mn' },
  { name: 'Kazakhstan', code: 'kz' },
  { name: 'Uzbekistan', code: 'uz' },
  { name: 'Turkmenistan', code: 'tm' },
  { name: 'Georgia', code: 'ge' },
  { name: 'Armenia', code: 'am' },
  { name: 'Azerbaijan', code: 'az' },
  { name: 'Morocco', code: 'ma' },
  { name: 'Algeria', code: 'dz' },
  { name: 'Tunisia', code: 'tn' },
  { name: 'Libya', code: 'ly' },
  { name: 'Nigeria', code: 'ng' },
  { name: 'Kenya', code: 'ke' },
  { name: 'Ethiopia', code: 'et' },
  { name: 'Uganda', code: 'ug' },
  { name: 'Tanzania', code: 'tz' },
  { name: 'Ghana', code: 'gh' },
  { name: 'Ivory Coast', code: 'ci' },
  { name: 'Senegal', code: 'sn' },
  { name: 'Cameroon', code: 'cm' },
  { name: 'Zimbabwe', code: 'zw' },
  { name: 'Zambia', code: 'zm' },
  { name: 'Botswana', code: 'bw' },
  { name: 'Namibia', code: 'na' },
  { name: 'Madagascar', code: 'mg' },
  { name: 'Chile', code: 'cl' },
  { name: 'Colombia', code: 'co' },
  { name: 'Peru', code: 'pe' },
  { name: 'Venezuela', code: 've' },
  { name: 'Ecuador', code: 'ec' },
  { name: 'Paraguay', code: 'py' },
  { name: 'Uruguay', code: 'uy' },
  { name: 'Bolivia', code: 'bo' },
  { name: 'Costa Rica', code: 'cr' },
  { name: 'Panama', code: 'pa' },
  { name: 'Cuba', code: 'cu' },
  { name: 'Dominican Republic', code: 'do' },
  { name: 'Haiti', code: 'ht' },
  { name: 'Jamaica', code: 'jm' },
];


const GAME_DURATION = 60; // 60 seconds game duration

function FlagGame() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentFlag, setCurrentFlag] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [flagLoadError, setFlagLoadError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
      setHasAnswered(true);
    }
  }, [timeLeft, isGameActive]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) throw new Error('Failed to fetch countries');
      
      const data = await response.json();
      const formattedCountries = data
        .filter((country: any) => 
          country.name?.common &&
          country.cca2 &&
          country.independent !== false
        )
        .map((country: any) => ({
          name: country.name.common,
          code: country.cca2.toLowerCase()
        }));

      if (formattedCountries.length < 3) throw new Error('Not enough valid countries');
      
      setCountries(formattedCountries);
      setError(null);
      generateNewRound(formattedCountries);
    } catch (error) {
      console.error('Error:', error);
      setError('Using backup country data');
      setCountries(backupCountries);
      generateNewRound(backupCountries);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setFlagLoadError(true);
    setIsImageLoading(false);
    setTimeout(() => {
      generateNewRound(countries);
      setFlagLoadError(false);
    }, 1000);
  };

  const generateNewRound = (availableCountries: Country[]) => {
    const shuffled = [...availableCountries].sort(() => Math.random() - 0.5);
    const correctCountry = shuffled[0];
    const wrongOptions = shuffled.slice(1, 3);
    const allOptions = [...wrongOptions, correctCountry]
      .sort(() => Math.random() - 0.5);

    setIsImageLoading(true);
    setCurrentFlag(correctCountry);
    setOptions(allOptions);
    setHasAnswered(false);
    setSelectedAnswer(null);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsGameActive(true);
    setError(null);
    generateNewRound(countries);
  };

  const handleGuess = (countryName: string) => {
    if (hasAnswered || !isGameActive) return;
    
    setSelectedAnswer(countryName);
    setHasAnswered(true);
    
    if (countryName === currentFlag?.name) {
      setScore(score + 1);
      setHighScore(Math.max(highScore, score + 1));
    }

    setTimeout(() => {
      if (timeLeft > 0) {
        generateNewRound(countries);
      }
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-pulse">Loading flags...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">Guess the Flag</h2>
        {error && (
          <div className="text-yellow-600 bg-yellow-50 p-1.5 rounded-lg mb-2 flex items-center justify-center gap-2 text-sm">
            <AlertCircle size={14} />
            {error}
          </div>
        )}
        <div className="flex justify-between items-center text-sm">
          <div>Score: {score}</div>
          <div className={`font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}`}>
            {timeLeft}s
          </div>
          <div>Best: {highScore}</div>
        </div>
      </div>

      {!isGameActive && !isLoading ? (
        <div className="text-center">
          {timeLeft === 0 ? (
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">Time's Up!</h3>
              <p>Final Score: {score}</p>
              {score > highScore && (
                <p className="text-green-500 font-bold text-sm mt-1">New High Score!</p>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <h3 className="text-base mb-2">Guess as many flags as you can in {GAME_DURATION} seconds!</h3>
            </div>
          )}
          <button
            onClick={startGame}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <Timer size={18} />
            {timeLeft === 0 ? 'Play Again' : 'Start Game'}
          </button>
        </div>
      ) : (
        <>
          {currentFlag && (
            <div className="mb-4 relative">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              )}
              <img
                src={`https://flagcdn.com/w320/${currentFlag.code}.png`}
                alt="Flag to guess"
                className={`w-full h-40 object-contain rounded-lg shadow-md transition-all duration-300 ${
                  flagLoadError || isImageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          )}

          <div className="grid gap-2">
            {!isImageLoading && options.map((country) => (
              <button
                key={country.code}
                onClick={() => handleGuess(country.name)}
                disabled={hasAnswered}
                className={`
                  py-2 px-4 rounded-lg text-center font-medium transition-all text-base
                  ${hasAnswered 
                    ? country.name === currentFlag?.name
                      ? 'bg-green-500 text-white'
                      : country.name === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100'
                    : 'bg-blue-500 text-white hover:bg-blue-600'}
                `}
              >
                {country.name}
              </button>
            ))}
          </div>

          {isGameActive && !isImageLoading && (
            <button
              onClick={startGame}
              className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2 text-sm"
            >
              <RotateCcw size={16} />
              Restart
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default FlagGame;
