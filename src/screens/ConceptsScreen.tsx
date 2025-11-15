import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';

const CONCEPTS = [
  { title: 'Budgeting Basics', category: 'Fundamentals', difficulty: 'Beginner' },
  { title: 'Saving & Emergency Funds', category: 'Saving', difficulty: 'Beginner' },
  { title: 'Understanding Credit', category: 'Credit', difficulty: 'Intermediate' },
  { title: 'Investment Fundamentals', category: 'Investing', difficulty: 'Intermediate' },
  { title: 'Debt Management', category: 'Debt', difficulty: 'Intermediate' },
  { title: 'Retirement Planning', category: 'Planning', difficulty: 'Advanced' },
];

export default function ConceptsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          Financial Concepts
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Master essential financial literacy topics
        </Text>
      </View>

      <View style={styles.conceptsContainer}>
        {CONCEPTS.map((concept, index) => (
          <Card
            key={index}
            style={styles.conceptCard}
            onPress={() => console.log('Open concept:', concept.title)}
          >
            <Card.Content>
              <View style={styles.conceptHeader}>
                <Text variant="titleMedium" style={styles.conceptTitle}>
                  {concept.title}
                </Text>
                <Chip
                  mode="outlined"
                  textStyle={styles.chipText}
                  style={styles.chip}
                >
                  {concept.difficulty}
                </Chip>
              </View>
              <Text variant="bodySmall" style={styles.conceptCategory}>
                {concept.category}
              </Text>
            </Card.Content>
          </Card>
        ))}
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
  conceptsContainer: {
    padding: 16,
    gap: 12,
  },
  conceptCard: {
    backgroundColor: '#fff',
  },
  conceptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  conceptTitle: {
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  chip: {
    height: 28,
  },
  chipText: {
    fontSize: 11,
  },
  conceptCategory: {
    color: '#666',
  },
});

