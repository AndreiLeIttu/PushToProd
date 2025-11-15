// Simulation Type Definitions - BitLife Style Life Simulation
// Refactored for complete life progression from birth to death

export type LifeStage = 
  | 'childhood'      // 0-12
  | 'teenager'       // 13-17
  | 'young-adult'    // 18-25
  | 'adult'          // 26-40
  | 'middle-age'     // 41-60
  | 'senior'         // 61-80
  | 'elderly';       // 81+

export type SimulationStatus = 'active' | 'completed' | 'deceased';

export type EventCategory = 
  | 'education'
  | 'career'
  | 'housing'
  | 'savings'
  | 'debt'
  | 'investment'
  | 'expenses'
  | 'relationship'
  | 'health'
  | 'random';

export interface FinancialImpact {
  savings?: number;
  income?: number;
  expenses?: number;
  debt?: number;
  description?: string;
}

export interface Option {
  id: string;
  text: string;
  financialImpact: FinancialImpact;
  outcome: string;
  educationalNote?: string;
  ageImpact?: number; // How many years this decision advances
}

export interface Decision {
  id: string;
  age: number; // Age when this decision was made
  prompt: string;
  description?: string;
  options: Option[];
  timestamp: Date;
  chosen: Option | null;
  category?: EventCategory;
}

export interface LifeEvent {
  id: string;
  title: string;
  prompt: string;
  description?: string;
  minAge: number;
  maxAge: number;
  category: EventCategory;
  probability?: number; // 0-1, for random events
  options: Omit<Option, 'ageImpact'>[] & { ageImpact?: number }[];
  lifeStage: LifeStage[];
  isRequired?: boolean; // Must happen in life progression
  prerequisite?: {
    minSavings?: number;
    minIncome?: number;
    hasDebt?: boolean;
    hasJob?: boolean;
  };
}

export interface LifeStageProgress {
  stage: LifeStage;
  scenariosCompleted: number;
  totalScenarios: number;
  isCompleted: boolean;
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  currentAge: number;
  maxAge: number; // Age at which simulation ends (death or chosen end point)
  currentSavings: number;
  currentIncome: number;
  currentExpenses: number;
  currentDebt: number;
  currentLifeStage: LifeStage;
  currentStageScenarioIndex: number; // Which scenario in current stage
  stageProgress: LifeStageProgress[]; // Track progress through each stage
  decisions: Decision[];
  status: SimulationStatus;
  startDate: Date;
  completedDate?: Date;
  initialState: {
    age: number;
    savings: number;
    income: number;
    expenses: number;
    debt: number;
  };
  // Additional life tracking
  hasJob: boolean;
  hasHouse: boolean;
  education: 'none' | 'high-school' | 'college' | 'graduate';
}

export interface ScenarioTemplate {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  initialState: {
    age: number;
    savings: number;
    income: number;
    expenses: number;
    debt: number;
    stage: LifeStage;
  };
  decisions: Omit<Decision, 'timestamp' | 'chosen' | 'age'>[];
  learningObjectives: string[];
}

export interface SimulationResult {
  simulationId: string;
  title: string;
  duration: number; // in minutes
  ageReached: number;
  decisionsCount: number;
  financialChange: {
    savings: number;
    debt: number;
    netWorth: number;
  };
  finalStats: {
    totalIncome: number;
    totalExpenses: number;
    peakNetWorth: number;
  };
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  strengths: string[];
  areasToImprove: string[];
  recommendedConcepts: string[];
  completedDate: Date;
  lifeStory: string[]; // Key highlights from their life
}

