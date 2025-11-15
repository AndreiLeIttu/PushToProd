import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

export default function DashboardScreen() {
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
              0%
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
              0
            </Text>
            <Text variant="bodySmall" style={styles.statDescription}>
              Completed
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="labelMedium" style={styles.statLabel}>
              Concepts
            </Text>
            <Text variant="displaySmall" style={styles.statValue}>
              0
            </Text>
            <Text variant="bodySmall" style={styles.statDescription}>
              Mastered
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.actionsContainer}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Quick Actions
        </Text>
        <Button
          mode="contained"
          onPress={() => console.log('Start simulation')}
          style={styles.actionButton}
          contentStyle={styles.actionButtonContent}
        >
          Start New Simulation
        </Button>
        <Button
          mode="outlined"
          onPress={() => console.log('Browse concepts')}
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

