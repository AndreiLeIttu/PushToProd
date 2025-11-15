import AsyncStorage from '@react-native-async-storage/async-storage';
import { Simulation, SimulationResult } from '../types/simulation';

// Local Storage Utilities using AsyncStorage
// Phase 1, Step 1.5

const STORAGE_KEYS = {
  SIMULATIONS: '@finlearn:simulations',
  SIMULATION_RESULTS: '@finlearn:simulation_results',
  USER_PREFERENCES: '@finlearn:preferences',
};

// ========== Simulations ==========

export const saveSimulation = async (simulation: Simulation): Promise<void> => {
  try {
    const simulations = await getAllSimulations();
    const existingIndex = simulations.findIndex(s => s.id === simulation.id);
    
    if (existingIndex >= 0) {
      simulations[existingIndex] = simulation;
    } else {
      simulations.push(simulation);
    }
    
    await AsyncStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(simulations));
  } catch (error) {
    console.error('Error saving simulation:', error);
    throw error;
  }
};

export const getAllSimulations = async (): Promise<Simulation[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SIMULATIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting simulations:', error);
    return [];
  }
};

export const getSimulationById = async (id: string): Promise<Simulation | null> => {
  try {
    const simulations = await getAllSimulations();
    return simulations.find(s => s.id === id) || null;
  } catch (error) {
    console.error('Error getting simulation:', error);
    return null;
  }
};

export const getCompletedSimulations = async (): Promise<Simulation[]> => {
  try {
    const simulations = await getAllSimulations();
    return simulations.filter(s => s.status === 'completed');
  } catch (error) {
    console.error('Error getting completed simulations:', error);
    return [];
  }
};

export const deleteSimulation = async (id: string): Promise<void> => {
  try {
    const simulations = await getAllSimulations();
    const filtered = simulations.filter(s => s.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting simulation:', error);
    throw error;
  }
};

// ========== Simulation Results ==========

export const saveSimulationResult = async (result: SimulationResult): Promise<void> => {
  try {
    const results = await getAllSimulationResults();
    results.push(result);
    await AsyncStorage.setItem(STORAGE_KEYS.SIMULATION_RESULTS, JSON.stringify(results));
  } catch (error) {
    console.error('Error saving simulation result:', error);
    throw error;
  }
};

export const getAllSimulationResults = async (): Promise<SimulationResult[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SIMULATION_RESULTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting simulation results:', error);
    return [];
  }
};

// ========== User Preferences ==========

interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  notificationsEnabled?: boolean;
  soundEnabled?: boolean;
}

export const saveUserPreferences = async (preferences: UserPreferences): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences:', error);
    throw error;
  }
};

export const getUserPreferences = async (): Promise<UserPreferences> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error getting preferences:', error);
    return {};
  }
};

// ========== Utility Functions ==========

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.SIMULATIONS,
      STORAGE_KEYS.SIMULATION_RESULTS,
      STORAGE_KEYS.USER_PREFERENCES,
    ]);
    console.log('All data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};

export const getStorageInfo = async (): Promise<{
  simulationsCount: number;
  resultsCount: number;
  completedCount: number;
}> => {
  try {
    const simulations = await getAllSimulations();
    const results = await getAllSimulationResults();
    const completed = simulations.filter(s => s.status === 'completed');
    
    return {
      simulationsCount: simulations.length,
      resultsCount: results.length,
      completedCount: completed.length,
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return {
      simulationsCount: 0,
      resultsCount: 0,
      completedCount: 0,
    };
  }
};

