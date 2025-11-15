import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Chip } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSimulationContext } from '../contexts/SimulationContext';
import { formatCurrency } from '../utils/financialCalculations';
import { SimulationResult } from '../types/simulation';

// Simulation Result Screen
// Phase 1, Step 1.3

type SimulationResultScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function SimulationResultScreen({ navigation }: SimulationResultScreenProps) {
  const { completeSimulation, resetSimulation, currentSimulation } = useSimulationContext();
  const [result, setResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    // Complete simulation and get results
    const simulationResult = completeSimulation();
    if (simulationResult) {
      setResult(simulationResult);
    }
  }, []);

  if (!result || !currentSimulation) {
    return (
      <View style={styles.container}>
        <Text>Calculating results...</Text>
      </View>
    );
  }

  const gradeColors: Record<string, string> = {
    'A': '#2e7d32',
    'B': '#558b2f',
    'C': '#f57c00',
    'D': '#e64a19',
    'F': '#c62828',
  };

  const gradeColor = gradeColors[result.grade] || '#666';

  const handleDone = () => {
    resetSimulation();
    navigation.navigate('Dashboard');
  };

  const handlePlayAgain = () => {
    resetSimulation();
    navigation.navigate('Simulation');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="displayMedium" style={styles.title}>
          Game Over! 🎮
        </Text>
        <Text variant="headlineSmall" style={styles.subtitle}>
          You lived {result.ageReached} years
        </Text>
        <Text variant="bodyMedium" style={styles.tagline}>
          Let's see how you did...
        </Text>
      </View>

      {/* Grade Card - More engaging */}
      <Card style={styles.gradeCard}>
        <Card.Content style={styles.gradeContent}>
          <View style={styles.gradeContainer}>
            <View style={styles.gradeCircle}>
              <Text variant="displayLarge" style={[styles.grade, { color: gradeColor }]}>
                {result.grade}
              </Text>
            </View>
            <View style={styles.gradeTextContainer}>
              <Text variant="titleLarge" style={styles.gradeTitle}>
                {result.grade === 'A' && '🔥 Crushing It!'}
                {result.grade === 'B' && '💪 Pretty Solid!'}
                {result.grade === 'C' && '👍 Not Bad!'}
                {result.grade === 'D' && '😅 Struggled a Bit'}
                {result.grade === 'F' && '💀 Rough Life'}
              </Text>
              <Text variant="bodyMedium" style={styles.gradeDescription}>
                {result.grade === 'A' && 'You became a millionaire! That\'s top 1%! 🎉'}
                {result.grade === 'B' && 'You built serious wealth. Well done! 💰'}
                {result.grade === 'C' && 'You made it work, but could\'ve saved more 📊'}
                {result.grade === 'D' && 'You survived, but money was tight 😬'}
                {result.grade === 'F' && 'Died in debt... let\'s try again and learn! 📚'}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Life Story */}
      {result.lifeStory && result.lifeStory.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              📖 Your Life Story
            </Text>
            {result.lifeStory.map((event, idx) => (
              <Text key={idx} variant="bodyMedium" style={styles.storyItem}>
                {event}
              </Text>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Financial Summary */}
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Financial Summary
          </Text>

          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Savings Change:</Text>
            <Text
              variant="titleMedium"
              style={[
                styles.summaryValue,
                result.financialChange.savings >= 0 ? styles.positive : styles.negative,
              ]}
            >
              {result.financialChange.savings >= 0 ? '+' : ''}
              {formatCurrency(result.financialChange.savings)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text variant="bodyMedium">Debt Change:</Text>
            <Text
              variant="titleMedium"
              style={[
                styles.summaryValue,
                result.financialChange.debt <= 0 ? styles.positive : styles.negative,
              ]}
            >
              {result.financialChange.debt > 0 ? '+' : ''}
              {formatCurrency(result.financialChange.debt)}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.netWorthRow]}>
            <Text variant="titleMedium" style={styles.netWorthLabel}>
              Net Worth Change:
            </Text>
            <Text
              variant="headlineSmall"
              style={[
                styles.netWorthValue,
                result.financialChange.netWorth >= 0 ? styles.positive : styles.negative,
              ]}
            >
              {result.financialChange.netWorth >= 0 ? '+' : ''}
              {formatCurrency(result.financialChange.netWorth)}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="bodySmall" style={styles.statLabel}>
                Time Spent
              </Text>
              <Text variant="titleMedium">{result.duration} min</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="bodySmall" style={styles.statLabel}>
                Decisions Made
              </Text>
              <Text variant="titleMedium">{result.decisionsCount}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* What Went Well */}
      {result.strengths.length > 0 && (
        <Card style={[styles.card, styles.winCard]}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.winTitle}>
              🏆 What You Crushed
            </Text>
            <Text variant="bodySmall" style={styles.sectionSubtitle}>
              These moves were 🔥
            </Text>
            {result.strengths.map((strength, idx) => (
              <View key={idx} style={styles.listItemContainer}>
                <Text style={styles.listBullet}>✨</Text>
                <Text variant="bodyMedium" style={styles.listItemText}>
                  {strength}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* What Went Wrong */}
      {result.areasToImprove.length > 0 && (
        <Card style={[styles.card, styles.improveCard]}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.improveTitle}>
              📊 Room for Growth
            </Text>
            <Text variant="bodySmall" style={styles.sectionSubtitle}>
              Let's level up these areas next time
            </Text>
            {result.areasToImprove.map((area, idx) => (
              <View key={idx} style={styles.listItemContainer}>
                <Text style={styles.listBullet}>⚠️</Text>
                <Text variant="bodyMedium" style={styles.listItemText}>
                  {area}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Recommended Learning */}
      {result.recommendedConcepts.length > 0 && (
        <Card style={[styles.card, styles.learnCard]}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.learnTitle}>
              🎓 Level Up Your Game
            </Text>
            <Text variant="bodyMedium" style={styles.recommendationText}>
              Check out these topics to dominate next time:
            </Text>
            <View style={styles.chipsContainer}>
              {result.recommendedConcepts.map((concept, idx) => (
                <Chip key={idx} mode="outlined" style={styles.conceptChip} icon="school">
                  {concept}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          onPress={handleDone}
          style={styles.actionButton}
          contentStyle={styles.buttonContent}
        >
          Back to Dashboard
        </Button>
        <Button
          mode="outlined"
          onPress={handlePlayAgain}
          style={styles.actionButton}
          contentStyle={styles.buttonContent}
        >
          Live Another Life
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
  header: {
    padding: 32,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    color: '#e0e0e0',
    marginBottom: 4,
  },
  tagline: {
    color: '#b39ddb',
    marginTop: 8,
  },
  gradeCard: {
    margin: 16,
    backgroundColor: '#fff',
    elevation: 4,
  },
  gradeContent: {
    paddingVertical: 24,
  },
  gradeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  gradeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#e0e0e0',
  },
  grade: {
    fontWeight: 'bold',
  },
  gradeTextContainer: {
    flex: 1,
  },
  gradeTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gradeDescription: {
    color: '#666',
    lineHeight: 22,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryValue: {
    fontWeight: 'bold',
  },
  netWorthRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  netWorthLabel: {
    fontWeight: 'bold',
  },
  netWorthValue: {
    fontWeight: 'bold',
  },
  positive: {
    color: '#2e7d32',
  },
  negative: {
    color: '#d32f2f',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#666',
    marginBottom: 4,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  winCard: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
  },
  improveCard: {
    backgroundColor: '#fff3e0',
    borderLeftWidth: 4,
    borderLeftColor: '#f57c00',
  },
  learnCard: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  winTitle: {
    color: '#2e7d32',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  improveTitle: {
    color: '#f57c00',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  learnTitle: {
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  listBullet: {
    fontSize: 18,
    marginTop: 2,
  },
  listItemText: {
    flex: 1,
    lineHeight: 22,
    color: '#333',
  },
  listItem: {
    marginBottom: 8,
    lineHeight: 24,
  },
  storyItem: {
    marginBottom: 12,
    lineHeight: 24,
    color: '#444',
    paddingLeft: 8,
  },
  recommendationText: {
    color: '#666',
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conceptChip: {
    marginVertical: 4,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

