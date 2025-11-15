import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { concepts } from '../data/concepts';
import { useConceptContext } from '../contexts/ConceptContext';

export default function ConceptsScreen() {
  const navigation = useNavigation<any>();
  const { getProgress, getTotalCompleted } = useConceptContext();

  const totalCompleted = getTotalCompleted();

  const handleOpenConcept = (concept: any) => {
    navigation.navigate('ConceptDetail', { concept });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          Financial Concepts
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Master essential financial literacy topics
        </Text>
        {totalCompleted > 0 && (
          <Text variant="bodyMedium" style={styles.progressText}>
            🎉 {totalCompleted} concept{totalCompleted !== 1 ? 's' : ''} completed
          </Text>
        )}
      </View>

      <View style={styles.conceptsContainer}>
        {concepts.map((concept) => {
          const progress = getProgress(concept.id);
          const isCompleted = progress.status === 'completed';
          const isInProgress = progress.status === 'in_progress';

          return (
            <Card
              key={concept.id}
              style={[
                styles.conceptCard,
                isCompleted && styles.completedCard,
              ]}
              onPress={() => handleOpenConcept(concept)}
            >
              <Card.Content>
                <View style={styles.conceptHeader}>
                  <Text style={styles.conceptIcon}>{concept.icon}</Text>
                  <View style={styles.conceptInfo}>
                    <Text variant="titleMedium" style={styles.conceptTitle}>
                      {concept.title}
                    </Text>
                    <Text variant="bodySmall" style={styles.conceptCategory}>
                      {concept.category.charAt(0).toUpperCase() + concept.category.slice(1)} • {concept.estimatedReadTime}
                    </Text>
                  </View>
                </View>

                <View style={styles.badges}>
                  <Chip
                    mode="outlined"
                    textStyle={styles.chipText}
                    style={styles.chip}
                  >
                    {concept.difficulty}
                  </Chip>
                  {isCompleted && (
                    <Chip
                      mode="flat"
                      textStyle={styles.completedChipText}
                      style={styles.completedChip}
                    >
                      ✓ Completed
                    </Chip>
                  )}
                  {isInProgress && !isCompleted && (
                    <Chip
                      mode="flat"
                      textStyle={styles.inProgressChipText}
                      style={styles.inProgressChip}
                    >
                      In Progress
                    </Chip>
                  )}
                </View>

                {progress.quizScore !== undefined && (
                  <Text variant="bodySmall" style={styles.quizScore}>
                    Quiz Score: {progress.quizScore}%
                  </Text>
                )}
              </Card.Content>
            </Card>
          );
        })}
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
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
  },
  progressText: {
    color: '#2e7d32',
    marginTop: 8,
    fontWeight: 'bold',
  },
  conceptsContainer: {
    padding: 16,
    gap: 12,
  },
  conceptCard: {
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  completedCard: {
    backgroundColor: '#e8f5e9',
  },
  conceptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  conceptIcon: {
    fontSize: 32,
  },
  conceptInfo: {
    flex: 1,
  },
  conceptTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  conceptCategory: {
    color: '#666',
    fontSize: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    height: 28,
  },
  chipText: {
    fontSize: 11,
  },
  completedChip: {
    backgroundColor: '#c8e6c9',
    height: 28,
  },
  completedChipText: {
    color: '#2e7d32',
    fontSize: 11,
    fontWeight: 'bold',
  },
  inProgressChip: {
    backgroundColor: '#fff3e0',
    height: 28,
  },
  inProgressChipText: {
    color: '#e65100',
    fontSize: 11,
  },
  quizScore: {
    color: '#6200ee',
    marginTop: 8,
    fontWeight: 'bold',
  },
});

