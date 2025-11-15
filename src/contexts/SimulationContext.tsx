import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Simulation, SimulationResult } from '../types/simulation';
import { useSimulation } from '../hooks/useSimulation';
import * as storage from '../lib/storage';

// Simulation Context for BitLife-style life simulation
// Refactored for complete life progression

type SimulationContextType = {
  // Current active simulation
  currentSimulation: Simulation | null;
  currentDecisionIndex: number;
  
  // Simulation history
  completedSimulations: Simulation[];
  simulationResults: SimulationResult[];
  
  // Loading state
  isLoading: boolean;
  
  // Actions
  startNewLifeSimulation: () => void;
  makeDecision: (decisionId: string, optionId: string) => void;
  getCurrentDecision: () => any;
  isSimulationComplete: () => boolean;
  completeSimulation: () => SimulationResult | null;
  resetSimulation: () => void;
  
  // Statistics
  getTotalSimulationsCompleted: () => number;
  getAverageGrade: () => string;
  getHighestNetWorth: () => number;
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const simulation = useSimulation();
  const [completedSimulations, setCompletedSimulations] = useState<Simulation[]>([]);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data on mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Save simulation whenever it changes
  useEffect(() => {
    if (simulation.currentSimulation) {
      storage.saveSimulation(simulation.currentSimulation).catch(console.error);
    }
  }, [simulation.currentSimulation]);

  const loadSavedData = async () => {
    try {
      setIsLoading(true);
      const [savedSimulations, savedResults] = await Promise.all([
        storage.getCompletedSimulations(),
        storage.getAllSimulationResults(),
      ]);
      
      setCompletedSimulations(savedSimulations);
      setSimulationResults(savedResults);
    } catch (error) {
      console.error('Error loading saved data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewLifeSimulation = () => {
    const newSim = simulation.startSimulation();
    console.log('Started new life simulation:', newSim.title);
  };

  const handleCompleteSimulation = (): SimulationResult | null => {
    const result = simulation.completeSimulation();
    
    if (result && simulation.currentSimulation) {
      // Add to completed list
      const updatedCompletedSims = [...completedSimulations, simulation.currentSimulation];
      const updatedResults = [...simulationResults, result];
      
      setCompletedSimulations(updatedCompletedSims);
      setSimulationResults(updatedResults);
      
      // Save to storage
      storage.saveSimulation(simulation.currentSimulation).catch(console.error);
      storage.saveSimulationResult(result).catch(console.error);
      
      console.log('Life simulation completed:', result);
    }
    
    return result;
  };

  const getTotalSimulationsCompleted = (): number => {
    return completedSimulations.length;
  };

  const getAverageGrade = (): string => {
    if (simulationResults.length === 0) return 'N/A';
    
    const gradeValues: Record<string, number> = {
      'A': 4.0,
      'B': 3.0,
      'C': 2.0,
      'D': 1.0,
      'F': 0.0,
    };
    
    const sum = simulationResults.reduce((acc, result) => {
      return acc + gradeValues[result.grade];
    }, 0);
    
    const avg = sum / simulationResults.length;
    
    if (avg >= 3.5) return 'A';
    if (avg >= 2.5) return 'B';
    if (avg >= 1.5) return 'C';
    if (avg >= 0.5) return 'D';
    return 'F';
  };

  const getHighestNetWorth = (): number => {
    if (simulationResults.length === 0) return 0;
    
    return Math.max(...simulationResults.map(result => 
      result.financialChange.netWorth
    ));
  };

  return (
    <SimulationContext.Provider
      value={{
        currentSimulation: simulation.currentSimulation,
        currentDecisionIndex: simulation.currentDecisionIndex,
        completedSimulations,
        simulationResults,
        isLoading,
        startNewLifeSimulation,
        makeDecision: simulation.makeDecision,
        getCurrentDecision: simulation.getCurrentDecision,
        isSimulationComplete: simulation.isComplete,
        completeSimulation: handleCompleteSimulation,
        resetSimulation: simulation.resetSimulation,
        getTotalSimulationsCompleted,
        getAverageGrade,
        getHighestNetWorth,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulationContext() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulationContext must be used within a SimulationProvider');
  }
  return context;
}

