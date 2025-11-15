import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, ProgressBar, Card } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useSimulationContext } from '../contexts/SimulationContext';
import DecisionCard from '../components/DecisionCard';
import FinancialDashboard from '../components/FinancialDashboard';
import { getStageInfo } from '../data/stageScenarios';

// Simulation Flow Screen - Stage-based progression
// Complete scenarios in each life stage before advancing

type SimulationFlowScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
};

// Helper to format life stage display
const getLifeStageDisplay = (stage: string): string => {
  const stages: Record<string, string> = {
    'childhood': '👶 Childhood',
    'teenager': '🎒 Teenage Years',
    'young-adult': '🎓 Young Adult',
    'adult': '💼 Adulthood',
    'middle-age': '🏆 Middle Age',
    'senior': '🌅 Senior Years',
    'elderly': '👴 Elderly',
  };
  return stages[stage] || stage;
};

export default function SimulationFlowScreen({ navigation }: SimulationFlowScreenProps) {
  const {
    currentSimulation,
    currentDecisionIndex,
    makeDecision,
    getCurrentDecision,
    isSimulationComplete,
  } = useSimulationContext();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);

  const currentDecision = getCurrentDecision();
  
  // Get current stage info
  const currentStageInfo = currentSimulation ? getStageInfo(currentSimulation.currentLifeStage) : null;
  const currentStageProgress = currentSimulation 
    ? currentSimulation.stageProgress.find(p => p.stage === currentSimulation.currentLifeStage)
    : null;
  
  // Calculate stage progress
  const stageProgressPercent = currentStageProgress 
    ? (currentStageProgress.scenariosCompleted / currentStageProgress.totalScenarios)
    : 0;

  useEffect(() => {
    if (isSimulationComplete()) {
      // Navigate to results screen
      navigation.navigate('SimulationResult');
    }
  }, [currentDecisionIndex, isSimulationComplete, navigation]);

  useEffect(() => {
    // Reset state when decision changes
    setSelectedOption(null);
    setShowOutcome(false);
  }, [currentDecisionIndex]);

  if (!currentSimulation || !currentDecision) {
    return (
      <View style={styles.container}>
        <Text>Loading simulation...</Text>
      </View>
    );
  }

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleConfirmDecision = () => {
    if (!selectedOption) {
      Alert.alert('Please select an option', 'You need to choose one of the options to continue.');
      return;
    }

    const option = currentDecision.options.find(o => o.id === selectedOption);
    if (!option) return;

    // Show outcome first
    setShowOutcome(true);
  };

  const handleContinue = () => {
    if (!selectedOption) return;
    
    makeDecision(currentDecision.id, selectedOption);
    setShowOutcome(false);
    setSelectedOption(null);
  };

  const selectedOptionData = currentDecision.options.find(o => o.id === selectedOption);

  return (
    <ScrollView style={styles.container}>
      {/* Age and Life Stage Header */}
      <View style={styles.lifeStageContainer}>
        <View style={styles.ageDisplay}>
          <Text variant="displaySmall" style={styles.ageText}>
            Age {currentSimulation.currentAge}
          </Text>
          <Text variant="titleMedium" style={styles.lifeStageText}>
            {currentStageInfo?.displayName || getLifeStageDisplay(currentSimulation.currentLifeStage)}
          </Text>
        </View>
        
        {/* Stage Progress */}
        {currentStageProgress && (
          <View style={styles.stageProgressContainer}>
            <View style={styles.stageProgressHeader}>
              <Text variant="bodyMedium" style={styles.stageProgressText}>
                Scenario {currentStageProgress.scenariosCompleted + 1} of {currentStageProgress.totalScenarios}
              </Text>
              <Text variant="bodySmall" style={styles.ageRangeText}>
                {currentStageInfo?.ageRange} years
              </Text>
            </View>
            <ProgressBar progress={stageProgressPercent} style={styles.stageProgressBar} />
          </View>
        )}
      </View>

      {/* Financial Dashboard */}
      <FinancialDashboard
        savings={currentSimulation.currentSavings}
        income={currentSimulation.currentIncome}
        expenses={currentSimulation.currentExpenses}
        debt={currentSimulation.currentDebt}
      />

      {!showOutcome ? (
        <>
          {/* Decision Prompt */}
          <View style={styles.promptContainer}>
            <Text variant="headlineSmall" style={styles.prompt}>
              {currentDecision.prompt}
            </Text>
            {currentDecision.description && (
              <Text variant="bodyMedium" style={styles.description}>
                {currentDecision.description}
              </Text>
            )}
          </View>

          {/* Decision Options - MCQ Style */}
          <View style={styles.optionsContainer}>
            <Text variant="labelMedium" style={styles.chooseLabel}>
              Choose your move: 👇
            </Text>
            {currentDecision.options.map((option, idx) => {
              const letters = ['A', 'B', 'C', 'D', 'E'];
              return (
                <DecisionCard
                  key={option.id}
                  option={option}
                  selected={selectedOption === option.id}
                  onSelect={() => handleSelectOption(option.id)}
                  optionLetter={letters[idx]}
                />
              );
            })}
          </View>

          {/* Confirm Button - More Prominent */}
          <View style={styles.buttonContainer}>
            {!selectedOption && (
              <Text variant="bodyMedium" style={styles.helperText}>
                👆 Select an option above to continue
              </Text>
            )}
            {selectedOption && (
              <Text variant="bodyMedium" style={styles.readyText}>
                ✓ Option selected! Ready to lock it in?
              </Text>
            )}
            <Button
              mode="contained"
              onPress={handleConfirmDecision}
              disabled={!selectedOption}
              style={[styles.confirmButton, selectedOption && styles.confirmButtonActive]}
              contentStyle={styles.buttonContent}
              icon={selectedOption ? "check-circle" : "lock"}
            >
              {selectedOption ? "Lock In My Choice 🔒" : "Select an option first"}
            </Button>
          </View>
        </>
      ) : (
        <>
          {/* Outcome Display */}
          <View style={styles.outcomeContainer}>
            <Text variant="headlineSmall" style={styles.outcomeTitle}>
              Outcome
            </Text>
            <Text variant="bodyLarge" style={styles.outcomeText}>
              {selectedOptionData?.outcome}
            </Text>

            {selectedOptionData?.educationalNote && (
              <Card style={styles.educationalCard}>
                <Card.Content>
                  <Text variant="labelMedium" style={styles.educationalLabel}>
                    💡 Did you know?
                  </Text>
                  <Text variant="bodyMedium" style={styles.educationalText}>
                    {selectedOptionData.educationalNote}
                  </Text>
                </Card.Content>
              </Card>
            )}
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <Text variant="bodyMedium" style={styles.continueText}>
              Ready to move forward? ⏭️
            </Text>
            <Button
              mode="contained"
              onPress={handleContinue}
              style={styles.continueButton}
              contentStyle={styles.buttonContent}
              icon="arrow-right-bold"
            >
              Continue to Next Event ▶️
            </Button>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  lifeStageContainer: {
    padding: 20,
    backgroundColor: '#6200ee',
  },
  ageDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ageText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 48,
  },
  lifeStageText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 4,
  },
  stageProgressContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  stageProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stageProgressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ageRangeText: {
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },
  stageProgressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  promptContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  prompt: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#666',
  },
  optionsContainer: {
    padding: 16,
  },
  chooseLabel: {
    marginBottom: 12,
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
  },
  helperText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  readyText: {
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  continueText: {
    textAlign: 'center',
    color: '#6200ee',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  confirmButton: {
    borderRadius: 12,
    elevation: 2,
  },
  confirmButtonActive: {
    elevation: 8,
    backgroundColor: '#6200ee',
  },
  continueButton: {
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#6200ee',
  },
  buttonContent: {
    paddingVertical: 12,
  },
  outcomeContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  outcomeTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6200ee',
  },
  outcomeText: {
    marginBottom: 16,
    lineHeight: 24,
  },
  educationalCard: {
    backgroundColor: '#e3f2fd',
    marginTop: 8,
  },
  educationalLabel: {
    color: '#1976d2',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  educationalText: {
    color: '#333',
    lineHeight: 22,
  },
});

