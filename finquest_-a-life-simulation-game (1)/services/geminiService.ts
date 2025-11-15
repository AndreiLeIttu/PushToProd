import { GoogleGenAI, Type } from "@google/genai";
import { Scenario, ConceptToReview, NextScenarioParams } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseJsonResponse = <T,>(text: string, typeName: string): T => {
    try {
        const cleanText = text.replace(/^```json|```$/g, '').trim();
        return JSON.parse(cleanText) as T;
    } catch (e) {
        console.error(`Error parsing ${typeName} JSON:`, e);
        console.error("Raw text from API:", text);
        throw new Error(`The AI returned an invalid format for ${typeName}.`);
    }
}

export const fetchInitialScenario = async (): Promise<Scenario> => {
    const prompt = `You are a financial literacy game master for kids and teenagers. 
    Start a life simulation game. The user is 18 years old.
    Provide an engaging, introductory scenario and a multiple-choice question with 3 options related to a basic financial concept like saving or budgeting. 
    The user's choices will impact their financial future.
    Each option should have a 'text' for the choice and an 'outcome' describing the immediate result of that choice.
    The output MUST be a valid JSON object.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    scenario: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                text: { type: Type.STRING },
                                outcome: { type: Type.STRING },
                            },
                             required: ['text', 'outcome']
                        }
                    },
                    financialConcept: { type: Type.STRING }
                },
                required: ['scenario', 'question', 'options', 'financialConcept']
            }
        }
    });
    
    return parseJsonResponse<Scenario>(response.text, 'Scenario');
};

export const fetchNextScenario = async (params: NextScenarioParams): Promise<{ scenario: Scenario; analysis: { correct: boolean; } }> => {
    const { age, netWorth, previousScenario, userAnswer, masteredConcepts, unmasteredConcepts } = params;

    const prompt = `You are a financial literacy game master for kids and teenagers continuing a life simulation.
    
    Current Game State:
    - Age: ${age}
    - Net Worth: $${netWorth.toLocaleString()}
    - Previous Scenario: "${previousScenario.scenario} ${previousScenario.question}"
    - User's Choice: "${userAnswer}"
    - Financial Concepts Mastered: ${masteredConcepts.join(', ') || 'None'}
    - Financial Concepts to Learn: ${unmasteredConcepts.join(', ')}

    Your task has two parts:
    1.  **Analyze**: Was the user's choice the most financially sound decision?
    2.  **Generate**: Based on the game state and the user's choice, generate the next logical, age-appropriate life scenario. Focus the new scenario on one of the concepts to learn: [${unmasteredConcepts.join(', ')}]. Provide a multiple-choice question with 3 options, each with a 'text' and 'outcome'.

    The output MUST be a valid JSON object with two top-level keys: "scenario" and "analysis".
    - "scenario": The JSON object for the next scenario.
    - "analysis": A JSON object with a single boolean key "correct".`;

    const scenarioSchema = {
        type: Type.OBJECT,
        properties: {
            scenario: { type: Type.STRING },
            question: { type: Type.STRING },
            options: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        text: { type: Type.STRING },
                        outcome: { type: Type.STRING },
                    },
                     required: ['text', 'outcome']
                }
            },
            financialConcept: { type: Type.STRING }
        },
        required: ['scenario', 'question', 'options', 'financialConcept']
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    scenario: scenarioSchema,
                    analysis: {
                        type: Type.OBJECT,
                        properties: {
                            correct: { type: Type.BOOLEAN }
                        },
                        required: ['correct']
                    }
                },
                required: ['scenario', 'analysis']
            }
        }
    });

    return parseJsonResponse<{ scenario: Scenario; analysis: { correct: boolean; } }>(response.text, 'Next Scenario and Analysis');
};


export const fetchGameSummary = async (unmasteredConcepts: string[]): Promise<{ overallSummary: string; conceptsToReview: ConceptToReview[] }> => {
    if (unmasteredConcepts.length === 0) {
        return {
            overallSummary: "Congratulations! You've shown a strong grasp of all the financial concepts in this simulation. You're well on your way to becoming a financial superstar!",
            conceptsToReview: []
        }
    }

    const prompt = `You are a financial literacy expert summarizing a teenager's performance in a life simulation game.
    
    The user needs to work on the following concepts: ${unmasteredConcepts.join(', ')}.

    1. Write a brief, encouraging overall summary of their game performance.
    2. For each concept in the list, provide a review section with:
       - A simple, kid-friendly 'description'.
       - One multiple-choice 'question' to test their knowledge.
       - An array of 3 'options' (strings).
       - The 'correctAnswerIndex' (0, 1, or 2).
       - A brief 'explanation' of why the correct answer is right.

    The output MUST be a valid JSON object.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    overallSummary: { type: Type.STRING },
                    conceptsToReview: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                concept: { type: Type.STRING },
                                description: { type: Type.STRING },
                                question: { type: Type.STRING },
                                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                correctAnswerIndex: { type: Type.INTEGER },
                                explanation: { type: Type.STRING },
                            },
                            required: ['concept', 'description', 'question', 'options', 'correctAnswerIndex', 'explanation']
                        }
                    }
                },
                required: ['overallSummary', 'conceptsToReview']
            }
        }
    });

    return parseJsonResponse<{ overallSummary: string; conceptsToReview: ConceptToReview[] }>(response.text, 'Game Summary');
};