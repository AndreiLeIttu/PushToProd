import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsLoading(true);
    onAnswerSubmit(selectedOption);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.statsContainer}>
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
      </View>

      <View style={styles.scenarioContainer}>
        <Text style={styles.scenarioText}>{scenario.scenario}</Text>
        <Text style={styles.question}>{scenario.question}</Text>
        
        <View style={styles.optionsContainer}>
          {scenario.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedOption(option.text)}
              style={[
                styles.optionButton,
                selectedOption === option.text && styles.optionButtonSelected
              ]}
            >
              <Text style={[
                styles.optionText,
                selectedOption === option.text && styles.optionTextSelected
              ]}>
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!selectedOption || isLoading}
          style={[styles.submitButton, (!selectedOption || isLoading) && styles.submitButtonDisabled]}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Loading...' : 'Make Choice'}
          </Text>
        </TouchableOpacity>
      </View>
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
