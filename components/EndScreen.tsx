import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ConceptToReview } from '../types';
import { TrophyIcon } from './icons/TrophyIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface EndScreenProps {
  summary: {
    overallSummary: string;
    conceptsToReview: ConceptToReview[];
  };
  onPlayAgain: () => void;
}

const ConceptReviewCard: React.FC<{ concept: ConceptToReview }> = ({ concept }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
  };

  return (
    <View style={styles.conceptCard}>
      <View style={styles.conceptHeader}>
        <BookOpenIcon width={24} height={24} color="#06b6d4" />
        <Text style={styles.conceptTitle}>{concept.concept}</Text>
      </View>
      <Text style={styles.conceptDescription}>{concept.description}</Text>
      <Text style={styles.conceptQuestion}>{concept.question}</Text>
      
      <View style={styles.optionsContainer}>
        {concept.options.map((option, index) => {
          const isCorrect = index === concept.correctAnswerIndex;
          const isWrong = index === selectedAnswer && !isCorrect;
          
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswerSelect(index)}
              disabled={showResult}
              style={[
                styles.optionButton,
                showResult && isCorrect && styles.optionButtonCorrect,
                showResult && isWrong && styles.optionButtonWrong,
              ]}
            >
              <Text style={[
                styles.optionText,
                showResult && isCorrect && styles.optionTextCorrect,
                showResult && isWrong && styles.optionTextWrong,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {showResult && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Explanation:</Text>
          <Text style={styles.explanationText}>{concept.explanation}</Text>
        </View>
      )}
    </View>
  );
};

const EndScreen: React.FC<EndScreenProps> = ({ summary, onPlayAgain }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TrophyIcon width={64} height={64} color="#ffffff" />
        <Text style={styles.headerTitle}>Your Financial Journey Summary</Text>
        <Text style={styles.headerSummary}>{summary.overallSummary}</Text>
      </View>

      {summary.conceptsToReview.length > 0 && (
        <View style={styles.conceptsSection}>
          <Text style={styles.sectionTitle}>Areas to Strengthen</Text>
          <View style={styles.conceptsList}>
            {summary.conceptsToReview.map(concept => (
              <ConceptReviewCard key={concept.concept} concept={concept} />
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.playAgainButton} onPress={onPlayAgain}>
        <Text style={styles.playAgainButtonText}>Play Again</Text>
      </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#10b981',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSummary: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
  },
  conceptsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  conceptsList: {
    gap: 16,
  },
  conceptCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  conceptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  conceptTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0891b2',
  },
  conceptDescription: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 16,
    lineHeight: 22,
  },
  conceptQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  optionButton: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  optionButtonCorrect: {
    backgroundColor: '#d1fae5',
    borderColor: '#10b981',
  },
  optionButtonWrong: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'left',
  },
  optionTextCorrect: {
    color: '#065f46',
    fontWeight: '600',
  },
  optionTextWrong: {
    color: '#991b1b',
    fontWeight: '600',
  },
  explanationContainer: {
    backgroundColor: '#dbeafe',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    padding: 16,
    borderRadius: 4,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  playAgainButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playAgainButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EndScreen;
