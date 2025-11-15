import { Scenario, NextScenarioParams, AnswerQuality } from '../types';

// Backend API base URL - update this to match your backend URL
// For local development: http://localhost:8000
// For production: update with your deployed backend URL
// You can also set REACT_APP_API_URL environment variable
const API_BASE_URL = (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || 'http://localhost:8000';

// Map backend Level enum to frontend LiteracyLevel
type BackendLevel = 'beginner' | 'intermediate' | 'advanced';
type FrontendLiteracyLevel = 'beginner' | 'medium' | 'advanced';

const mapLevelToBackend = (level: FrontendLiteracyLevel): BackendLevel => {
  const mapping: Record<FrontendLiteracyLevel, BackendLevel> = {
    'beginner': 'beginner',
    'medium': 'intermediate',
    'advanced': 'advanced',
  };
  return mapping[level];
};

// Backend API types
interface BackendOption {
  id: string;
  content: string;
  consequence: {
    money_delta: number;
    traits_delta: {
      self_efficacy: number;
      risk_tolerance: number;
      financial_self_control: number;
      time_preference: number;
      confidence_in_knowledge: number;
    };
    knowledge_delta: {
      investing: number;
      life_insurance: number;
      annuities: number;
      housing: number;
      retirement_savings: number;
      debt_management: number;
      diversification_of_risk: number;
      time_value_of_money: number;
      inflation: number;
      interest: number;
    };
    description: string;
  };
}

interface BackendFinancialEvent {
  event_id: string;
  event_content: string;
  options: BackendOption[];
}

interface BackendLifeState {
  game_age: number;
  balance: number;
}

interface BackendSummary {
  weakest_points: Array<[string, number]>;
  summary: string;
}

// Initialize user profile with questionnaire
export const initializeProfile = async (age: number, level: FrontendLiteracyLevel) => {
  const backendLevel = mapLevelToBackend(level);
  const response = await fetch(`${API_BASE_URL}/questionnaire?age=${age}&level=${backendLevel}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to initialize profile: ${response.statusText}`);
  }

  return await response.json();
};

// Start the game life
export const startLife = async (): Promise<BackendLifeState> => {
  const response = await fetch(`${API_BASE_URL}/start_life`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to start life: ${response.statusText}`);
  }

  return await response.json();
};

// Get next question/event from backend
export const fetchNextQuestion = async (): Promise<BackendFinancialEvent> => {
  const response = await fetch(`${API_BASE_URL}/next_question`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch next question: ${response.statusText}`);
  }

  return await response.json();
};

// Submit answer to backend
export const submitAnswer = async (
  optionId: string,
  consequence: BackendOption['consequence']
): Promise<BackendLifeState> => {
  const response = await fetch(`${API_BASE_URL}/answer_question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(consequence),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit answer: ${response.statusText}`);
  }

  return await response.json();
};

// Get game summary
export const fetchGameSummary = async (): Promise<BackendSummary> => {
  const response = await fetch(`${API_BASE_URL}/summary`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch summary: ${response.statusText}`);
  }

  return await response.json();
};

// Get current profile to access life state
export const getProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get profile: ${response.statusText}`);
  }

  return await response.json();
};

// Convert backend event to frontend scenario
export const convertEventToScenario = (event: BackendFinancialEvent): Scenario => {
  // Extract financial concept from event content or use a default
  // The backend doesn't explicitly provide this, so we'll infer it or use a default
  const financialConcept = 'Financial Decision'; // You might want to extract this from event_content
  
  return {
    scenario: event.event_content,
    question: event.event_content, // Backend combines scenario and question in event_content
    options: event.options.map(opt => ({
      text: opt.content,
      outcome: opt.consequence.description,
    })),
    financialConcept,
  };
};

// Determine answer quality based on consequence
const determineAnswerQuality = (consequence: BackendOption['consequence']): AnswerQuality => {
  // If money delta is positive and knowledge increases, it's likely a good answer
  // If money delta is negative and knowledge decreases, it's likely a bad answer
  // Otherwise, it's neutral
  
  const knowledgeSum = Object.values(consequence.knowledge_delta).reduce((sum, val) => sum + val, 0);
  const traitsSum = Object.values(consequence.traits_delta).reduce((sum, val) => sum + val, 0);
  
  if (consequence.money_delta > 0 && knowledgeSum > 0 && traitsSum > 0) {
    return 'good';
  } else if (consequence.money_delta < 0 && knowledgeSum < 0 && traitsSum < 0) {
    return 'bad';
  }
  return 'neutral';
};

// Store current event to track which option was selected
let currentEvent: BackendFinancialEvent | null = null;

// Fetch initial scenario (converts backend event to frontend scenario)
export const fetchInitialScenario = async (): Promise<Scenario> => {
  currentEvent = await fetchNextQuestion();
  return convertEventToScenario(currentEvent);
};

// Fetch next scenario with answer analysis
export const fetchNextScenario = async (
  params: NextScenarioParams
): Promise<{ 
  scenario: Scenario; 
  analysis: { quality: AnswerQuality };
  lifeState: BackendLifeState;
}> => {
  // This is called after an answer is submitted, so we need to:
  // 1. Find the selected option from the current event
  // 2. Submit the answer
  // 3. Get the next question
  
  if (!currentEvent) {
    throw new Error('No current event available');
  }

  // Find the selected option by matching the answer text
  const selectedOption = currentEvent.options.find(opt => opt.content === params.userAnswer);
  
  if (!selectedOption) {
    throw new Error('Selected option not found');
  }

  // Submit the answer and get updated life state
  const lifeState = await submitAnswer(selectedOption.id, selectedOption.consequence);
  
  // Determine answer quality
  const quality = determineAnswerQuality(selectedOption.consequence);
  
  // Get the next question
  currentEvent = await fetchNextQuestion();
  const nextScenario = convertEventToScenario(currentEvent);
  
  return {
    scenario: nextScenario,
    analysis: { quality },
    lifeState,
  };
};

// Convert backend summary to frontend format
export const convertSummaryToFrontend = (backendSummary: BackendSummary): {
  overallSummary: string;
  conceptsToReview: Array<{
    concept: string;
    description: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }>;
} => {
  // Map backend knowledge categories to frontend concept names
  const conceptNameMap: Record<string, string> = {
    'investing': 'Investing',
    'life_insurance': 'Insurance',
    'annuities': 'Retirement Planning',
    'housing': 'Budgeting',
    'retirement_savings': 'Retirement Planning',
    'debt_management': 'Debt',
    'diversification_of_risk': 'Investing',
    'time_value_of_money': 'Saving',
    'inflation': 'Saving',
    'interest': 'Credit',
  };

  const conceptsToReview = backendSummary.weakest_points.map(([name, score]) => ({
    concept: conceptNameMap[name] || name,
    description: `You scored ${score}/8 in ${conceptNameMap[name] || name}. This is an area to focus on improving.`,
    question: `What should you know about ${conceptNameMap[name] || name}?`,
    options: [
      'It\'s not important',
      'It\'s a key financial concept worth learning',
      'You can ignore it',
    ],
    correctAnswerIndex: 1,
    explanation: `Understanding ${conceptNameMap[name] || name} is important for making informed financial decisions.`,
  }));

  return {
    overallSummary: backendSummary.summary,
    conceptsToReview,
  };
};

