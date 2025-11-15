import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
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
      const errorMessage = e instanceof Error ? e.message : 'Failed to start the game. Please try again.';
      setError(errorMessage);
      setGameState('error');
      console.error('Game start error:', e);
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
          const errorMessage = e instanceof Error ? e.message : 'Failed to generate your game summary. Please try again.';
          setError(errorMessage);
          setGameState('error');
          console.error('Game summary error:', e);
        }
        return;
      }

      setScenario(nextScenario);
      // A more complex game would update net worth based on the choice.
      // For this hackathon version, we keep it simple.
      setPlayerStats(prev => ({ ...prev, netWorth: prev.netWorth + Math.floor(Math.random() * 5000) - 1000 }));
      setGameState('playing');
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to load the next part of your story. Please try again.';
      setError(errorMessage);
      setGameState('error');
      console.error('Next scenario error:', e);
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
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>An Error Occurred</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.errorButton} onPress={startGame}>
              <Text style={styles.errorButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fee2e2',
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f87171',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#991b1b',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#991b1b',
    textAlign: 'center',
    marginBottom: 24,
  },
  errorButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  errorButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
