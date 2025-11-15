import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { Scenario, PlayerStats } from '../types';
import { UserIcon } from './icons/UserIcon';
import { WalletIcon } from './icons/WalletIcon';

interface GameScreenProps {
  scenario: Scenario;
  playerStats: PlayerStats;
  onAnswerSubmit: (answer: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ scenario, playerStats, onAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scenario]);

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsLoading(true);
    onAnswerSubmit(selectedOption);
  };

  const optionAnimations = scenario.options.map(() => useRef(new Animated.Value(1)).current);

  const handleOptionPress = (index: number, optionText: string) => {
    Animated.sequence([
      Animated.timing(optionAnimations[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(optionAnimations[index], {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
    
    setSelectedOption(optionText);
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={[
          styles.statsContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.statItem}>
          <UserIcon width={32} height={32} color="#06b6d4" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Age</Text>
            <Text style={styles.statValue}>{playerStats.age}</Text>
          </View>
        </View>
        <View style={styles.statItem}>
          <WalletIcon width={32} height={32} color="#10b981" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Net Worth</Text>
            <Text style={styles.statValue}>${playerStats.netWorth.toLocaleString()}</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.scenarioContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.scenarioText}>{scenario.scenario}</Text>
        <Text style={styles.question}>{scenario.question}</Text>
        
        <View style={styles.optionsContainer}>
          {scenario.options.map((option, index) => {
            const isSelected = selectedOption === option.text;
            const buttonScale = optionAnimations[index];
            
            return (
              <Animated.View
                key={index}
                style={{
                  transform: [{ scale: buttonScale }],
                }}
              >
                <TouchableOpacity
                  onPress={() => handleOptionPress(index, option.text)}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected
                  ]}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected
                  ]}>
                    {option.text}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!selectedOption || isLoading}
          style={[styles.submitButton, (!selectedOption || isLoading) && styles.submitButtonDisabled]}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Loading...' : 'Make Choice'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statTextContainer: {
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  scenarioContainer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scenarioText: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 16,
    lineHeight: 24,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#111827',
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  optionButtonSelected: {
    backgroundColor: '#06b6d4',
    borderColor: '#0891b2',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'left',
  },
  optionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameScreen;
