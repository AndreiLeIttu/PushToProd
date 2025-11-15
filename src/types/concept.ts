// Concept Type Definitions
// Phase 2, Step 2.1

export type ConceptCategory = 
  | 'budgeting' 
  | 'saving' 
  | 'credit' 
  | 'investing' 
  | 'debt'
  | 'insurance'
  | 'taxes'
  | 'retirement';

export type ConceptDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type QuizQuestionType = 'multiple-choice' | 'true-false';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuizQuestionType;
  options: QuizOption[];
  explanation: string;
  points: number;
}

export interface ConceptContent {
  summary: string;
  whatIsIt: string;
  whyItMatters: string;
  howToApply: string;
  commonMistakes: string[];
  examples: {
    title: string;
    description: string;
  }[];
  keyTakeaways: string[];
  relatedConcepts: string[]; // IDs of related concepts
}

export interface Concept {
  id: string;
  title: string;
  slug: string;
  category: ConceptCategory;
  difficulty: ConceptDifficulty;
  estimatedReadTime: string; // e.g., "5 min"
  content: ConceptContent;
  quiz: QuizQuestion[];
  icon?: string; // emoji or icon name
}

export interface ConceptProgress {
  conceptId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  quizScore?: number;
  quizAttempts: number;
  lastAccessed?: Date;
  completedDate?: Date;
  timeSpent: number; // in seconds
}

export interface ConceptWithProgress extends Concept {
  progress: ConceptProgress;
}

