import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSimulationContext } from '../contexts/SimulationContext';
import { useConceptContext } from '../contexts/ConceptContext';

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const { getTotalSimulationsCompleted, getAverageGrade } = useSimulationContext();
  const { getTotalCompleted: getConceptsCompleted } = useConceptContext();

  const simulationsCompleted = getTotalSimulationsCompleted();
  const conceptsCompleted = getConceptsCompleted();
  const averageGrade = getAverageGrade();
  const progress = (simulationsCompleted + conceptsCompleted) > 0 
    ? Math.min(((simulationsCompleted + conceptsCompleted) / 12) * 100, 100) 
    : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          Your Dashboard
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Track your financial literacy journey
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="labelMedium" style={styles.statLabel}>
              Progress
            </Text>
            <Text variant="displaySmall" style={styles.statValue}>
              {Math.round(progress)}%
            </Text>
            <Text variant="bodySmall" style={styles.statDescription}>
              Overall Progress
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="labelMedium" style={styles.statLabel}>
              Simulations
            </Text>
            <Text variant="displaySmall" style={styles.statValue}>
              {simulationsCompleted}
            </Text>
            <Text variant="bodySmall" style={styles.statDescription}>
              Completed
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="labelMedium" style={styles.statLabel}>
              Concepts Learned
            </Text>
            <Text variant="displaySmall" style={styles.statValue}>
              {conceptsCompleted}
            </Text>
            <Text variant="bodySmall" style={styles.statDescription}>
              Mastered
            </Text>
          </Card.Content>
        </Card>
      </View>

      {simulationsCompleted === 0 && (
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.welcomeTitle}>
              Welcome to FinLearn! 👋
            </Text>
            <Text variant="bodyMedium" style={styles.welcomeText}>
              Ready to start your financial literacy journey? Begin with your first simulation to learn how everyday decisions impact your finances.
            </Text>
          </Card.Content>
        </Card>
      )}

      <View style={styles.actionsContainer}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Quick Actions
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('SimulationTab')}
          style={styles.actionButton}
          contentStyle={styles.actionButtonContent}
        >
          Start New Simulation
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('ConceptsTab')}
          style={styles.actionButton}
          contentStyle={styles.actionButtonContent}
        >
          Browse Concepts
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
  statsContainer: {
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#fff',
  },
  statLabel: {
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 4,
  },
  statDescription: {
    color: '#999',
  },
  welcomeCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#e3f2fd',
  },
  welcomeTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1976d2',
  },
  welcomeText: {
    color: '#333',
    lineHeight: 22,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actionButton: {
    borderRadius: 8,
  },
  actionButtonContent: {
    paddingVertical: 8,
  },
});

