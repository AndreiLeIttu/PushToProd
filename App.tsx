import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import InitialQuiz from './components/InitialQuiz';
import StartScreen from './components/StartScreen';
import ConceptsLibrary from './components/ConceptsLibrary';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import LoadingSpinner from './components/LoadingSpinner';
import NavigationBar from './components/NavigationBar';
import PreSummaryScreen from './components/PreSummaryScreen';
import { GameState, PlayerStats, Scenario, ConceptToReview, GameGrade, AnswerQuality, LiteracyLevel } from './types';
import { 
  initializeProfile, 
  startLife, 
  fetchInitialScenario, 
  fetchNextScenario, 
  fetchGameSummary,
  convertSummaryToFrontend
} from './services/backendService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('quiz');
  const [userAge, setUserAge] = useState<number>(18);
  const [literacyLevel, setLiteracyLevel] = useState<LiteracyLevel>('beginner');
  const [playerStats, setPlayerStats] = useState<PlayerStats>({ age: 18, netWorth: 1000 });
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [studiedConcepts, setStudiedConcepts] = useState<string[]>([]);
  const [masteredConcepts, setMasteredConcepts] = useState<string[]>([]);
  const [unmasteredConcepts, setUnmasteredConcepts] = useState<string[]>([]);
  const [gameSummary, setGameSummary] = useState<{ overallSummary: string; conceptsToReview: ConceptToReview[] } | null>(null);
  const [gameGrade, setGameGrade] = useState<GameGrade | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [goodAnswers, setGoodAnswers] = useState(0);
  const [neutralAnswers, setNeutralAnswers] = useState(0);
  const [badAnswers, setBadAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [wrongConcepts, setWrongConcepts] = useState<string[]>([]);
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [gameState]);

  const calculateGrade = (good: number, neutral: number, bad: number, total: number): GameGrade => {
    const score = total > 0 ? (good * 1.0 + neutral * 0.5) / total : 0;
    const percentage = score * 100;
    
    let letterGrade: string;
    if (percentage >= 90) letterGrade = 'A';
    else if (percentage >= 80) letterGrade = 'B';
    else if (percentage >= 70) letterGrade = 'C';
    else if (percentage >= 60) letterGrade = 'D';
    else letterGrade = 'F';
    
    return {
      score: good + neutral * 0.5,
      percentage: Math.round(percentage),
      letterGrade,
      totalQuestions: total,
      goodAnswers: good,
      neutralAnswers: neutral,
      badAnswers: bad,
    };
  };

  const handleQuizSubmit = async (age: number, level: LiteracyLevel) => {
    setGameState('loading');
    setError(null);
    
    try {
      await initializeProfile(age, level);
      setUserAge(age);
      setLiteracyLevel(level);
      setGameState('start');
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to initialize profile. Please try again.';
      setError(errorMessage);
      setGameState('error');
      console.error('Profile initialization error:', e);
    }
  };

  const handleConceptStudied = (conceptId: string) => {
    if (!studiedConcepts.includes(conceptId)) {
      setStudiedConcepts(prev => [...prev, conceptId]);
    }
  };

  const startGame = useCallback(async () => {
    setGameState('loading');
    setError(null);
    setGoodAnswers(0);
    setNeutralAnswers(0);
    setBadAnswers(0);
    setTotalQuestions(0);
    setWrongConcepts([]);
    
    const initialUnmastered = ['Budgeting', 'Saving', 'Investing', 'Credit', 'Debt', 'Retirement Planning', 'Insurance', 'Taxes'];
    
    setUnmasteredConcepts(initialUnmastered);
    setMasteredConcepts([]);
    
    try {
      const lifeState = await startLife();
      
      const initialScenario = await fetchInitialScenario();
      setScenario(initialScenario);
      setPlayerStats({ age: lifeState.game_age, netWorth: lifeState.balance });
      setGameSummary(null);
      setGameGrade(null);
      setGameState('playing');
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to start the game. Please try again.';
      setError(errorMessage);
      setGameState('error');
      console.error('Game start error:', e);
    }
  }, [studiedConcepts]);

  const handleAnswerSubmit = useCallback(async (answer: string) => {
    setGameState('loading');
    setError(null);

    try {
      const { scenario: nextScenario, analysis, lifeState: updatedLifeState } = await fetchNextScenario({
        age: playerStats.age,
        netWorth: playerStats.netWorth,
        previousScenario: scenario!,
        userAnswer: answer,
        masteredConcepts,
        unmasteredConcepts,
        studiedConcepts,
      });

      setTotalQuestions(prev => prev + 1);
      if (analysis.quality === 'good') {
        setGoodAnswers(prev => prev + 1);
      } else if (analysis.quality === 'neutral') {
        setNeutralAnswers(prev => prev + 1);
      } else if (analysis.quality === 'bad') {
        setBadAnswers(prev => prev + 1);
      }

      if (scenario?.financialConcept) {
        if (analysis.quality === 'good') {
          if (!masteredConcepts.includes(scenario.financialConcept)) {
            setMasteredConcepts(prev => [...prev, scenario.financialConcept]);
            setUnmasteredConcepts(prev => prev.filter(c => c !== scenario.financialConcept));
          }
          setWrongConcepts(prev => prev.filter(c => c !== scenario.financialConcept));
        } else if (analysis.quality === 'bad') {
           if (!unmasteredConcepts.includes(scenario.financialConcept)) {
            setUnmasteredConcepts(prev => [...prev, scenario.financialConcept]);
          }
          if (!wrongConcepts.includes(scenario.financialConcept)) {
            setWrongConcepts(prev => [...prev, scenario.financialConcept]);
          }
        }
      }

      const newAge = updatedLifeState.game_age;
      const newNetWorth = updatedLifeState.balance;

      if (newAge >= 68) {
        setGameState('preSummary');
        
        try {
          const backendSummary = await fetchGameSummary();
          const summary = convertSummaryToFrontend(backendSummary);
          const finalGood = goodAnswers + (analysis.quality === 'good' ? 1 : 0);
          const finalNeutral = neutralAnswers + (analysis.quality === 'neutral' ? 1 : 0);
          const finalBad = badAnswers + (analysis.quality === 'bad' ? 1 : 0);
          const finalTotal = totalQuestions + 1;
          const grade = calculateGrade(finalGood, finalNeutral, finalBad, finalTotal);
          setTimeout(() => {
            setGameGrade(grade);
            setGameSummary(summary);
            setGameState('end');
          }, 3000);
        } catch (e) {
          const errorMessage = e instanceof Error ? e.message : 'Failed to generate your game summary. Please try again.';
          setError(errorMessage);
          setGameState('error');
          console.error('Game summary error:', e);
        }
        return;
      }

      setScenario(nextScenario);
      setPlayerStats({ age: newAge, netWorth: newNetWorth });
      setGameState('playing');
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to load the next part of your story. Please try again.';
      setError(errorMessage);
      setGameState('error');
      console.error('Next scenario error:', e);
    }
  }, [playerStats, scenario, masteredConcepts, unmasteredConcepts, studiedConcepts, goodAnswers, neutralAnswers, badAnswers, totalQuestions, wrongConcepts]);

  const renderContent = () => {
    switch (gameState) {
      case 'quiz':
        return <InitialQuiz onSubmit={handleQuizSubmit} />;
      case 'start':
        return (
          <StartScreen 
            onStartSimulation={startGame}
            onStudyConcepts={() => setGameState('concepts')}
          />
        );
      case 'concepts':
        return (
          <ConceptsLibrary
            onBack={() => {
              setGameState('start');
              setSelectedConceptId(null);
            }}
            selectedConceptId={selectedConceptId}
            onConceptSelected={() => setSelectedConceptId(null)}
          />
        );
      case 'playing':
        return scenario ? <GameScreen scenario={scenario} playerStats={playerStats} onAnswerSubmit={handleAnswerSubmit} streak={currentStreak} setStreak={setCurrentStreak}/> : <LoadingSpinner />;
      case 'end':
        return gameSummary && gameGrade ? (
          <EndScreen 
            summary={gameSummary} 
            grade={gameGrade}
            wrongConcepts={wrongConcepts}
            onConceptPress={(conceptName) => {
              const conceptMap: Record<string, string> = {
                'Budgeting': 'budgeting',
                'Saving': 'saving',
                'Investing': 'investing',
                'Credit': 'credit',
                'Debt': 'debt',
                'Retirement Planning': 'retirement',
                'Insurance': 'insurance',
                'Taxes': 'taxes',
              };
              const normalizedName = conceptName.trim();
              let conceptId = conceptMap[normalizedName];
              
              if (!conceptId) {
                const lowerName = normalizedName.toLowerCase();
                for (const [key, value] of Object.entries(conceptMap)) {
                  if (key.toLowerCase() === lowerName) {
                    conceptId = value;
                    break;
                  }
                }
              }
              
              if (!conceptId) {
                conceptId = normalizedName.toLowerCase().replace(/\s+/g, '-');
              }
              
              setSelectedConceptId(conceptId);
              setGameState('concepts');
            }}
            onPlayAgain={() => {
              setGameState('start');
            }} 
          />
        ) : <LoadingSpinner />;
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
      case 'preSummary':
        return <PreSummaryScreen />;
      default:
        return <InitialQuiz onSubmit={handleQuizSubmit} />;
    }
  };

  const showNavBar = gameState === 'start' || gameState === 'concepts' || gameState === 'playing' || gameState == 'end';
  const getCurrentScreen = () => {
    if (gameState === 'concepts') return 'concepts';
    if (gameState === 'playing') return 'start';
    if (gameState === 'start') return 'start';
    return 'start';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {renderContent()}
      </Animated.View>
      {showNavBar && (
        <NavigationBar
          currentScreen={getCurrentScreen()}
          onNavigate={(screen) => {
            if (screen === 'concepts') {
              setGameState('concepts');
            } else if (screen === 'start') {
              if (gameState === 'playing') {
                setGameState('start');
              } else {
                setGameState('start');
                setSelectedConceptId(null);
              }
            }
          }}
        />
      )}
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
