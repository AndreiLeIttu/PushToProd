import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SimulationScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          Life Simulation
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Experience real financial decisions
        </Text>
      </View>

      <Card style={styles.mainCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.cardTitle}>
            Ready to Start Your Financial Journey?
          </Text>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            Experience real-life financial decisions in a safe, educational environment.
            Your choices will shape your simulated life story.
          </Text>

          <View style={styles.steps}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text variant="titleMedium" style={styles.stepNumberText}>
                  1
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.stepText}>
                Make financial decisions at key life moments
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text variant="titleMedium" style={styles.stepNumberText}>
                  2
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.stepText}>
                See how your choices impact your life story
              </Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text variant="titleMedium" style={styles.stepNumberText}>
                  3
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.stepText}>
                Get personalized concept recommendations
              </Text>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={() => console.log('Begin simulation')}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Begin Simulation
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.historyCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.historyTitle}>
            Previous Simulations
          </Text>
          <Text variant="bodyMedium" style={styles.historyEmpty}>
            No simulations completed yet. Start your first one above!
          </Text>
        </Card.Content>
      </Card>
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
  mainCard: {
    margin: 16,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardDescription: {
    color: '#666',
    marginBottom: 24,
  },
  steps: {
    gap: 16,
    marginBottom: 24,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    color: '#333',
  },
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  historyCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#fff',
  },
  historyTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyEmpty: {
    color: '#999',
  },
});

