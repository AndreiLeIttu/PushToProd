import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, RadioButton } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Concept, QuizQuestion } from '../types/concept';
import { useConceptContext } from '../contexts/ConceptContext';

// Concept Quiz Screen
// Phase 2, Step 2.3

type ConceptQuizScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: { concept: Concept } }>;
};

export default function ConceptQuizScreen({ navigation, route }: ConceptQuizScreenProps) {
  const { concept } = route.params as { concept: Concept };
  const { markConceptComplete } = useConceptContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<string, string>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = concept.quiz[currentQuestionIndex];
  const totalQuestions = concept.quiz.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => new Map(prev).set(questionId, optionId));
  };

  const handleNext = () => {
    if (!selectedAnswers.has(currentQuestion.id)) {
      Alert.alert('Please select an answer', 'Choose an option to continue.');
      return;
    }

    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    let maxScore = 0;

    concept.quiz.forEach(question => {
      maxScore += question.points;
      const selectedOptionId = selectedAnswers.get(question.id);
      if (!selectedOptionId) return;

      const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
      if (selectedOption?.isCorrect) {
        totalScore += question.points;
      }
    });

    const percentage = Math.round((totalScore / maxScore) * 100);
    setScore(percentage);
    setShowResults(true);

    // Mark concept as complete
    markConceptComplete(concept.id, percentage);
  };

  const handleRetake = () => {
    setSelectedAnswers(new Map());
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
  };

  const handleFinish = () => {
    navigation.goBack();
  };

  if (showResults) {
    const passed = score >= 70;
    const gradeColor = score >= 90 ? '#2e7d32' : score >= 70 ? '#558b2f' : '#d32f2f';

    return (
      <ScrollView style={styles.container}>
        <View style={styles.resultsHeader}>
          <Text variant="headlineLarge" style={styles.resultsTitle}>
            Quiz Complete!
          </Text>
          <Text variant="displayLarge" style={[styles.scoreText, { color: gradeColor }]}>
            {score}%
          </Text>
          <Text variant="titleMedium" style={styles.resultsSubtitle}>
            {passed ? '🎉 Great job! Concept mastered!' : '📚 Review the material and try again'}
          </Text>
        </View>

        {/* Detailed Results */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Question Review
            </Text>
            {concept.quiz.map((question, idx) => {
              const selectedOptionId = selectedAnswers.get(question.id);
              const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
              const isCorrect = selectedOption?.isCorrect || false;

              return (
                <View key={question.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text variant="bodyMedium" style={styles.questionNumber}>
                      Question {idx + 1}
                    </Text>
                    <Text style={[styles.resultBadge, isCorrect ? styles.correct : styles.incorrect]}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </Text>
                  </View>
                  <Text variant="bodyMedium" style={styles.reviewQuestion}>
                    {question.question}
                  </Text>
                  {!isCorrect && selectedOption && (
                    <View style={styles.explanationBox}>
                      <Text variant="bodySmall" style={styles.explanationLabel}>
                        Your answer:
                      </Text>
                      <Text variant="bodySmall" style={styles.explanationText}>
                        {selectedOption.text}
                      </Text>
                      <Text variant="bodySmall" style={styles.explanationLabel}>
                        Why:
                      </Text>
                      <Text variant="bodySmall" style={styles.explanationText}>
                        {selectedOption.explanation}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {!passed && (
            <Button
              mode="contained"
              onPress={handleRetake}
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
            >
              Retake Quiz
            </Button>
          )}
          <Button
            mode={passed ? 'contained' : 'outlined'}
            onPress={handleFinish}
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
          >
            {passed ? 'Continue Learning' : 'Review Material'}
          </Button>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text variant="bodyMedium" style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </Text>
      </View>

      {/* Question */}
      <Card style={styles.questionCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.question}>
            {currentQuestion.question}
          </Text>
        </Card.Content>
      </Card>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <RadioButton.Group
          onValueChange={value => handleSelectAnswer(currentQuestion.id, value)}
          value={selectedAnswers.get(currentQuestion.id) || ''}
        >
          {currentQuestion.options.map(option => (
            <Card key={option.id} style={styles.optionCard}>
              <Card.Content>
                <RadioButton.Item
                  label={option.text}
                  value={option.id}
                  labelStyle={styles.optionLabel}
                />
              </Card.Content>
            </Card>
          ))}
        </RadioButton.Group>
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleNext}
          disabled={!selectedAnswers.has(currentQuestion.id)}
          style={styles.nextButton}
          contentStyle={styles.buttonContent}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  progressText: {
    color: '#666',
  },
  questionCard: {
    margin: 16,
    backgroundColor: '#fff',
  },
  question: {
    fontWeight: 'bold',
    lineHeight: 32,
  },
  optionsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  optionCard: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  optionLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    padding: 16,
  },
  nextButton: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  resultsHeader: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultsTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scoreText: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultsSubtitle: {
    color: '#666',
    textAlign: 'center',
  },
  card: {
    margin: 16,
    marginBottom: 0,
    marginTop: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  reviewItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionNumber: {
    fontWeight: 'bold',
  },
  resultBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  correct: {
    color: '#2e7d32',
    backgroundColor: '#e8f5e9',
  },
  incorrect: {
    color: '#d32f2f',
    backgroundColor: '#ffebee',
  },
  reviewQuestion: {
    marginBottom: 8,
  },
  explanationBox: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#fff3e0',
    borderRadius: 8,
  },
  explanationLabel: {
    fontWeight: 'bold',
    color: '#e65100',
    marginBottom: 4,
  },
  explanationText: {
    color: '#333',
    marginBottom: 8,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    borderRadius: 8,
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  summaryText: {
    lineHeight: 26,
    fontWeight: '500',
    color: '#333',
  },
  bodyText: {
    lineHeight: 24,
    color: '#333',
  },
  example: {
    marginBottom: 16,
  },
  exampleTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6200ee',
  },
  exampleText: {
    lineHeight: 22,
    color: '#333',
  },
  listItem: {
    marginBottom: 8,
    lineHeight: 24,
  },
  quizContainer: {
    padding: 24,
  },
  quizButton: {
    borderRadius: 8,
  },
  previousScore: {
    marginTop: 12,
    color: '#666',
    textAlign: 'center',
  },
});

