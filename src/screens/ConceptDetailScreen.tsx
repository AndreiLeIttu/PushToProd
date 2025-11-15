import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Chip } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Concept } from '../types/concept';
import { useConceptContext } from '../contexts/ConceptContext';

// Concept Detail Screen
// Phase 2, Step 2.3

type ConceptDetailScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: { concept: Concept } }>;
};

export default function ConceptDetailScreen({ navigation, route }: ConceptDetailScreenProps) {
  const { concept } = route.params as { concept: Concept };
  const { getProgress, updateProgress } = useConceptContext();
  const progress = getProgress(concept.id);

  useEffect(() => {
    // Mark as in progress when opened
    if (progress.status === 'not_started') {
      updateProgress(concept.id, { status: 'in_progress' });
    }

    // Track time spent
    const startTime = Date.now();
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      updateProgress(concept.id, {
        timeSpent: progress.timeSpent + timeSpent,
      });
    };
  }, []);

  const handleTakeQuiz = () => {
    navigation.navigate('ConceptQuiz', { concept });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.icon}>{concept.icon}</Text>
          <View style={styles.badges}>
            <Chip mode="outlined" textStyle={styles.chipText}>
              {concept.difficulty}
            </Chip>
            <Chip mode="outlined" textStyle={styles.chipText}>
              {concept.category}
            </Chip>
          </View>
        </View>
        <Text variant="headlineMedium" style={styles.title}>
          {concept.title}
        </Text>
        <Text variant="bodyMedium" style={styles.readTime}>
          📖 {concept.estimatedReadTime}
        </Text>
      </View>

      {/* Summary */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Summary
          </Text>
          <Text variant="bodyLarge" style={styles.summaryText}>
            {concept.content.summary}
          </Text>
        </Card.Content>
      </Card>

      {/* What Is It */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            What Is It?
          </Text>
          <Text variant="bodyMedium" style={styles.bodyText}>
            {concept.content.whatIsIt}
          </Text>
        </Card.Content>
      </Card>

      {/* Why It Matters */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Why It Matters
          </Text>
          <Text variant="bodyMedium" style={styles.bodyText}>
            {concept.content.whyItMatters}
          </Text>
        </Card.Content>
      </Card>

      {/* How To Apply */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            How To Apply
          </Text>
          <Text variant="bodyMedium" style={styles.bodyText}>
            {concept.content.howToApply}
          </Text>
        </Card.Content>
      </Card>

      {/* Examples */}
      {concept.content.examples.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Real Examples
            </Text>
            {concept.content.examples.map((example, idx) => (
              <View key={idx} style={styles.example}>
                <Text variant="titleSmall" style={styles.exampleTitle}>
                  {example.title}
                </Text>
                <Text variant="bodyMedium" style={styles.exampleText}>
                  {example.description}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Common Mistakes */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            ⚠️ Common Mistakes to Avoid
          </Text>
          {concept.content.commonMistakes.map((mistake, idx) => (
            <Text key={idx} variant="bodyMedium" style={styles.listItem}>
              • {mistake}
            </Text>
          ))}
        </Card.Content>
      </Card>

      {/* Key Takeaways */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            ✨ Key Takeaways
          </Text>
          {concept.content.keyTakeaways.map((takeaway, idx) => (
            <Text key={idx} variant="bodyMedium" style={styles.listItem}>
              • {takeaway}
            </Text>
          ))}
        </Card.Content>
      </Card>

      {/* Quiz Button */}
      <View style={styles.quizContainer}>
        <Button
          mode="contained"
          onPress={handleTakeQuiz}
          style={styles.quizButton}
          contentStyle={styles.buttonContent}
        >
          {progress.quizAttempts > 0 ? 'Retake Quiz' : 'Test Your Knowledge'}
        </Button>
        {progress.quizScore !== undefined && (
          <Text variant="bodySmall" style={styles.previousScore}>
            Previous score: {progress.quizScore}%
          </Text>
        )}
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
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 48,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  chipText: {
    fontSize: 11,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  readTime: {
    color: '#666',
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
    color: '#6200ee',
  },
  summaryText: {
    lineHeight: 24,
    fontWeight: '500',
  },
  bodyText: {
    lineHeight: 24,
    color: '#333',
  },
  example: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  exampleTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exampleText: {
    color: '#333',
    lineHeight: 22,
  },
  listItem: {
    marginBottom: 8,
    lineHeight: 24,
    color: '#333',
  },
  quizContainer: {
    padding: 24,
    alignItems: 'center',
  },
  quizButton: {
    borderRadius: 8,
    width: '100%',
  },
  buttonContent: {
    paddingVertical: 12,
  },
  previousScore: {
    marginTop: 12,
    color: '#666',
  },
});

