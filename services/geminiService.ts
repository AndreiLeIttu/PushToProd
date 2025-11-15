import { Scenario, ConceptToReview, NextScenarioParams, AnswerQuality } from '../types';

// Mock data for testing without API
// Simulate a delay to make it feel more realistic
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const conceptMap: Record<string, string> = {
  'budgeting': 'Budgeting',
  'saving': 'Saving',
  'investing': 'Investing',
  'credit': 'Credit',
  'debt': 'Debt',
  'retirement': 'Retirement',
  'insurance': 'Insurance',
  'taxes': 'Taxes',
};

export const fetchInitialScenario = async (studiedConcepts: string[] = []): Promise<Scenario> => {
    await delay(800); // Simulate API call delay
    
    // Use first studied concept or default to Budgeting
    const firstConcept = studiedConcepts.length > 0 
      ? conceptMap[studiedConcepts[0]] || 'Budgeting'
      : 'Budgeting';
    
    return {
        scenario: "Welcome to FinQuest! You're 18 years old and just graduated high school. You've received $1,000 as a graduation gift from your family. This is your first real money to manage!",
        question: "What should you do with this $1,000?",
        options: [
            {
                text: "Spend it all on a new gaming setup",
                outcome: "You buy the latest gaming console and games. It's fun, but your money is gone."
            },
            {
                text: "Save it in a savings account",
                outcome: "You open a savings account and deposit the money. It's safe and will earn a small amount of interest."
            },
            {
                text: "Split it: save $700 and spend $300 on something you want",
                outcome: "You save most of it but also treat yourself. This balanced approach helps you learn to manage money."
            }
        ],
        financialConcept: firstConcept
    };
};

export const fetchNextScenario = async (params: NextScenarioParams): Promise<{ scenario: Scenario; analysis: { quality: AnswerQuality } }> => {
    const { age, netWorth, previousScenario, userAnswer, masteredConcepts, unmasteredConcepts, studiedConcepts } = params;

    await delay(800); // Simulate API call delay
    
    // Helper function to determine answer quality
    const getAnswerQuality = (answer: string, goodKeywords: string[], badKeywords: string[]): AnswerQuality => {
        const lowerAnswer = answer.toLowerCase();
        if (badKeywords.some(keyword => lowerAnswer.includes(keyword.toLowerCase()))) {
            return 'bad';
        }
        if (goodKeywords.some(keyword => lowerAnswer.includes(keyword.toLowerCase()))) {
            return 'good';
        }
        return 'neutral';
    };
    
    // Mock scenarios based on age
    const scenarios: Record<number, { scenario: Scenario; analysis: { quality: AnswerQuality } }> = {
        23: {
            scenario: {
                scenario: `You're now ${age} years old and working part-time while in college. You've managed to save some money and your net worth is $${netWorth.toLocaleString()}. Your friends are all getting credit cards and encouraging you to get one too.`,
                question: "What should you do about getting a credit card?",
                options: [
                    {
                        text: "Get a credit card and use it for everything",
                        outcome: "You get a card and start using it freely. You're building credit but also accumulating debt."
                    },
                    {
                        text: "Avoid credit cards completely",
                        outcome: "You decide to stick with cash only. You avoid debt but miss out on building credit history."
                    },
                    {
                        text: "Get one credit card and use it responsibly, paying it off each month",
                        outcome: "You get a card and use it for small purchases, always paying the full balance. You're building good credit!"
                    }
                ],
                financialConcept: "Credit"
            },
            analysis: { 
                quality: getAnswerQuality(
                    userAnswer,
                    ["responsibly", "paying it off", "pay off", "full balance"],
                    ["use it for everything", "everything"]
                )
            }
        },
        28: {
            scenario: {
                scenario: `You're ${age} years old and have been working full-time for a few years. Your net worth is $${netWorth.toLocaleString()}. You're thinking about your future and retirement seems far away.`,
                question: "Should you start saving for retirement now?",
                options: [
                    {
                        text: "Wait until you're older and making more money",
                        outcome: "You decide to wait. Retirement can wait, right?"
                    },
                    {
                        text: "Start investing a small amount in a retirement account",
                        outcome: "You open a retirement account and start contributing. Time is on your side!"
                    },
                    {
                        text: "Focus only on saving cash in a bank account",
                        outcome: "You keep everything in savings. It's safe but won't grow much over time."
                    }
                ],
                financialConcept: "Investing"
            },
            analysis: { 
                quality: getAnswerQuality(
                    userAnswer,
                    ["investing", "retirement account", "retirement"],
                    ["wait", "older"]
                )
            }
        },
        33: {
            scenario: {
                scenario: `At ${age}, you're established in your career. Your net worth is $${netWorth.toLocaleString()}. You're considering buying a car, and you have two options: a reliable used car or a flashy new one.`,
                question: "Which car should you buy?",
                options: [
                    {
                        text: "Buy the new car - you deserve it!",
                        outcome: "You buy the new car with a loan. It's nice but the payments are high."
                    },
                    {
                        text: "Buy a reliable used car with cash",
                        outcome: "You buy a good used car without taking on debt. Smart financial move!"
                    },
                    {
                        text: "Lease a new car - lower monthly payments",
                        outcome: "You lease a car. The payments are manageable but you don't own anything."
                    }
                ],
                financialConcept: "Debt"
            },
            analysis: { 
                quality: getAnswerQuality(
                    userAnswer,
                    ["used car", "cash"],
                    ["new car", "deserve it", "lease"]
                )
            }
        },
        38: {
            scenario: {
                scenario: `You're ${age} and your net worth is $${netWorth.toLocaleString()}. You're thinking about buying a house. The real estate market is competitive, and you're not sure if you're ready.`,
                question: "What's your approach to buying a home?",
                options: [
                    {
                        text: "Buy the biggest house you can afford",
                        outcome: "You stretch your budget to buy a large house. The mortgage is high but you have space."
                    },
                    {
                        text: "Save for a larger down payment first",
                        outcome: "You wait and save more. A larger down payment means lower monthly payments."
                    },
                    {
                        text: "Buy now with a small down payment - prices are rising!",
                        outcome: "You buy quickly with minimal down payment. You're a homeowner but have little equity."
                    }
                ],
                financialConcept: "Saving"
            },
            analysis: { 
                quality: getAnswerQuality(
                    userAnswer,
                    ["save", "down payment", "larger"],
                    ["biggest house", "stretch"]
                )
            }
        },
        43: {
            scenario: {
                scenario: `You're ${age} years old with a net worth of $${netWorth.toLocaleString()}. You have some extra money and are thinking about what to do with it.`,
                question: "How should you handle this extra money?",
                options: [
                    {
                        text: "Invest it all in one stock you heard about",
                        outcome: "You put everything in one stock. High risk, high reward potential."
                    },
                    {
                        text: "Diversify across different investments",
                        outcome: "You spread your money across stocks, bonds, and other investments. Smart diversification!"
                    },
                    {
                        text: "Keep it all in a savings account",
                        outcome: "You keep it safe in savings. Very low risk but minimal growth."
                    }
                ],
                financialConcept: "Investing"
            },
            analysis: { 
                quality: getAnswerQuality(
                    userAnswer,
                    ["diversify", "different investments", "spread"],
                    ["one stock", "all in one"]
                )
            }
        },
        48: {
            scenario: {
                scenario: `You're ${age} and your net worth is $${netWorth.toLocaleString()}. You're thinking about your children's education and your own retirement.`,
                question: "How do you prioritize saving?",
                options: [
                    {
                        text: "Focus only on kids' education",
                        outcome: "You save for education but neglect your own retirement savings."
                    },
                    {
                        text: "Balance both - save for education and retirement",
                        outcome: "You create a plan to save for both. You're thinking long-term!"
                    },
                    {
                        text: "Focus only on your retirement",
                        outcome: "You prioritize retirement. Your kids can get loans, but you need to retire."
                    }
                ],
                financialConcept: "Saving"
            },
            analysis: { 
                quality: getAnswerQuality(
                    userAnswer,
                    ["balance", "both", "education and retirement"],
                    ["only on kids", "only on retirement", "neglect"]
                )
            }
        },
        53: {
            scenario: {
                scenario: `You're ${age} years old with $${netWorth.toLocaleString()} in net worth. Retirement is getting closer, and you're reviewing your financial plan.`,
                question: "What should you focus on now?",
                options: [
                    {
                        text: "Take more risks to grow wealth faster",
                        outcome: "You increase risk in your portfolio. Could pay off, but also risky."
                    },
                    {
                        text: "Start shifting to more conservative investments",
                        outcome: "You begin to protect what you've built. Smart move as retirement approaches."
                    },
                    {
                        text: "Stop saving - you have enough",
                        outcome: "You stop contributing. You might be okay, but it's risky."
                    }
                ],
                financialConcept: "Investing"
            },
            analysis: { 
                quality: getAnswerQuality(
                    userAnswer,
                    ["conservative", "protect", "shift"],
                    ["more risks", "stop saving", "enough"]
                )
            }
        },
        58: {
            scenario: {
                scenario: `You're ${age} and almost ready to retire. Your net worth is $${netWorth.toLocaleString()}. You're making final financial decisions.`,
                question: "What's your retirement strategy?",
                options: [
                    {
                        text: "Retire immediately and enjoy life",
                        outcome: "You retire now. Hope you have enough saved!"
                    },
                    {
                        text: "Create a detailed retirement budget and plan",
                        outcome: "You carefully plan your retirement spending. You're prepared!"
                    },
                    {
                        text: "Keep working forever - you love your job",
                        outcome: "You decide to keep working. That's fine if it makes you happy."
                    }
                ],
                financialConcept: "Budgeting"
            },
            analysis: { 
                quality: getAnswerQuality(
                    userAnswer,
                    ["budget", "plan", "strategy"],
                    ["immediately", "enough"]
                )
            }
        },
        63: {
            scenario: {
                scenario: `You're ${age} years old with $${netWorth.toLocaleString()} in net worth. You're in your early retirement years.`,
                question: "How do you manage your retirement funds?",
                options: [
                    {
                        text: "Withdraw as much as you want - you earned it!",
                        outcome: "You withdraw freely. Hope it lasts!"
                    },
                    {
                        text: "Follow the 4% rule - withdraw 4% annually",
                        outcome: "You follow a sustainable withdrawal strategy. Your money should last."
                    },
                    {
                        text: "Don't touch it - live off Social Security only",
                        outcome: "You're very conservative. Your savings grow but you live frugally."
                    }
                ],
                financialConcept: "Budgeting"
            },
            analysis: { 
                quality: getAnswerQuality(
                    userAnswer,
                    ["4%", "sustainable", "withdraw", "rule"],
                    ["as much as you want", "freely"]
                )
            }
        }
    };
    
    // Get scenario for current age, or use a default one
    const scenarioData = scenarios[age] || scenarios[23];
    
    return {
        scenario: scenarioData.scenario,
        analysis: { quality: scenarioData.analysis.quality }
    };
};


export const fetchGameSummary = async (unmasteredConcepts: string[]): Promise<{ overallSummary: string; conceptsToReview: ConceptToReview[] }> => {
    await delay(800); // Simulate API call delay
    
    if (unmasteredConcepts.length === 0) {
        return {
            overallSummary: "Congratulations! You've shown a strong grasp of all the financial concepts in this simulation. You made smart financial decisions throughout your life journey. You're well on your way to becoming a financial superstar!",
            conceptsToReview: []
        }
    }

    // Mock concept reviews
    const conceptReviews: Record<string, ConceptToReview> = {
        "Budgeting": {
            concept: "Budgeting",
            description: "Budgeting is creating a plan for how you'll spend your money. It helps you make sure you have enough for the things you need and want.",
            question: "What is the best way to create a budget?",
            options: [
                "Spend money first, then see what's left",
                "Track your income and expenses, then plan your spending",
                "Don't budget at all - just spend when you need things"
            ],
            correctAnswerIndex: 1,
            explanation: "A good budget starts by understanding how much money you have (income) and how much you spend (expenses). Then you can plan how to allocate your money wisely."
        },
        "Saving": {
            concept: "Saving",
            description: "Saving means putting money aside for future use. It's important to save for emergencies, big purchases, and long-term goals like retirement.",
            question: "How much of your income should you try to save?",
            options: [
                "Nothing - spend everything you earn",
                "At least 10-20% of your income",
                "Save only when you have extra money left over"
            ],
            correctAnswerIndex: 1,
            explanation: "Financial experts recommend saving at least 10-20% of your income. This helps you build an emergency fund and work toward your financial goals."
        },
        "Investing": {
            concept: "Investing",
            description: "Investing means using your money to buy assets (like stocks, bonds, or real estate) that can grow in value over time. It's riskier than saving but can help your money grow faster.",
            question: "What is a key principle of investing?",
            options: [
                "Put all your money in one investment",
                "Diversify - spread your money across different investments",
                "Only invest in things you understand completely"
            ],
            correctAnswerIndex: 1,
            explanation: "Diversification is important because it spreads risk. If one investment loses value, others might gain, helping protect your overall portfolio."
        },
        "Credit": {
            concept: "Credit",
            description: "Credit is the ability to borrow money with a promise to pay it back later. Credit cards and loans are forms of credit. Good credit helps you get better rates on loans.",
            question: "What's the best way to use a credit card?",
            options: [
                "Use it for everything and pay the minimum payment",
                "Use it for small purchases and pay the full balance each month",
                "Never use credit cards - they're always bad"
            ],
            correctAnswerIndex: 1,
            explanation: "Using a credit card responsibly (paying the full balance each month) helps you build good credit without paying interest or accumulating debt."
        },
        "Debt": {
            concept: "Debt",
            description: "Debt is money you owe to someone else. While some debt (like a mortgage) can be useful, too much debt can be stressful and expensive due to interest payments.",
            question: "When is it okay to take on debt?",
            options: [
                "For anything you want right now",
                "For essential things like education or a home, when you can afford the payments",
                "Never - debt is always bad"
            ],
            correctAnswerIndex: 1,
            explanation: "Some debt can be beneficial (like student loans for education or a mortgage for a home), but only if you can afford the payments and it helps you build wealth over time."
        }
    };

    const conceptsToReview = unmasteredConcepts
        .filter(concept => conceptReviews[concept])
        .map(concept => conceptReviews[concept]);

    return {
        overallSummary: `Great job completing your financial journey! You've learned a lot about managing money through different stages of life. You still have some areas to work on: ${unmasteredConcepts.join(', ')}. Keep learning and practicing these concepts - financial literacy is a lifelong journey!`,
        conceptsToReview
    };
};