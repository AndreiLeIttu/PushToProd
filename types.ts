
export type GameState = 'quiz' | 'start' | 'concepts' | 'playing' | 'loading' | 'end' | 'error';
export type LiteracyLevel = 'beginner' | 'medium' | 'advanced';

export interface PlayerStats {
  age: number;
  netWorth: number;
}

export interface Scenario {
  question: string;
  options: { text: string; outcome: string; moneyDelta?: number; }[];
  financialConcept: string;
  hint: string;
}

export interface ConceptToReview {
  concept: string;
  description: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface NextScenarioParams {
  age: number;
  netWorth: number;
  previousScenario: Scenario;
  userAnswer: string;
  masteredConcepts: string[];
  unmasteredConcepts: string[];
  studiedConcepts: string[];
}

export type AnswerQuality = 'good' | 'neutral' | 'bad';

export interface GameGrade {
  score: number;
  percentage: number;
  letterGrade: string;
  totalQuestions: number;
  goodAnswers: number;
  neutralAnswers: number;
  badAnswers: number;
}
