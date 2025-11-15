import { Scenario, NextScenarioParams, AnswerQuality } from '../types';

const API_BASE_URL = "https://backendpushtoprod.onrender.com";

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
    description?: string; 
  };
}

interface BackendFinancialEvent {
  event_id: string;
  event_content: string;
  hint?: string; 
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

export const initializeProfile = async (age: number, level: FrontendLiteracyLevel) => {
  const backendLevel = mapLevelToBackend(level);
  const response = await fetch(`${API_BASE_URL}/questionnaire`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      age: age,
      level: backendLevel,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to initialize profile: ${response.statusText}`);
  }

  return await response.json();
};

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

export const fetchNextQuestion = async (): Promise<BackendFinancialEvent> => {
  console.log("w3fawtgwagnawognwaeognawe[ogbaepogbaegon")
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

export const convertEventToScenario = (event: BackendFinancialEvent): Scenario => {
  const financialConcept = 'Financial Decision';
  
  const question = event.hint || event.event_content;
  
  return {
    scenario: event.event_content,
    question: question,
    options: event.options.map(opt => ({
      text: opt.content,
      outcome: opt.consequence.description || `You chose: ${opt.content}`,
    })),
    financialConcept,
  };
};

const determineAnswerQuality = (consequence: BackendOption['consequence']): AnswerQuality => {
  
  const knowledgeSum = Object.values(consequence.knowledge_delta).reduce((sum, val) => sum + val, 0);
  const traitsSum = Object.values(consequence.traits_delta).reduce((sum, val) => sum + val, 0);
  
  if (consequence.money_delta > 0 && knowledgeSum > 0 && traitsSum > 0) {
    return 'good';
  } else if (consequence.money_delta < 0 && knowledgeSum < 0 && traitsSum < 0) {
    return 'bad';
  }
  return 'neutral';
};

let currentEvent: BackendFinancialEvent | null = null;

export const fetchInitialScenario = async (): Promise<Scenario> => {
  currentEvent = await fetchNextQuestion();
  return convertEventToScenario(currentEvent);
};

export const fetchNextScenario = async (
  params: NextScenarioParams
): Promise<{ 
  scenario: Scenario; 
  analysis: { quality: AnswerQuality };
  lifeState: BackendLifeState;
}> => {
  
  if (!currentEvent) {
    throw new Error('No current event available');
  }

  const selectedOption = currentEvent.options.find(opt => opt.content === params.userAnswer);
  
  if (!selectedOption) {
    throw new Error('Selected option not found');
  }

  const lifeState = await submitAnswer(selectedOption.id, selectedOption.consequence);
  
  const quality = determineAnswerQuality(selectedOption.consequence);
  
  currentEvent = await fetchNextQuestion();
  const nextScenario = convertEventToScenario(currentEvent);
  
  return {
    scenario: nextScenario,
    analysis: { quality },
    lifeState,
  };
};

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

  const conceptIdMap: Record<string, string> = {
    'Investing': 'investing',
    'Insurance': 'insurance',
    'Retirement Planning': 'retirement',
    'Budgeting': 'budgeting',
    'Debt': 'debt',
    'Saving': 'saving',
    'Credit': 'credit',
    'Taxes': 'taxes',
  };

  const conceptsToReview = backendSummary.weakest_points.map(([name, score]) => {
    const conceptName = conceptNameMap[name] || name;
    return {
      concept: conceptName,
      description: `You scored ${score}/8 in ${conceptName}. This is an area to focus on improving.`,
      question: `What should you know about ${conceptName}?`,
      options: [
        'It\'s not important',
        'It\'s a key financial concept worth learning',
        'You can ignore it',
      ],
      correctAnswerIndex: 1,
      explanation: `Understanding ${conceptName} is important for making informed financial decisions.`,
    };
  });

  return {
    overallSummary: backendSummary.summary,
    conceptsToReview,
  };
};

