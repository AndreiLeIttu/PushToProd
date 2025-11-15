import { useState, useCallback } from 'react';
import { Simulation, Decision, SimulationResult, LifeStage, LifeStageProgress } from '../types/simulation';
import { stageBasedScenarios, getScenariosForStage } from '../data/stageScenarios';

// Custom hook for managing stage-based life simulation
// Each life stage has multiple scenarios that must be completed

export const useSimulation = () => {
  const [currentSimulation, setCurrentSimulation] = useState<Simulation | null>(null);
  const [currentDecisionIndex, setCurrentDecisionIndex] = useState<number>(0);

  // Initialize stage progress for all stages
  const initializeStageProgress = (): LifeStageProgress[] => {
    return stageBasedScenarios.map(stageData => ({
      stage: stageData.stage,
      scenariosCompleted: 0,
      totalScenarios: stageData.scenarios.length,
      isCompleted: false,
    }));
  };

  // Initialize a new life simulation starting from teenager stage
  const startLifeSimulation = useCallback((): Simulation => {
    const firstStage: LifeStage = 'teenager';
    const stageProgress = initializeStageProgress();
    
    const newSimulation: Simulation = {
      id: `life_sim_${Date.now()}`,
      title: 'My Life Story',
      description: 'A complete financial life simulation from teenager to retirement',
      currentAge: 14,
      maxAge: 85,
      currentSavings: 0,
      currentIncome: 0,
      currentExpenses: 0,
      currentDebt: 0,
      currentLifeStage: firstStage,
      currentStageScenarioIndex: 0,
      stageProgress,
      decisions: [],
      status: 'active',
      startDate: new Date(),
      initialState: {
        age: 14,
        savings: 0,
        income: 0,
        expenses: 0,
        debt: 0,
      },
      hasJob: false,
      hasHouse: false,
      education: 'none',
    };

    setCurrentSimulation(newSimulation);
    setCurrentDecisionIndex(0);
    return newSimulation;
  }, []);

  // Get the current decision/event to display
  const getCurrentDecision = useCallback((): Decision | null => {
    if (!currentSimulation) return null;
    
    // Get scenarios for current life stage
    const currentStageScenarios = getScenariosForStage(currentSimulation.currentLifeStage);
    
    // Check if we've completed all scenarios in current stage
    if (currentSimulation.currentStageScenarioIndex >= currentStageScenarios.length) {
      return null; // Stage complete, need to advance
    }
    
    // Get the current scenario
    const currentScenario = currentStageScenarios[currentSimulation.currentStageScenarioIndex];
    
    // Convert LifeEvent to Decision
    const newDecision: Decision = {
      id: currentScenario.id,
      age: currentSimulation.currentAge,
      prompt: currentScenario.prompt,
      description: currentScenario.description,
      options: currentScenario.options,
      timestamp: new Date(),
      chosen: null,
      category: currentScenario.category,
    };
    
    return newDecision;
  }, [currentSimulation]);

  // Get next life stage in sequence
  const getNextLifeStage = (currentStage: LifeStage): LifeStage | null => {
    const stageOrder: LifeStage[] = ['teenager', 'young-adult', 'adult', 'middle-age', 'senior', 'elderly'];
    const currentIndex = stageOrder.indexOf(currentStage);
    return currentIndex < stageOrder.length - 1 ? stageOrder[currentIndex + 1] : null;
  };

  // Make a decision and progress through scenarios
  const makeDecision = useCallback((decisionId: string, optionId: string) => {
    if (!currentSimulation) return;

    const currentDecision = getCurrentDecision();
    if (!currentDecision || currentDecision.id !== decisionId) return;

    const option = currentDecision.options.find(o => o.id === optionId);
    if (!option) return;

    // Create the decision record
    const completedDecision: Decision = {
      ...currentDecision,
      chosen: option,
      timestamp: new Date(),
      age: currentSimulation.currentAge,
    };

    // Calculate age progression (default 1 year if not specified)
    const ageIncrease = option.ageImpact || 1;
    const newAge = currentSimulation.currentAge + ageIncrease;

    // Apply financial impacts
    const newSavings = Math.max(0, currentSimulation.currentSavings + (option.financialImpact.savings || 0));
    const newIncome = Math.max(0, currentSimulation.currentIncome + (option.financialImpact.income || 0));
    const newExpenses = Math.max(0, currentSimulation.currentExpenses + (option.financialImpact.expenses || 0));
    const newDebt = Math.max(0, currentSimulation.currentDebt + (option.financialImpact.debt || 0));

    // Update job and education status
    const hasJob = newIncome > 10000;
    let education = currentSimulation.education;
    if (option.id.includes('college') || option.id.includes('university')) {
      education = 'college';
    } else if (option.id.includes('trade')) {
      education = 'high-school';
    }

    // Move to next scenario in current stage
    const currentStageScenarios = getScenariosForStage(currentSimulation.currentLifeStage);
    const nextScenarioIndex = currentSimulation.currentStageScenarioIndex + 1;

    // Update stage progress
    const updatedStageProgress = currentSimulation.stageProgress.map(progress => {
      if (progress.stage === currentSimulation.currentLifeStage) {
        const completed = progress.scenariosCompleted + 1;
        return {
          ...progress,
          scenariosCompleted: completed,
          isCompleted: completed >= progress.totalScenarios,
        };
      }
      return progress;
    });

    // Check if we need to advance to next life stage
    let newLifeStage = currentSimulation.currentLifeStage;
    let newStageScenarioIndex = nextScenarioIndex;

    if (nextScenarioIndex >= currentStageScenarios.length) {
      // Current stage complete, move to next stage
      const nextStage = getNextLifeStage(currentSimulation.currentLifeStage);
      if (nextStage) {
        newLifeStage = nextStage;
        newStageScenarioIndex = 0;
      }
    }

    // Check if simulation should end
    const isDeceased = newAge >= currentSimulation.maxAge || newLifeStage === null;
    const newStatus = isDeceased ? 'completed' : 'active';

    // Update simulation state
    const updatedSimulation: Simulation = {
      ...currentSimulation,
      currentAge: newAge,
      currentLifeStage: newLifeStage || currentSimulation.currentLifeStage,
      currentStageScenarioIndex: newStageScenarioIndex,
      stageProgress: updatedStageProgress,
      currentSavings: newSavings,
      currentIncome: newIncome,
      currentExpenses: newExpenses,
      currentDebt: newDebt,
      hasJob,
      education,
      decisions: [...currentSimulation.decisions, completedDecision],
      status: newStatus as any,
    };

    setCurrentSimulation(updatedSimulation);
    setCurrentDecisionIndex(currentDecisionIndex + 1);
  }, [currentSimulation, currentDecisionIndex, getCurrentDecision]);

  // Check if simulation is complete
  const isComplete = useCallback((): boolean => {
    if (!currentSimulation) return false;
    
    // Check if status is completed
    if (currentSimulation.status === 'completed') return true;
    
    // Check if all stages are completed
    const allStagesComplete = currentSimulation.stageProgress.every(p => p.isCompleted);
    return allStagesComplete;
  }, [currentSimulation]);

  // Complete the simulation and calculate results
  const completeSimulation = useCallback((): SimulationResult | null => {
    if (!currentSimulation) return null;

    const duration = Math.floor(
      (new Date().getTime() - currentSimulation.startDate.getTime()) / 1000 / 60
    );

    const decisionsCount = currentSimulation.decisions.length;
    const ageReached = currentSimulation.currentAge;

    const netWorth = currentSimulation.currentSavings - currentSimulation.currentDebt;
    const initialNetWorth = currentSimulation.initialState.savings - currentSimulation.initialState.debt;

    const financialChange = {
      savings: currentSimulation.currentSavings - currentSimulation.initialState.savings,
      debt: currentSimulation.currentDebt - currentSimulation.initialState.debt,
      netWorth: netWorth - initialNetWorth,
    };

    // Calculate lifetime income and expenses
    const totalIncome = currentSimulation.decisions.reduce((sum, decision) => {
      return sum + (decision.chosen?.financialImpact.income || 0);
    }, currentSimulation.initialState.income);

    const totalExpenses = currentSimulation.decisions.reduce((sum, decision) => {
      return sum + Math.abs(decision.chosen?.financialImpact.expenses || 0);
    }, currentSimulation.initialState.expenses);

    // Grading based on net worth at end of life
    let grade: 'A' | 'B' | 'C' | 'D' | 'F' = 'C';
    if (netWorth > 1000000) grade = 'A'; // Millionaire!
    else if (netWorth > 500000) grade = 'B'; // Very comfortable
    else if (netWorth > 100000) grade = 'C'; // Comfortable
    else if (netWorth > 0) grade = 'D'; // Made it but tight
    else grade = 'F'; // Ended in debt

    // Analyze strengths and areas to improve
    const strengths: string[] = [];
    const areasToImprove: string[] = [];
    const recommendedConcepts: string[] = [];

    if (netWorth > 500000) {
      strengths.push('Built substantial wealth over lifetime');
      strengths.push('Excellent long-term financial planning');
    }

    if (currentSimulation.currentDebt === 0) {
      strengths.push('Died debt-free - great job!');
    } else {
      areasToImprove.push('Debt management - ended life with debt');
      recommendedConcepts.push('Debt Payoff Strategies');
    }

    if (currentSimulation.currentSavings < 50000 && ageReached > 60) {
      areasToImprove.push('Retirement savings - insufficient for retirement');
      recommendedConcepts.push('Retirement Planning 101');
    }

    if (totalIncome < 2000000) {
      areasToImprove.push('Career advancement - could have earned more');
      recommendedConcepts.push('Career Development');
    }

    // Generate life story highlights
    const lifeStory: string[] = [];
    lifeStory.push(`Started life at age ${currentSimulation.initialState.age}`);
    
    // Add key life decisions to story
    currentSimulation.decisions.forEach(decision => {
      if (decision.chosen && (decision.category === 'education' || decision.category === 'career' || decision.category === 'housing')) {
        lifeStory.push(`Age ${decision.age}: ${decision.prompt.substring(0, 50)}...`);
      }
    });
    
    lifeStory.push(`Reached age ${ageReached} with $${netWorth.toLocaleString()} net worth`);

    // Mark simulation as completed
    const completedSimulation: Simulation = {
      ...currentSimulation,
      status: 'completed',
      completedDate: new Date(),
    };
    setCurrentSimulation(completedSimulation);

    return {
      simulationId: currentSimulation.id,
      title: currentSimulation.title,
      duration,
      ageReached,
      decisionsCount,
      financialChange,
      finalStats: {
        totalIncome,
        totalExpenses,
        peakNetWorth: netWorth, // Could track this throughout if needed
      },
      grade,
      strengths,
      areasToImprove,
      recommendedConcepts,
      completedDate: new Date(),
      lifeStory,
    };
  }, [currentSimulation]);

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setCurrentSimulation(null);
    setCurrentDecisionIndex(0);
    setCompletedEventIds([]);
  }, []);

  return {
    currentSimulation,
    currentDecisionIndex,
    startSimulation: startLifeSimulation, // Renamed for clarity
    makeDecision,
    getCurrentDecision,
    isComplete,
    completeSimulation,
    resetSimulation,
  };
};

