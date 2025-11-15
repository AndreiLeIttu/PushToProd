import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import LoadingSpinner from './components/LoadingSpinner';
import { GameState, PlayerStats, Scenario, ConceptToReview } from './types';
import { fetchInitialScenario, fetchNextScenario, fetchGameSummary } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [playerStats, setPlayerStats] = useState<PlayerStats>({ age: 18, netWorth: 1000 });
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [unmasteredConcepts, setUnmasteredConcepts] = useState<string[]>(['Budgeting', 'Saving', 'Investing', 'Credit', 'Debt']);
  const [masteredConcepts, setMasteredConcepts] = useState<string[]>([]);
  const [gameSummary, setGameSummary] = useState<{ overallSummary: string; conceptsToReview: ConceptToReview[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startGame = useCallback(async () => {
    setGameState('loading');
    setError(null);
    try {
      const initialScenario = await fetchInitialScenario();
      setScenario(initialScenario);
      setPlayerStats({ age: 18, netWorth: 1000 });
      setUnmasteredConcepts(['Budgeting', 'Saving', 'Investing', 'Credit', 'Debt']);
      setMasteredConcepts([]);
      setGameSummary(null);
      setGameState('playing');
    } catch (e) {
      setError('Failed to start the game. Please try again.');
      setGameState('error');
    }
  }, []);

  const handleAnswerSubmit = useCallback(async (answer: string) => {
    setGameState('loading');
    setError(null);
    
    const newAge = playerStats.age + 5;

    try {
      const { scenario: nextScenario, analysis } = await fetchNextScenario({
        age: newAge,
        netWorth: playerStats.netWorth,
        previousScenario: scenario!,
        userAnswer: answer,
        masteredConcepts,
        unmasteredConcepts,
      });

      // Update concepts based on the analysis
      if (scenario?.financialConcept) {
        if (analysis.correct) {
          if (!masteredConcepts.includes(scenario.financialConcept)) {
            setMasteredConcepts(prev => [...prev, scenario.financialConcept]);
            setUnmasteredConcepts(prev => prev.filter(c => c !== scenario.financialConcept));
          }
        } else {
           if (!unmasteredConcepts.includes(scenario.financialConcept)) {
            setUnmasteredConcepts(prev => [...prev, scenario.financialConcept]);
          }
        }
      }

      setPlayerStats(prev => ({ ...prev, age: newAge }));

      if (newAge >= 68) { // End game condition
        try {
          const summary = await fetchGameSummary(unmasteredConcepts);
          setGameSummary(summary);
          setGameState('end');
        } catch (e) {
          setError('Failed to generate your game summary. Please try again.');
          setGameState('error');
        }
        return;
      }

      setScenario(nextScenario);
      // A more complex game would update net worth based on the choice.
      // For this hackathon version, we keep it simple.
      setPlayerStats(prev => ({ ...prev, netWorth: prev.netWorth + Math.floor(Math.random() * 5000) - 1000 }));
      setGameState('playing');
    } catch (e) {
      setError('Failed to load the next part of your story. Please try again.');
      setGameState('error');
    }
  }, [playerStats, scenario, masteredConcepts, unmasteredConcepts]);

  const renderContent = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={startGame} />;
      case 'playing':
        return scenario ? <GameScreen scenario={scenario} playerStats={playerStats} onAnswerSubmit={handleAnswerSubmit} /> : <LoadingSpinner />;
      case 'end':
        return gameSummary ? <EndScreen summary={gameSummary} onPlayAgain={startGame} /> : <LoadingSpinner />;
      case 'loading':
        return <LoadingSpinner />;
      case 'error':
        return (
          <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">An Error Occurred</h2>
            <p>{error}</p>
            <button
              onClick={startGame}
              className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
