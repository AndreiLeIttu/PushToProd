import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { ConceptToReview, GameGrade } from '../types';
import { TrophyIcon } from './icons/TrophyIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface EndScreenProps {
  summary: {
    overallSummary: string;
    conceptsToReview: ConceptToReview[];
  };
  grade: GameGrade;
  wrongConcepts: string[];
  onConceptPress: (conceptName: string) => void;
  onPlayAgain: () => void;
}

const WrongConceptCard: React.FC<{ conceptName: string; index: number; onPress: () => void }> = ({ conceptName, index, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.wrongConceptCard}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <BookOpenIcon width={24} height={24} color="#ef4444" />
        <View style={styles.wrongConceptTextContainer}>
          <Text style={styles.wrongConceptName}>{conceptName}</Text>
          <Text style={styles.wrongConceptHint}>Tap to review this concept</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const EndScreen: React.FC<EndScreenProps> = ({ summary, grade, wrongConcepts, onConceptPress, onPlayAgain }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const gradeScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(gradeScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getGradeColor = (letterGrade: string) => {
    switch (letterGrade) {
      case 'A': return '#10b981';
      case 'B': return '#3b82f6';
      case 'C': return '#f59e0b';
      case 'D': return '#ef4444';
      case 'F': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TrophyIcon width={64} height={64} color="#ffffff" />
        <Text style={styles.headerTitle}>Your Financial Journey Summary</Text>
        
        <Animated.View
          style={[
            styles.gradeContainer,
            {
              transform: [{ scale: gradeScale }],
            },
          ]}
        >
          <View style={[styles.gradeCircle, { backgroundColor: getGradeColor(grade.letterGrade) }]}>
            <Text style={styles.gradeLetter}>{grade.letterGrade}</Text>
          </View>
          <View style={styles.gradeDetails}>
            <Text style={styles.gradePercentage}>{grade.percentage}%</Text>
            <Text style={styles.gradeSubtext}>Final Score</Text>
            {grade.goodAnswers > 0 && (
              <View style={styles.goodAnswersBadge}>
                <Text style={styles.goodAnswersText}>
                  ✓ {grade.goodAnswers} excellent choice{grade.goodAnswers !== 1 ? 's' : ''}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
        
        <Text style={styles.headerSummary}>{summary.overallSummary}</Text>
      </Animated.View>

      {(wrongConcepts.length > 0 || summary.conceptsToReview.length > 0) && (
        <View style={styles.conceptsSection}>
          <Text style={styles.sectionTitle}>Concepts to Review</Text>
          <Text style={styles.sectionSubtitle}>
            You struggled with these concepts. Tap to learn more.
          </Text>
          <View style={styles.conceptsList}>
            {/* Show concepts from backend summary first */}
            {summary.conceptsToReview.map((concept, index) => (
              <WrongConceptCard
                key={`summary-${concept.concept}-${index}`}
                conceptName={concept.concept}
                index={index}
                onPress={() => onConceptPress(concept.concept)}
              />
            ))}
            {/* Then show wrong concepts that aren't already in summary */}
            {wrongConcepts
              .filter(concept => !summary.conceptsToReview.some(c => c.concept === concept))
              .map((conceptName, index) => (
                <WrongConceptCard
                  key={`wrong-${conceptName}-${index}`}
                  conceptName={conceptName}
                  index={summary.conceptsToReview.length + index}
                  onPress={() => onConceptPress(conceptName)}
                />
              ))}
          </View>
        </View>
      )}

      <Animated.View
        style={{
          transform: [{ scale: buttonScale }],
        }}
      >
        <TouchableOpacity
          style={styles.playAgainButton}
          onPress={onPlayAgain}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <Text style={styles.playAgainButtonText}>Play Again</Text>
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
    marginTop: 16,
  },
  gradeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 12,
    gap: 20,
  },
  gradeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  gradeLetter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gradeDetails: {
    alignItems: 'flex-start',
    flex: 1,
  },
  gradePercentage: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: -1,
  },
  gradeSubtext: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    marginTop: 4,
    fontWeight: '500',
  },
  goodAnswersBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  goodAnswersText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
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
    gap: 12,
  },
  wrongConceptCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  wrongConceptTextContainer: {
    flex: 1,
  },
  wrongConceptName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  wrongConceptHint: {
    fontSize: 14,
    color: '#6b7280',
  },
  arrow: {
    fontSize: 20,
    color: '#6b7280',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
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
