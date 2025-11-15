import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Text, Card, Button, Chip, Divider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSimulationContext } from '../contexts/SimulationContext';

type SimulationScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function SimulationScreen({ navigation }: SimulationScreenProps) {
  const { 
    startNewLifeSimulation, 
    completedSimulations,
    currentSimulation,
    getTotalSimulationsCompleted,
    getAverageGrade,
    getHighestNetWorth,
  } = useSimulationContext();

  const handleStartSimulation = () => {
    startNewLifeSimulation();
    navigation.navigate('SimulationFlow');
  };

  const handleContinueSimulation = () => {
    navigation.navigate('SimulationFlow');
  };

  const totalCompleted = getTotalSimulationsCompleted();
  const avgGrade = getAverageGrade();
  const bestNetWorth = getHighestNetWorth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          Life Simulation
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Live a complete financial life from age 18 to retirement
        </Text>
      </View>

      {/* Main Life Simulation Card */}
      <View style={styles.mainContent}>
        <Card style={styles.mainCard}>
          <Card.Content>
            <View style={styles.iconContainer}>
              <Text style={styles.lifeIcon}>🌱→👤→🏆→🌅</Text>
            </View>
            
            <Text variant="headlineMedium" style={styles.cardTitle}>
              My Life Story
            </Text>
            
            <Text variant="bodyLarge" style={styles.cardDescription}>
              Experience a complete financial journey through life. Make decisions about education, career, housing, investments, and retirement. Will you become a millionaire or struggle to make ends meet?
            </Text>

            <View style={styles.featuresContainer}>
              <Text variant="titleSmall" style={styles.featuresTitle}>
                What You'll Experience:
              </Text>
              <Text variant="bodyMedium" style={styles.feature}>
                🎓 College decisions and student loans
              </Text>
              <Text variant="bodyMedium" style={styles.feature}>
                💼 Career advancement and job changes
              </Text>
              <Text variant="bodyMedium" style={styles.feature}>
                🏠 Rent vs buy and homeownership
              </Text>
              <Text variant="bodyMedium" style={styles.feature}>
                💰 Investing, retirement, and wealth building
              </Text>
              <Text variant="bodyMedium" style={styles.feature}>
                🎲 Random life events and emergencies
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text variant="labelSmall" style={styles.detailLabel}>
                  DURATION
                </Text>
                <Text variant="bodyLarge" style={styles.detailValue}>
                  20-30 min
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text variant="labelSmall" style={styles.detailLabel}>
                  AGE RANGE
                </Text>
                <Text variant="bodyLarge" style={styles.detailValue}>
                  18-85 years
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text variant="labelSmall" style={styles.detailLabel}>
                  DECISIONS
                </Text>
                <Text variant="bodyLarge" style={styles.detailValue}>
                  30-50+
                </Text>
              </View>
            </View>

            {currentSimulation && currentSimulation.status === 'active' ? (
              <Button
                mode="contained"
                onPress={handleContinueSimulation}
                style={styles.startButton}
                contentStyle={styles.buttonContent}
                icon="play"
              >
                Continue Your Life (Age {currentSimulation.currentAge})
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={handleStartSimulation}
                style={styles.startButton}
                contentStyle={styles.buttonContent}
                icon="account-plus"
              >
                Start New Life
              </Button>
            )}
          </Card.Content>
        </Card>
      </View>

      {/* Statistics Card */}
      {totalCompleted > 0 && (
        <View style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.statsTitle}>
                📊 Your Legacy
              </Text>
              <Divider style={styles.divider} />
              
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text variant="displaySmall" style={styles.statNumber}>
                    {totalCompleted}
                  </Text>
                  <Text variant="bodyMedium" style={styles.statLabel}>
                    Lives Lived
                  </Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text variant="displaySmall" style={styles.statNumber}>
                    {avgGrade}
                  </Text>
                  <Text variant="bodyMedium" style={styles.statLabel}>
                    Average Grade
                  </Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text variant="displaySmall" style={styles.statNumber}>
                    ${(bestNetWorth / 1000).toFixed(0)}K
                  </Text>
                  <Text variant="bodyMedium" style={styles.statLabel}>
                    Best Net Worth
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      )}

      {/* Tips Card */}
      <View style={styles.tipsContainer}>
        <Card style={styles.tipsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.tipsTitle}>
              💡 Pro Tips
            </Text>
            <Text variant="bodyMedium" style={styles.tip}>
              • Read educational notes after each decision to learn financial concepts
            </Text>
            <Text variant="bodyMedium" style={styles.tip}>
              • Your early decisions (education, career) compound over your lifetime
            </Text>
            <Text variant="bodyMedium" style={styles.tip}>
              • Balance enjoying life today with saving for tomorrow
            </Text>
            <Text variant="bodyMedium" style={styles.tip}>
              • Random events will test your emergency fund - be prepared!
            </Text>
          </Card.Content>
        </Card>
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
    backgroundColor: '#6200ee',
    borderBottomWidth: 1,
    borderBottomColor: '#5000d0',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  subtitle: {
    color: '#e0e0e0',
  },
  mainContent: {
    padding: 16,
  },
  mainCard: {
    backgroundColor: '#fff',
    elevation: 4,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  lifeIcon: {
    fontSize: 48,
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#6200ee',
  },
  cardDescription: {
    color: '#666',
    lineHeight: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  featuresTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  feature: {
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    color: '#999',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  detailValue: {
    color: '#333',
    fontWeight: 'bold',
  },
  startButton: {
    borderRadius: 8,
    backgroundColor: '#6200ee',
  },
  buttonContent: {
    paddingVertical: 12,
  },
  statsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  statsCard: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  statsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 4,
  },
  statLabel: {
    color: '#666',
    textAlign: 'center',
  },
  tipsContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 24,
  },
  tipsCard: {
    backgroundColor: '#e3f2fd',
  },
  tipsTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1565c0',
  },
  tip: {
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
});

