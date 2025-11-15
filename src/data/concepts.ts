import { Concept } from '../types/concept';

// Financial Concepts Library
// Phase 2, Step 2.2

export const concepts: Concept[] = [
  // ========== BUDGETING ==========
  {
    id: 'budgeting-basics',
    title: 'Budgeting Basics',
    slug: 'budgeting-basics',
    category: 'budgeting',
    difficulty: 'beginner',
    estimatedReadTime: '5 min',
    icon: '📊',
    content: {
      summary: 'A budget is a plan for your money that tracks income and expenses, helping you make informed spending decisions and reach financial goals.',
      whatIsIt: 'Budgeting is the process of creating a plan for how you\'ll spend your money each month. It involves tracking your income (money coming in) and expenses (money going out) to ensure you\'re living within your means and saving for the future.',
      whyItMatters: 'Without a budget, it\'s easy to overspend and wonder where your money went. A budget gives you control over your finances, reduces stress, helps you save for goals, and prevents debt. Studies show people who budget save 3x more than those who don\'t.',
      howToApply: '1. List all sources of income (after taxes)\n2. Track all expenses for a month\n3. Categorize expenses (needs, wants, savings)\n4. Compare income to expenses\n5. Adjust spending to meet your goals\n6. Review and update monthly',
      commonMistakes: [
        'Being too restrictive - budgets should be realistic',
        'Forgetting irregular expenses like car insurance or gifts',
        'Not tracking small daily purchases',
        'Giving up after one bad month',
        'Not leaving room for fun and flexibility',
      ],
      examples: [
        {
          title: 'Monthly Budget Example',
          description: 'Income: $4,000/month\nNeeds (50%): $2,000 (rent, food, utilities, transportation)\nWants (30%): $1,200 (entertainment, dining out, hobbies)\nSavings (20%): $800 (emergency fund, retirement, goals)',
        },
        {
          title: 'Unexpected Expense',
          description: 'Car repair costs $600. Without a budget, this might go on a credit card. With a budget that includes an "irregular expenses" category, you have the cash ready.',
        },
      ],
      keyTakeaways: [
        'A budget is a plan, not a restriction',
        'Track actual spending to understand your habits',
        'Adjust your budget monthly as life changes',
        'Pay yourself first by budgeting for savings',
        'Even a simple budget is better than no budget',
      ],
      relatedConcepts: ['50-30-20-rule', 'emergency-fund-basics', 'tracking-expenses'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the primary purpose of a budget?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'To restrict all spending and live miserably',
            isCorrect: false,
            explanation: 'A budget should enable your goals, not make you miserable.',
          },
          {
            id: 'b',
            text: 'To plan how you\'ll spend your money and reach financial goals',
            isCorrect: true,
            explanation: 'Correct! A budget is a plan that helps you control your money and achieve your goals.',
          },
          {
            id: 'c',
            text: 'To impress your friends with financial spreadsheets',
            isCorrect: false,
            explanation: 'A budget is for you, not for showing off!',
          },
          {
            id: 'd',
            text: 'Only necessary if you\'re poor',
            isCorrect: false,
            explanation: 'Everyone benefits from budgeting, regardless of income level.',
          },
        ],
        explanation: 'A budget is fundamentally about planning and control - giving every dollar a purpose so you can achieve your financial goals.',
      },
      {
        id: 'q2',
        question: 'True or False: You should wait until you have a perfect budget before starting.',
        type: 'true-false',
        points: 10,
        options: [
          {
            id: 'true',
            text: 'True',
            isCorrect: false,
            explanation: 'Don\'t wait for perfection! Start with a simple budget and improve it over time.',
          },
          {
            id: 'false',
            text: 'False',
            isCorrect: true,
            explanation: 'Correct! Start with a simple budget today and refine it as you learn your spending patterns.',
          },
        ],
        explanation: 'The best budget is the one you actually use. Start simple, track your spending, and improve your budget over time. Perfection is the enemy of progress.',
      },
    ],
  },

  {
    id: '50-30-20-rule',
    title: 'The 50/30/20 Budget Rule',
    slug: '50-30-20-rule',
    category: 'budgeting',
    difficulty: 'beginner',
    estimatedReadTime: '4 min',
    icon: '📊',
    content: {
      summary: 'A simple budgeting framework: spend 50% on needs, 30% on wants, and save 20% for the future.',
      whatIsIt: 'The 50/30/20 rule is a straightforward budgeting method popularized by Senator Elizabeth Warren. It divides your after-tax income into three categories: 50% for needs (essentials), 30% for wants (non-essentials), and 20% for savings and debt repayment.',
      whyItMatters: 'This rule provides a balanced approach to budgeting that works for most people. It ensures you cover essentials, enjoy life, and build wealth - all without complex spreadsheets or restrictive rules.',
      howToApply: '1. Calculate your after-tax monthly income\n2. Allocate 50% to needs: rent, utilities, groceries, insurance, minimum debt payments\n3. Allocate 30% to wants: dining out, entertainment, hobbies, subscriptions\n4. Allocate 20% to savings: emergency fund, retirement, extra debt payments, investments\n5. Adjust percentages if needed based on your situation',
      commonMistakes: [
        'Confusing wants with needs (premium cable is a want, not a need)',
        'Not counting minimum debt payments as needs',
        'Being too rigid - adjust percentages for your situation',
        'Forgetting to calculate after-tax income',
        'Not saving anything if the 20% goal feels impossible',
      ],
      examples: [
        {
          title: '$4,000/month Income Example',
          description: 'Needs (50%): $2,000 for rent, utilities, groceries, car payment, insurance\nWants (30%): $1,200 for dining out, Netflix, gym, hobbies\nSavings (20%): $800 split between emergency fund and retirement',
        },
        {
          title: 'High Cost of Living Adjustment',
          description: 'If you live in an expensive city, you might do 60/20/20 temporarily while you work on increasing income or reducing housing costs.',
        },
      ],
      keyTakeaways: [
        'Simple framework that\'s easy to remember and follow',
        'Balances enjoying today with preparing for tomorrow',
        'Adjust percentages based on your situation',
        'If 20% savings feels impossible, start with 10%',
        'Review and adjust every few months',
      ],
      relatedConcepts: ['budgeting-basics', 'emergency-fund-basics', 'needs-vs-wants'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'According to the 50/30/20 rule, where should minimum credit card payments go?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'In the 30% wants category',
            isCorrect: false,
            explanation: 'Debt payments are obligations, not wants.',
          },
          {
            id: 'b',
            text: 'In the 50% needs category',
            isCorrect: true,
            explanation: 'Correct! Minimum debt payments are essential obligations and go in the needs category.',
          },
          {
            id: 'c',
            text: 'In the 20% savings category',
            isCorrect: false,
            explanation: 'Only EXTRA debt payments above minimums go in the 20% category.',
          },
        ],
        explanation: 'Minimum debt payments are obligations you must pay, so they\'re needs. Extra payments to pay down debt faster go in the 20% savings/debt category.',
      },
      {
        id: 'q2',
        question: 'If you earn $5,000/month after taxes, how much should you save according to 50/30/20?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: '$500',
            isCorrect: false,
            explanation: 'That\'s only 10%, not 20%.',
          },
          {
            id: 'b',
            text: '$1,000',
            isCorrect: true,
            explanation: 'Correct! 20% of $5,000 is $1,000.',
          },
          {
            id: 'c',
            text: '$1,500',
            isCorrect: false,
            explanation: 'That\'s 30%, which is the wants category.',
          },
          {
            id: 'd',
            text: '$2,500',
            isCorrect: false,
            explanation: 'That\'s 50%, which is the needs category.',
          },
        ],
        explanation: 'Simply multiply your after-tax income by 0.20 to get your savings target.',
      },
    ],
  },

  // ========== SAVING ==========
  {
    id: 'emergency-fund-basics',
    title: 'Emergency Fund Essentials',
    slug: 'emergency-fund-basics',
    category: 'saving',
    difficulty: 'beginner',
    estimatedReadTime: '6 min',
    icon: '🛡️',
    content: {
      summary: 'An emergency fund is savings set aside for unexpected expenses, typically 3-6 months of living expenses.',
      whatIsIt: 'An emergency fund is money saved specifically for life\'s unexpected events: job loss, medical emergencies, car repairs, home repairs, etc. It sits in a separate, easily accessible savings account and is only used for true emergencies.',
      whyItMatters: 'Without an emergency fund, unexpected expenses force you to use credit cards, take out loans, or raid retirement accounts. This creates a cycle of debt and financial stress. An emergency fund breaks this cycle and provides peace of mind.',
      howToApply: '1. Calculate your monthly expenses\n2. Set a goal: 3 months for stable job, 6 months for unstable\n3. Start with $1,000 as a mini emergency fund\n4. Save consistently until you reach your goal\n5. Keep it in a high-yield savings account\n6. Only use for true emergencies\n7. Replenish after using it',
      commonMistakes: [
        'Not having one at all (40% of Americans can\'t cover a $400 emergency)',
        'Keeping it in checking where it\'s too easy to spend',
        'Using it for non-emergencies like vacations',
        'Investing it in stocks (too risky for emergency money)',
        'Waiting until it\'s "fully funded" to celebrate - $1,000 is already huge progress!',
      ],
      examples: [
        {
          title: 'Job Loss Protection',
          description: 'Sarah lost her job unexpectedly. With 6 months of expenses ($15,000) saved, she could focus on finding the right job rather than taking the first offer out of desperation. She found a better position in 4 months.',
        },
        {
          title: 'Medical Emergency',
          description: 'Mike needed emergency dental surgery costing $2,500. His emergency fund covered it completely. Without it, he would have charged it to a credit card at 19% interest, ultimately paying $3,137.',
        },
        {
          title: 'Car Breakdown',
          description: 'Emma\'s car needed a $1,200 repair to pass inspection. Her emergency fund handled it without disrupting her budget or creating debt.',
        },
      ],
      keyTakeaways: [
        'Start with a $1,000 mini emergency fund',
        'Build to 3-6 months of expenses over time',
        'Keep it liquid in a high-yield savings account',
        'Don\'t invest emergency fund money',
        'Replenish it after using it',
        'True emergencies only - not vacations!',
      ],
      relatedConcepts: ['budgeting-basics', 'high-yield-savings', 'insurance-basics'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'How much should a typical emergency fund cover?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: '1 month of expenses',
            isCorrect: false,
            explanation: 'Too little - most emergencies require more time/money.',
          },
          {
            id: 'b',
            text: '3-6 months of expenses',
            isCorrect: true,
            explanation: 'Correct! This gives you enough cushion for most emergencies including job loss.',
          },
          {
            id: 'c',
            text: '2 years of expenses',
            isCorrect: false,
            explanation: 'That\'s excessive - money sitting that long should be invested.',
          },
          {
            id: 'd',
            text: 'Whatever you can manage',
            isCorrect: false,
            explanation: 'While something is better than nothing, 3-6 months is the recommended target.',
          },
        ],
        explanation: '3-6 months is the sweet spot: enough to cover most emergencies, but not so much that you\'re missing out on investment returns.',
      },
      {
        id: 'q2',
        question: 'Where should you keep your emergency fund?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'In the stock market for higher returns',
            isCorrect: false,
            explanation: 'Too risky! When you need emergency money, the market might be down 30%.',
          },
          {
            id: 'b',
            text: 'In a high-yield savings account',
            isCorrect: true,
            explanation: 'Correct! Liquid, safe, and earns some interest while being immediately accessible.',
          },
          {
            id: 'c',
            text: 'Under your mattress in cash',
            isCorrect: false,
            explanation: 'Unsafe and earns no interest. Plus inflation slowly erodes the value.',
          },
          {
            id: 'd',
            text: 'In your regular checking account',
            isCorrect: false,
            explanation: 'Too easy to accidentally spend. Keep it separate so you\'re not tempted.',
          },
        ],
        explanation: 'High-yield savings accounts offer the perfect balance: immediate access when needed, FDIC insurance for safety, and some interest to fight inflation.',
      },
      {
        id: 'q3',
        question: 'True or False: A vacation counts as an emergency for emergency fund use.',
        type: 'true-false',
        points: 10,
        options: [
          {
            id: 'true',
            text: 'True',
            isCorrect: false,
            explanation: 'Vacations should be planned and saved for separately!',
          },
          {
            id: 'false',
            text: 'False',
            isCorrect: true,
            explanation: 'Correct! Emergency funds are for unexpected, necessary expenses only. Save for vacations separately.',
          },
        ],
        explanation: 'True emergencies are unexpected and necessary: job loss, medical bills, car repairs, home repairs. Vacations, holidays, and planned purchases should have their own savings category.',
      },
    ],
  },

  {
    id: 'tracking-expenses',
    title: 'Tracking Your Spending',
    slug: 'tracking-expenses',
    category: 'budgeting',
    difficulty: 'beginner',
    estimatedReadTime: '4 min',
    icon: '📝',
    content: {
      summary: 'Tracking expenses means recording what you spend to understand your habits and make better financial decisions.',
      whatIsIt: 'Expense tracking is the practice of recording every purchase you make. This can be done manually in a notebook, with a spreadsheet, or using apps. The goal is to know exactly where your money goes each month.',
      whyItMatters: 'Most people underestimate their spending by 20-30%. You can\'t improve what you don\'t measure. Tracking reveals hidden spending patterns, identifies waste, and empowers you to make conscious choices about your money.',
      howToApply: '1. Choose a tracking method (app, spreadsheet, notebook)\n2. Record EVERY purchase, no matter how small\n3. Categorize spending (food, transportation, etc.)\n4. Review weekly to stay aware\n5. Analyze monthly to find patterns\n6. Make adjustments based on what you learn',
      commonMistakes: [
        'Only tracking big purchases - small ones add up!',
        'Forgetting cash purchases',
        'Not categorizing expenses',
        'Tracking but never reviewing the data',
        'Getting discouraged and giving up after a week',
      ],
      examples: [
        {
          title: 'The Coffee Discovery',
          description: 'John tracked expenses for a month and realized he spent $150 on coffee shops. That\'s $1,800/year! He switched to home brewing and saved $1,400 annually.',
        },
        {
          title: 'Subscription Surprise',
          description: 'Emma found she had 8 subscriptions totaling $87/month that she barely used. Canceling 5 saved her $1,044/year.',
        },
      ],
      keyTakeaways: [
        'Track everything for at least one month to understand patterns',
        'Small purchases add up - the "$5 latte" really matters',
        'Use tools that make tracking easy (apps sync with banks)',
        'Review regularly, not just record mindlessly',
        'Most people find 2-3 areas where they overspend unknowingly',
      ],
      relatedConcepts: ['budgeting-basics', 'needs-vs-wants'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'How long should you track expenses to understand your spending patterns?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'One day',
            isCorrect: false,
            explanation: 'Way too short - you need to see patterns over time.',
          },
          {
            id: 'b',
            text: 'At least one month',
            isCorrect: true,
            explanation: 'Correct! A full month captures most regular expenses and reveals patterns.',
          },
          {
            id: 'c',
            text: 'Only when you feel like it',
            isCorrect: false,
            explanation: 'Inconsistent tracking won\'t reveal meaningful patterns.',
          },
        ],
        explanation: 'Track for at least one full month to see all regular expenses. Many people continue tracking long-term as it keeps them accountable.',
      },
    ],
  },

  // ========== CREDIT ==========
  {
    id: 'credit-scores-101',
    title: 'Understanding Credit Scores',
    slug: 'credit-scores-101',
    category: 'credit',
    difficulty: 'beginner',
    estimatedReadTime: '7 min',
    icon: '💳',
    content: {
      summary: 'A credit score (300-850) measures your creditworthiness based on your borrowing history, impacting loan rates and more.',
      whatIsIt: 'Your credit score is a three-digit number (typically 300-850) that represents how reliably you pay back borrowed money. It\'s calculated based on your credit history: payment history, amounts owed, length of credit history, new credit, and credit mix. Lenders use it to decide whether to lend to you and at what interest rate.',
      whyItMatters: 'A good credit score saves you tens of thousands of dollars over your lifetime. The difference between a 620 score and a 760 score on a $300,000 mortgage is about $70,000 in extra interest! Credit scores also affect apartment rentals, insurance rates, and even job applications.',
      howToApply: 'Build good credit by:\n1. Pay all bills on time, every time (most important!)\n2. Keep credit card balances below 30% of limits\n3. Don\'t close old credit cards\n4. Avoid applying for too much new credit at once\n5. Check your credit report annually for errors\n6. Be patient - good credit takes time to build',
      commonMistakes: [
        'Thinking you need to carry a credit card balance to build credit (FALSE!)',
        'Closing old credit cards (hurts your score)',
        'Maxing out credit cards',
        'Making late payments',
        'Not checking credit reports for errors',
        'Applying for multiple credit cards in a short time',
      ],
      examples: [
        {
          title: 'The Cost of Bad Credit',
          description: '$300,000 mortgage at 7.5% (bad credit): $2,098/month\n$300,000 mortgage at 6.5% (good credit): $1,896/month\nDifference: $202/month = $72,720 over 30 years!',
        },
        {
          title: 'Building From Scratch',
          description: 'Alex got his first credit card at 21, charged $50/month for gas, paid it in full every month. After 2 years of perfect payments, his score went from 0 to 720.',
        },
      ],
      keyTakeaways: [
        'Payment history is 35% of your score - never be late!',
        'Keep credit utilization below 30% (lower is better)',
        'Length of credit history matters - keep old accounts open',
        'Good credit takes time but is worth tens of thousands',
        'Check your credit report free at annualcreditreport.com',
      ],
      relatedConcepts: ['credit-cards-101', 'debt-basics', 'credit-utilization'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the most important factor in your credit score?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'Your income level',
            isCorrect: false,
            explanation: 'Income is not part of your credit score calculation!',
          },
          {
            id: 'b',
            text: 'Payment history',
            isCorrect: true,
            explanation: 'Correct! Payment history makes up 35% of your score. Pay on time, every time.',
          },
          {
            id: 'c',
            text: 'How many credit cards you have',
            isCorrect: false,
            explanation: 'Number of cards matters less than how you use them.',
          },
        ],
        explanation: 'Payment history is the #1 factor at 35%. Even one late payment can drop your score by 100+ points.',
      },
      {
        id: 'q2',
        question: 'True or False: You need to carry a credit card balance to build credit.',
        type: 'true-false',
        points: 10,
        options: [
          {
            id: 'true',
            text: 'True',
            isCorrect: false,
            explanation: 'This is a myth! Carrying a balance just costs you interest.',
          },
          {
            id: 'false',
            text: 'False',
            isCorrect: true,
            explanation: 'Correct! Pay your full balance every month. You build credit by using cards, not by paying interest.',
          },
        ],
        explanation: 'This is one of the most common myths. You build credit by having accounts and making on-time payments. Carrying a balance just wastes money on interest.',
      },
    ],
  },

  {
    id: 'credit-cards-101',
    title: 'Credit Cards: Friend or Foe?',
    slug: 'credit-cards-101',
    category: 'credit',
    difficulty: 'beginner',
    estimatedReadTime: '8 min',
    icon: '💳',
    content: {
      summary: 'Credit cards are powerful financial tools that can build credit and earn rewards, but only if used responsibly.',
      whatIsIt: 'A credit card lets you borrow money up to a certain limit. You get a monthly bill and must pay at least the minimum payment. If you don\'t pay the full balance, you\'re charged interest (typically 15-25% APR). Used wisely, they build credit and offer rewards. Used poorly, they create expensive debt.',
      whyItMatters: 'Credit cards can be your best friend or worst enemy. The average American has $6,000 in credit card debt costing $1,200/year in interest. Yet used responsibly, cards offer fraud protection, build credit, earn cashback, and provide convenience.',
      howToApply: 'Smart credit card use:\n1. Only charge what you can afford to pay off\n2. Pay the FULL balance every month (not just minimum)\n3. Set up autopay so you never miss a payment\n4. Keep utilization under 30% of your limit\n5. Choose cards with no annual fee (at first)\n6. Use rewards cards for things you buy anyway\n7. Never cash advance (fees are brutal)',
      commonMistakes: [
        'Only paying the minimum ($1,000 balance at minimum payments takes 3+ years and costs $600 in interest!)',
        'Using credit cards for purchases you can\'t afford',
        'Ignoring the interest rate when you carry balances',
        'Missing payments (destroys your credit score)',
        'Taking cash advances (25% fees + immediate interest)',
        'Applying for too many cards too quickly',
      ],
      examples: [
        {
          title: 'The Minimum Payment Trap',
          description: '$5,000 balance at 19% APR, paying minimum only:\n- Takes 13 years to pay off\n- Costs $6,000 in interest\n- Total paid: $11,000 for $5,000 in purchases\n\nPaying $200/month instead:\n- Paid off in 2.5 years\n- Costs $1,200 in interest\n- Saves you $4,800!',
        },
        {
          title: 'Rewards Done Right',
          description: 'Lisa charges $1,500/month on her 2% cashback card for groceries, gas, and bills she\'d buy anyway. She pays it in full every month. Annual benefit: $360 in cashback, zero interest paid, credit score of 790.',
        },
        {
          title: 'The Debt Spiral',
          description: 'Mike charged a $2,000 vacation, figuring he\'d pay it off "eventually." Only making minimums, it took 3 years and cost $3,200 total. That vacation ended up costing 60% more than planned.',
        },
      ],
      keyTakeaways: [
        'Pay full balance every month to avoid interest',
        'Never spend money you don\'t have',
        'Set up autopay to never miss a payment',
        'Credit cards are tools, not extra income',
        'Rewards only matter if you pay no interest',
        'One late payment can drop your score 100+ points',
      ],
      relatedConcepts: ['credit-scores-101', 'debt-basics', 'credit-utilization'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'You have a $1,000 credit card balance at 18% APR. If you only pay the $25 minimum monthly, how long until it\'s paid off?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: '3 years',
            isCorrect: false,
            explanation: 'Much longer than that due to compound interest!',
          },
          {
            id: 'b',
            text: '5 years',
            isCorrect: true,
            explanation: 'Correct! It takes 62 months (5+ years) and you\'ll pay $1,550 total - $550 in interest!',
          },
          {
            id: 'c',
            text: '10 years',
            isCorrect: false,
            explanation: 'Not quite that long, but it is surprisingly long!',
          },
        ],
        explanation: 'Minimum payments are designed to maximize bank profits. A $1,000 balance at minimums costs you $550 in interest and takes 5+ years to pay off!',
      },
      {
        id: 'q2',
        question: 'What\'s the best way to use credit cards?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'Carry a small balance to build credit',
            isCorrect: false,
            explanation: 'This is a myth! Carrying a balance just costs you interest.',
          },
          {
            id: 'b',
            text: 'Only use for emergencies when you have no other option',
            isCorrect: false,
            explanation: 'This works, but you miss out on rewards and credit building with regular use.',
          },
          {
            id: 'c',
            text: 'Use for regular purchases but pay full balance every month',
            isCorrect: true,
            explanation: 'Correct! This builds credit, earns rewards, and costs you nothing in interest.',
          },
          {
            id: 'd',
            text: 'Max it out and make minimum payments',
            isCorrect: false,
            explanation: 'This is the worst approach - expensive interest and damages your credit score.',
          },
        ],
        explanation: 'The smart way: use credit cards for purchases you\'d make anyway, earn rewards, and pay the full balance every month to avoid interest.',
      },
    ],
  },

  // ========== DEBT ==========
  {
    id: 'good-debt-vs-bad-debt',
    title: 'Good Debt vs. Bad Debt',
    slug: 'good-debt-vs-bad-debt',
    category: 'debt',
    difficulty: 'intermediate',
    estimatedReadTime: '6 min',
    icon: '⚖️',
    content: {
      summary: 'Not all debt is bad. "Good debt" finances appreciating assets or increases earning power, while "bad debt" finances depreciating assets or consumption.',
      whatIsIt: 'Good debt is borrowed money that helps you build wealth or earn more income over time: mortgages on homes, student loans for degrees that increase earning potential, or business loans. Bad debt finances things that lose value or generate no return: credit card debt for consumer goods, payday loans, car loans for luxury vehicles you can\'t afford.',
      whyItMatters: 'Understanding this distinction helps you make smarter borrowing decisions. Some debt can accelerate wealth building, while other debt keeps you poor. The key is the ROI (return on investment) - does this debt help you build wealth, or does it drain it?',
      howToApply: 'Before taking on debt, ask:\n1. What am I borrowing for?\n2. Will this increase my income or build equity?\n3. What\'s the interest rate?\n4. Can I afford the payments comfortably?\n5. Is there an alternative to borrowing?\n6. What\'s the total cost including interest?',
      commonMistakes: [
        'Taking on "good debt" you can\'t afford (massive student loans for low-paying field)',
        'Justifying bad debt as "good" because you "need" it',
        'Ignoring the interest rate on "good debt"',
        'Not considering opportunity cost',
        'Taking on debt without a clear repayment plan',
      ],
      examples: [
        {
          title: 'Good Debt Example',
          description: '$30,000 student loan at 4% for nursing degree. Starting salary: $70,000. Loan paid off in 5 years. Degree enables $2.5M+ in lifetime earnings. ROI: Excellent.',
        },
        {
          title: 'Bad Debt Example',
          description: '$40,000 credit card debt from lifestyle inflation - eating out, clothes, gadgets. Interest at 22% APR = $8,800/year. No increase in income. Took 8 years to pay off, cost $70,400 total. ROI: Terrible.',
        },
        {
          title: 'Grey Area',
          description: '$25,000 car loan for a reliable commuter car needed for work vs. $65,000 car loan for a luxury SUV you don\'t need. Same product category, very different financial wisdom.',
        },
      ],
      keyTakeaways: [
        'Good debt typically has low interest rates (<7%)',
        'Good debt finances assets that appreciate or increase income',
        'Bad debt has high interest (>10%) and finances consumption',
        'Even "good debt" is still debt - minimize when possible',
        'The best debt is paid-off debt',
        'Never borrow for depreciating assets if you can avoid it',
      ],
      relatedConcepts: ['student-loans-strategy', 'mortgage-basics', 'credit-cards-101'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which of these is typically considered "good debt"?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'A mortgage on a home you can afford',
            isCorrect: true,
            explanation: 'Correct! Mortgages finance an appreciating asset (usually) and build equity. Interest is often tax-deductible too.',
          },
          {
            id: 'b',
            text: 'Credit card debt from a vacation',
            isCorrect: false,
            explanation: 'This is bad debt - high interest for a consumption experience that adds no value.',
          },
          {
            id: 'c',
            text: 'A payday loan',
            isCorrect: false,
            explanation: 'Payday loans have extreme interest rates (often 400%+ APR). Always avoid these!',
          },
          {
            id: 'd',
            text: 'Financing a boat',
            isCorrect: false,
            explanation: 'Boats are depreciating assets and luxury purchases. Definitely bad debt.',
          },
        ],
        explanation: 'Good debt generally finances appreciating assets (homes) or income growth (education). It has low interest rates and clear ROI.',
      },
      {
        id: 'q2',
        question: 'True or False: Even "good debt" should be paid off as soon as reasonably possible.',
        type: 'true-false',
        points: 10,
        options: [
          {
            id: 'true',
            text: 'True',
            isCorrect: true,
            explanation: 'Correct! While some debt is better than others, being debt-free gives you flexibility and peace of mind.',
          },
          {
            id: 'false',
            text: 'False',
            isCorrect: false,
            explanation: 'Even low-interest debt has costs. Financial freedom means owing nothing.',
          },
        ],
        explanation: 'Even a low-interest mortgage or student loan is still an obligation. While you shouldn\'t panic, working toward being debt-free increases your financial security and flexibility.',
      },
    ],
  },

  // ========== INVESTING ==========
  {
    id: 'compound-interest-magic',
    title: 'The Magic of Compound Interest',
    slug: 'compound-interest-magic',
    category: 'investing',
    difficulty: 'beginner',
    estimatedReadTime: '7 min',
    icon: '📈',
    content: {
      summary: 'Compound interest is earning returns on your returns, causing exponential growth over time. Einstein allegedly called it the "eighth wonder of the world."',
      whatIsIt: 'Compound interest means you earn returns not just on your original investment, but also on the returns themselves. For example: $1,000 at 10% becomes $1,100 after year 1. In year 2, you earn 10% on $1,100 = $110 (not just $100). This snowball effect becomes powerful over decades.',
      whyItMatters: 'Compound interest is how wealth is built. Starting early makes an enormous difference. Someone who invests $500/month from age 25-35 (only 10 years, $60,000 invested) will have MORE at retirement than someone who invests $500/month from age 35-65 (30 years, $180,000 invested). Time in the market is more important than timing the market.',
      howToApply: '1. Start investing as early as possible\n2. Invest consistently (monthly is ideal)\n3. Reinvest all dividends and returns\n4. Leave it alone - don\'t withdraw early\n5. Be patient - compound interest needs time\n6. Even small amounts matter ($100/month adds up!)',
      commonMistakes: [
        'Waiting to start until you have "enough" money',
        'Withdrawing investments early',
        'Not reinvesting dividends',
        'Trying to time the market instead of staying invested',
        'Underestimating the power of small monthly contributions',
      ],
      examples: [
        {
          title: 'The Power of Time',
          description: 'Person A: Invests $500/month from age 25-35, then stops (10 years, $60K invested)\nPerson B: Invests $500/month from age 35-65 (30 years, $180K invested)\n\nAt 65 with 10% returns:\nPerson A: $1,326,000\nPerson B: $1,142,000\n\nStarting earlier wins even with less money invested!',
        },
        {
          title: 'Small Amounts Compound',
          description: '$100/month from age 25-65 at 10% = $632,000\nSkipping the morning $5 coffee and investing that instead = $790,000 at retirement!\n\nThe "latte factor" is real when invested over decades.',
        },
        {
          title: 'One-Time Investment',
          description: '$10,000 invested at age 25:\n- At 10% return by age 65 = $452,000\n- Same $10,000 at age 45 = $67,000\n\n20 extra years = 6.7x more money from the same investment!',
        },
      ],
      keyTakeaways: [
        'Start investing TODAY, even if it\'s just $50/month',
        'Time in the market beats timing the market',
        'Every 10 years earlier you start roughly doubles your final amount',
        'Compound interest needs time - be patient!',
        'Consistency matters more than large lump sums',
        'Never touch investment accounts early if you can avoid it',
      ],
      relatedConcepts: ['investing-basics', 'retirement-accounts', 'index-funds-101'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'If you invest $1,000 at 10% annual return, how much will you have after 2 years with compound interest?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: '$1,200',
            isCorrect: false,
            explanation: 'That would be simple interest (10% + 10% = 20%). But compound interest gives you more!',
          },
          {
            id: 'b',
            text: '$1,210',
            isCorrect: true,
            explanation: 'Correct! Year 1: $1,100. Year 2: $1,100 × 1.10 = $1,210. You earned returns on your returns!',
          },
          {
            id: 'c',
            text: '$1,100',
            isCorrect: false,
            explanation: 'That\'s only after 1 year. Keep compounding!',
          },
        ],
        explanation: 'With compound interest, you earn 10% on $1,100 in year 2 (not the original $1,000). This is the snowball effect that builds wealth.',
      },
      {
        id: 'q2',
        question: 'True or False: Starting to invest 10 years earlier is worth more than doubling your monthly contributions.',
        type: 'true-false',
        points: 10,
        options: [
          {
            id: 'true',
            text: 'True',
            isCorrect: true,
            explanation: 'Correct! Time is the most powerful factor in compound interest. Starting earlier often beats saving more.',
          },
          {
            id: 'false',
            text: 'False',
            isCorrect: false,
            explanation: 'Actually, time is MORE powerful than amount due to compound interest!',
          },
        ],
        explanation: 'This is why starting in your 20s is so powerful. Those extra years of compounding often matter more than how much you save.',
      },
    ],
  },

  {
    id: 'index-funds-101',
    title: 'Index Funds: Investing Made Simple',
    slug: 'index-funds-101',
    category: 'investing',
    difficulty: 'beginner',
    estimatedReadTime: '6 min',
    icon: '📊',
    content: {
      summary: 'Index funds are low-cost investments that automatically own hundreds of stocks, providing instant diversification and historically strong returns.',
      whatIsIt: 'An index fund is a type of investment that owns all (or most) of the stocks in a market index like the S&P 500. Instead of trying to pick winning stocks, you own a tiny piece of hundreds of companies. If you invest in an S&P 500 index fund, you own pieces of Apple, Microsoft, Amazon, and 497 other companies automatically.',
      whyItMatters: 'Index funds have beaten 90% of professional stock pickers over 20+ years. They have super low fees (0.03% vs 1%+ for actively managed funds), provide instant diversification, and require no special knowledge. Warren Buffett recommends them for most people.',
      howToApply: '1. Open a brokerage account (Vanguard, Fidelity, Schwab)\n2. Choose a broad index fund (S&P 500 or Total Market)\n3. Check the expense ratio (<0.20% is good)\n4. Set up automatic monthly investments\n5. Reinvest dividends automatically\n6. Don\'t look at it too often!\n7. Stay invested through ups and downs',
      commonMistakes: [
        'Trying to pick individual stocks instead',
        'Choosing funds with high expense ratios (>0.50%)',
        'Selling during market downturns',
        'Checking your balance too often and panicking',
        'Thinking you need to be "smart" to invest',
        'Waiting for the "perfect time" to start',
      ],
      examples: [
        {
          title: 'S&P 500 Over 30 Years',
          description: '$10,000 invested in S&P 500 index fund in 1994:\n- 2024 value: ~$160,000\n- Average return: 10% per year\n- Required skill: None\n- Time spent managing: Minutes per year',
        },
        {
          title: 'Index Fund vs. Stock Picking',
          description: 'Twin sisters each inherit $100,000 at age 30:\n\nSister A: Invests in S&P 500 index fund, never looks at it\nSister B: Actively trades stocks, reads financial news daily\n\nAt age 60:\nSister A: $1.74M (10% average return)\nSister B: $1.20M (7% average return after fees and bad trades)\n\nSister A made $540,000 more by doing less work!',
        },
      ],
      keyTakeaways: [
        'Index funds beat most professional investors long-term',
        'Low fees matter enormously over decades',
        'Diversification reduces risk automatically',
        'No special knowledge or time required',
        'Warren Buffett recommends S&P 500 index funds',
        'Set it and forget it - don\'t try to time the market',
      ],
      relatedConcepts: ['compound-interest-magic', 'investing-basics', 'retirement-accounts'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'What percentage of actively managed funds beat the S&P 500 index over 20 years?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'About 10%',
            isCorrect: true,
            explanation: 'Correct! Only about 10% of active managers beat the market long-term, and you can\'t predict which ones.',
          },
          {
            id: 'b',
            text: 'About 50%',
            isCorrect: false,
            explanation: 'Much lower! Only about 10% beat the market after fees.',
          },
          {
            id: 'c',
            text: 'About 75%',
            isCorrect: false,
            explanation: 'No way! Active management rarely beats low-cost index funds long-term.',
          },
        ],
        explanation: 'This is why indexing works. Even professionals can\'t consistently beat the market, especially after fees. Why try?',
      },
      {
        id: 'q2',
        question: 'What should you do when the stock market drops 20%?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'Sell everything to avoid further losses',
            isCorrect: false,
            explanation: 'This locks in losses! Markets always recover historically.',
          },
          {
            id: 'b',
            text: 'Stay invested and keep contributing',
            isCorrect: true,
            explanation: 'Correct! You\'re buying at lower prices. This is when wealth is built.',
          },
          {
            id: 'c',
            text: 'Stop contributing until the market recovers',
            isCorrect: false,
            explanation: 'You\'re missing the chance to buy at sale prices!',
          },
        ],
        explanation: 'Market drops are buying opportunities. Every crash in history has been followed by recovery and new highs. Stay the course!',
      },
    ],
  },

  // ========== RETIREMENT ==========
  {
    id: 'retirement-401k-basics',
    title: '401(k) Retirement Accounts',
    slug: 'retirement-401k-basics',
    category: 'retirement',
    difficulty: 'beginner',
    estimatedReadTime: '8 min',
    icon: '🏖️',
    content: {
      summary: 'A 401(k) is an employer-sponsored retirement account with tax benefits and often free employer matching money.',
      whatIsIt: 'A 401(k) is a retirement savings account offered by your employer. You contribute money from your paycheck before taxes, reducing your taxable income today. The money grows tax-free until retirement. Many employers "match" your contributions up to a certain percentage - literally free money.',
      whyItMatters: 'Three reasons: 1) Tax savings now (contributions reduce taxable income), 2) Tax-free growth for decades, 3) Employer match is free money with 100% instant return. Not contributing enough to get the full match is like turning down a raise.',
      howToApply: '1. Sign up through your employer\'s HR/benefits portal\n2. Contribute at least enough to get full employer match\n3. Increase contributions by 1% each year\n4. Choose low-cost index funds for investments\n5. Never withdraw early (penalties + taxes + lost growth)\n6. Roll over to new employer\'s plan if you change jobs',
      commonMistakes: [
        'Not contributing enough to get full employer match (leaving free money on the table!)',
        'Cashing out when changing jobs (20% penalty + taxes + lost growth)',
        'Choosing high-fee investment options',
        'Not increasing contributions when you get raises',
        'Borrowing from your 401(k)',
        'Thinking you\'re "too young" to save for retirement',
      ],
      examples: [
        {
          title: 'The Employer Match',
          description: 'Salary: $60,000/year\nEmployer matches 4%\n\nYou contribute 4% = $2,400/year\nEmployer adds 4% = $2,400/year\nTotal invested: $4,800/year\n\nThat\'s a guaranteed 100% return before any market gains! From age 25-65 at 10% return = $2.5 MILLION.',
        },
        {
          title: 'Starting Early vs. Late',
          description: 'Both invest $500/month at 10% return:\n\nAge 25-35 only (10 years, $60K): $1.32M at 65\nAge 35-65 (30 years, $180K): $1.14M at 65\n\nStarting 10 years earlier means investing $120K LESS but ending with $180K MORE!',
        },
        {
          title: 'The Cost of Cashing Out',
          description: 'Sarah changed jobs with $10,000 in her 401(k). She cashed it out:\n- Lost $1,000 to early withdrawal penalty (10%)\n- Lost $2,500 to taxes (25%)\n- Got $6,500\n- Also lost $116,000 it would have grown to by retirement\n\nTotal cost: $113,500 for needing $10,000 now.',
        },
      ],
      keyTakeaways: [
        'ALWAYS contribute enough to get full employer match',
        'The earlier you start, the less you need to save',
        'Never cash out when changing jobs - roll it over!',
        'Increase contributions by 1% annually',
        'Target 15% of income for retirement (including match)',
        'Choose low-cost index funds inside your 401(k)',
      ],
      relatedConcepts: ['compound-interest-magic', 'index-funds-101', 'retirement-planning'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Your employer matches 50% up to 6% of your $50,000 salary. If you contribute 6%, how much total goes to your retirement?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: '$3,000',
            isCorrect: false,
            explanation: 'That\'s just your contribution! Don\'t forget the match.',
          },
          {
            id: 'b',
            text: '$4,500',
            isCorrect: true,
            explanation: 'Correct! Your $3,000 (6%) + employer $1,500 (3%, which is 50% of your 6%) = $4,500 total.',
          },
          {
            id: 'c',
            text: '$6,000',
            isCorrect: false,
            explanation: 'Close! But they match 50% of your contribution, not 100%.',
          },
        ],
        explanation: 'Always understand your employer\'s match formula. "50% up to 6%" means they contribute half of what you do, up to 6% of salary.',
      },
      {
        id: 'q2',
        question: 'True or False: You should max out your 401(k) before building an emergency fund.',
        type: 'true-false',
        points: 10,
        options: [
          {
            id: 'true',
            text: 'True',
            isCorrect: false,
            explanation: 'Wrong order! Emergency fund comes first (after getting the employer match).',
          },
          {
            id: 'false',
            text: 'False',
            isCorrect: true,
            explanation: 'Correct! Priority: 1) Contribute enough for employer match, 2) Build emergency fund, 3) Then increase 401(k) contributions.',
          },
        ],
        explanation: 'Smart order: Get the employer match (free money!), build 3-6 month emergency fund (safety net), then increase retirement contributions.',
      },
    ],
  },

  // ========== INSURANCE ==========
  {
    id: 'insurance-basics',
    title: 'Insurance: Worth It or Waste?',
    slug: 'insurance-basics',
    category: 'insurance',
    difficulty: 'intermediate',
    estimatedReadTime: '7 min',
    icon: '🛡️',
    content: {
      summary: 'Insurance protects against financial catastrophes you can\'t afford. Buy insurance for big risks, self-insure small ones.',
      whatIsIt: 'Insurance is a financial product where you pay a premium (monthly cost) to protect against large financial losses. If something bad happens, the insurance company pays. You\'re essentially paying small amounts regularly to avoid catastrophic costs later.',
      whyItMatters: 'One accident, illness, or lawsuit could bankrupt you without insurance. Medical bills are the #1 cause of bankruptcy in the US. Yet Americans also waste billions on unnecessary insurance for small risks. The key is insuring against catastrophes you couldn\'t afford, not every small risk.',
      howToApply: 'Insurance priority order:\n1. Health insurance (CRITICAL)\n2. Auto insurance (required by law)\n3. Renters/homeowners insurance\n4. Life insurance (if others depend on your income)\n5. Disability insurance (if you need your income)\n6. Umbrella insurance (if you have assets to protect)\n\nSkip: Extended warranties, most dental insurance, credit card insurance',
      commonMistakes: [
        'Not having health insurance (one hospital stay can cost $50,000+)',
        'Buying insurance for small risks (extended warranties are usually bad deals)',
        'Under-insuring to save on premiums',
        'Not shopping around - prices vary 300%+',
        'Keeping low deductibles (high deductibles + emergency fund is usually cheaper)',
        'Not reviewing policies annually',
      ],
      examples: [
        {
          title: 'Health Insurance Saves $100,000',
          description: 'Marcus broke his leg and needed surgery:\n- Without insurance: $85,000 bill\n- With insurance: $3,000 deductible + $4,800 annual premium\n- Total cost: $7,800 vs $85,000\n- Savings: $77,200',
        },
        {
          title: 'Extended Warranty Waste',
          description: '$1,000 TV with $200 extended warranty:\n- Warranty covers years 2-3\n- Average repair cost if needed: $150\n- Probability of needing repair: 10%\n- Expected cost without warranty: $15\n- Waste: $185\n\nYou\'re better off self-insuring by keeping that $200 in savings!',
        },
        {
          title: 'Life Insurance',
          description: 'Tom has a wife and 2 kids. He carries $500,000 term life insurance costing $40/month:\n- If he dies, family gets $500,000 tax-free\n- Can pay off mortgage, cover living expenses\n- Cost: $480/year for massive protection',
        },
      ],
      keyTakeaways: [
        'Insure catastrophic risks, self-insure small ones',
        'Health insurance is non-negotiable',
        'High deductible + emergency fund usually saves money',
        'Term life insurance is cheap and important if others depend on you',
        'Shop around - prices vary wildly',
        'Skip extended warranties and most "add-on" insurance',
      ],
      relatedConcepts: ['emergency-fund-basics', 'risk-management'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which type of insurance should be your #1 priority?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'Extended warranty on your phone',
            isCorrect: false,
            explanation: 'This is low priority - you can afford to replace a phone.',
          },
          {
            id: 'b',
            text: 'Health insurance',
            isCorrect: true,
            explanation: 'Correct! Medical bills can bankrupt you. This is the most critical insurance.',
          },
          {
            id: 'c',
            text: 'Insurance on rental car when traveling',
            isCorrect: false,
            explanation: 'Often covered by your credit card or auto policy already.',
          },
        ],
        explanation: 'Health insurance protects against six-figure medical bills. It\'s the one insurance you absolutely cannot skip.',
      },
      {
        id: 'q2',
        question: 'True or False: Extended warranties are usually a good deal.',
        type: 'true-false',
        points: 10,
        options: [
          {
            id: 'true',
            text: 'True',
            isCorrect: false,
            explanation: 'Extended warranties are profitable for stores because they rarely pay out. Usually a bad deal for consumers.',
          },
          {
            id: 'false',
            text: 'False',
            isCorrect: true,
            explanation: 'Correct! Extended warranties are typically overpriced. Companies profit because most products don\'t break in the warranty period.',
          },
        ],
        explanation: 'Insurance companies price extended warranties to make profit. They know most products won\'t break. You\'re better off saving that money yourself.',
      },
    ],
  },

  // ========== DEBT ==========
  {
    id: 'debt-avalanche-vs-snowball',
    title: 'Debt Avalanche vs. Snowball Methods',
    slug: 'debt-avalanche-vs-snowball',
    category: 'debt',
    difficulty: 'intermediate',
    estimatedReadTime: '6 min',
    icon: '⛰️',
    content: {
      summary: 'Two proven strategies for paying off multiple debts: avalanche (lowest cost) vs. snowball (fastest psychological wins).',
      whatIsIt: 'When you have multiple debts, you need a strategy. Avalanche method pays the highest interest rate debt first (mathematically optimal). Snowball method pays the smallest balance first (psychological wins). Both involve making minimum payments on everything while putting extra money toward one debt.',
      whyItMatters: 'Having a strategy keeps you focused and motivated. The difference between methods can be thousands in interest and months or years in payoff time. The best method is the one you\'ll actually stick with.',
      howToApply: 'AVALANCHE METHOD:\n1. List all debts with interest rates\n2. Make minimum payments on all\n3. Put all extra money toward highest interest debt\n4. When that\'s paid, move to next highest interest\n5. Repeat until debt-free\n\nSNOWBALL METHOD:\n1. List all debts by balance size\n2. Make minimum payments on all\n3. Put all extra money toward smallest debt\n4. When that\'s paid, move to next smallest\n5. Repeat until debt-free',
      commonMistakes: [
        'Not sticking with one method',
        'Forgetting to redirect freed-up payments to next debt',
        'Taking on new debt while paying off old debt',
        'Only making minimum payments with no extra',
        'Switching methods halfway through',
      ],
      examples: [
        {
          title: 'Avalanche Wins Mathematically',
          description: 'Debts:\n- Credit Card: $5,000 at 22% APR\n- Student Loan: $15,000 at 5% APR\n- Car Loan: $10,000 at 7% APR\n\nExtra $500/month to debt:\nAvalanche (highest interest first): Debt-free in 41 months, $4,200 interest paid\nSnowball (smallest first): Debt-free in 43 months, $4,800 interest paid\n\nAvalanche saves $600 and finishes 2 months earlier.',
        },
        {
          title: 'Snowball Wins Psychologically',
          description: 'Same debts, but person struggles with motivation:\n\nAvalanche: Got discouraged after 6 months seeing credit card balance slowly decrease. Gave up.\n\nSnowball: Paid off $5,000 credit card in 11 months, felt amazing, stayed motivated, eventually paid everything off.\n\nThe "worse" method worked because they actually completed it!',
        },
      ],
      keyTakeaways: [
        'Avalanche saves more money (pay highest interest first)',
        'Snowball provides quicker wins (pay smallest balance first)',
        'Both work - pick one and stick with it',
        'Motivation matters - snowball works if you need psychological wins',
        'Avalanche is best if you\'re analytical and patient',
        'Either method beats no method!',
      ],
      relatedConcepts: ['good-debt-vs-bad-debt', 'credit-cards-101', 'student-loans-strategy'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which debt payoff method saves the most money in interest?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'Avalanche (highest interest first)',
            isCorrect: true,
            explanation: 'Correct! Paying high-interest debt first minimizes total interest paid.',
          },
          {
            id: 'b',
            text: 'Snowball (smallest balance first)',
            isCorrect: false,
            explanation: 'Snowball is motivating but typically costs more in interest.',
          },
          {
            id: 'c',
            text: 'They\'re exactly the same',
            isCorrect: false,
            explanation: 'Avalanche almost always saves more by targeting high interest.',
          },
        ],
        explanation: 'Avalanche is mathematically optimal because high-interest debt costs you more money every month it exists. Eliminate expensive debt first.',
      },
      {
        id: 'q2',
        question: 'When is the snowball method a better choice than avalanche?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'When you need psychological wins to stay motivated',
            isCorrect: true,
            explanation: 'Correct! If quick wins keep you motivated, snowball might be better even if it costs a bit more.',
          },
          {
            id: 'b',
            text: 'When you want to save the most money',
            isCorrect: false,
            explanation: 'Avalanche saves more money. Snowball is about motivation, not savings.',
          },
          {
            id: 'c',
            text: 'Never - avalanche is always better',
            isCorrect: false,
            explanation: 'The best method is the one you\'ll complete. If snowball keeps you going, it\'s the right choice.',
          },
        ],
        explanation: 'The "best" method is personal. Avalanche saves more, but if you need the motivation of quick wins to actually complete the journey, snowball is your better choice.',
      },
    ],
  },

  // ========== SAVING ==========
  {
    id: 'high-yield-savings',
    title: 'High-Yield Savings Accounts',
    slug: 'high-yield-savings',
    category: 'saving',
    difficulty: 'beginner',
    estimatedReadTime: '5 min',
    icon: '💰',
    content: {
      summary: 'High-yield savings accounts offer significantly higher interest rates (often 10-20x more) than traditional banks while keeping your money safe and accessible.',
      whatIsIt: 'High-yield savings accounts (HYSA) are savings accounts, typically offered by online banks, that pay much higher interest rates than traditional brick-and-mortar banks. While big banks might offer 0.01% interest, online banks often offer 4-5%. Your money is FDIC-insured up to $250,000, just like regular banks.',
      whyItMatters: 'On $10,000, a traditional bank pays $1/year while a HYSA pays $400/year. Over time, this difference compounds. Plus, you\'re keeping up with inflation better. There\'s literally no downside - your money is equally safe, just earning more.',
      howToApply: '1. Research top HYSA options (Ally, Marcus, Capital One 360)\n2. Compare interest rates (APY)\n3. Check for minimum balance requirements\n4. Open account online (takes 10-15 minutes)\n5. Link to your checking account\n6. Transfer your emergency fund there\n7. Set up automatic transfers to grow savings',
      commonMistakes: [
        'Leaving emergency fund in checking (earning nothing)',
        'Staying with big bank paying 0.01% out of loyalty',
        'Thinking online banks are sketchy (they\'re FDIC-insured!)',
        'Not comparing rates before choosing',
        'Keeping too much in savings when debt costs more than interest earned',
      ],
      examples: [
        {
          title: 'The $10,000 Difference',
          description: '$10,000 emergency fund for 5 years:\n\nTraditional bank at 0.01%: Earns $5\nHigh-yield at 4%: Earns $2,200\n\nDifference: $2,195 for doing literally nothing different! Same safety, same access, massively different returns.',
        },
        {
          title: 'Fighting Inflation',
          description: 'With 3% inflation:\n- Money at 0.01% loses 2.99% purchasing power annually\n- Money at 4% gains 1% real purchasing power\n\nOver 10 years, $10,000 at 0.01% has $7,400 purchasing power\nAt 4%, it has $11,000 purchasing power',
        },
      ],
      keyTakeaways: [
        'Online banks can pay 100x more than traditional banks',
        'Your money is equally safe (FDIC-insured)',
        'Perfect for emergency funds - liquid and earning',
        'Takes 15 minutes to open, could earn you thousands',
        'Compare rates - they change over time',
        'Not for long-term investing (stocks earn more over decades)',
      ],
      relatedConcepts: ['emergency-fund-basics', 'investing-basics'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'What\'s the main advantage of high-yield savings accounts over traditional banks?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'Higher FDIC insurance coverage',
            isCorrect: false,
            explanation: 'No, both have the same $250,000 FDIC coverage.',
          },
          {
            id: 'b',
            text: 'Much higher interest rates',
            isCorrect: true,
            explanation: 'Correct! Often 10-100x higher rates while being equally safe.',
          },
          {
            id: 'c',
            text: 'Better customer service',
            isCorrect: false,
            explanation: 'Customer service varies, but the main benefit is interest rates.',
          },
        ],
        explanation: 'Online banks have lower overhead costs and pass the savings to you via higher interest rates.',
      },
    ],
  },

  // ========== TAXES ==========
  {
    id: 'tax-brackets-explained',
    title: 'How Tax Brackets Actually Work',
    slug: 'tax-brackets-explained',
    category: 'taxes',
    difficulty: 'intermediate',
    estimatedReadTime: '6 min',
    icon: '🧾',
    content: {
      summary: 'Tax brackets are misunderstood. You don\'t pay your top bracket rate on all income - you pay progressively more as you earn more.',
      whatIsIt: 'The US has progressive tax brackets. This means different portions of your income are taxed at different rates. Only the dollars in each bracket are taxed at that bracket\'s rate, not all your income.',
      whyItMatters: 'Many people turn down raises thinking they\'ll "lose money" by entering a higher bracket. This is mathematically impossible! Understanding how brackets work helps you make better financial decisions and not fear higher income.',
      howToApply: 'Example with $50,000 income (2024 single filer):\n- First $11,000: Taxed at 10% = $1,100\n- Next $33,725: Taxed at 12% = $4,047\n- Last $5,275: Taxed at 22% = $1,161\n- Total tax: $6,308 (12.6% effective rate)\n\nYou\'re "in the 22% bracket" but your effective rate is only 12.6%!',
      commonMistakes: [
        'Thinking your entire income is taxed at your top bracket',
        'Turning down raises to "stay in a lower bracket"',
        'Confusing marginal tax rate with effective tax rate',
        'Not understanding how deductions work',
        'Believing "tax bracket myths" from confused people',
      ],
      examples: [
        {
          title: 'The Raise Math',
          description: 'You earn $89,000 and get a $5,000 raise to $94,000, pushing you from 22% to 24% bracket.\n\nPeople think: "24% of $5,000 = $1,200 more in taxes!"\nReality: Only the dollars OVER $89,075 are taxed at 24%\n\nActual additional tax: 24% of $4,925 = $1,182\nYour extra take-home: $3,818\n\nYou NEVER lose money by earning more!',
        },
        {
          title: 'Effective Rate vs. Marginal Rate',
          description: '$100,000 income:\n- Marginal rate: 24% (your top bracket)\n- Effective rate: 13.8% (actual tax paid / income)\n\nYou pay way less than 24% overall!',
        },
      ],
      keyTakeaways: [
        'Only income in each bracket is taxed at that rate',
        'You never lose money by earning more',
        'Effective tax rate is lower than marginal rate',
        'Tax brackets are progressive, not flat',
        'Always take the raise!',
      ],
      relatedConcepts: ['tax-deductions-101'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'If you earn $60,000 and are in the 22% tax bracket, how much of your income is taxed at 22%?',
        type: 'multiple-choice',
        points: 10,
        options: [
          {
            id: 'a',
            text: 'All $60,000',
            isCorrect: false,
            explanation: 'No! Only the portion in that bracket is taxed at 22%.',
          },
          {
            id: 'b',
            text: 'Only the amount over $44,725',
            isCorrect: true,
            explanation: 'Correct! Only dollars above the bracket threshold are taxed at 22%. Everything below is taxed at lower rates.',
          },
          {
            id: 'c',
            text: 'None of it',
            isCorrect: false,
            explanation: 'Some of your income is in the 22% bracket, just not all of it.',
          },
        ],
        explanation: 'Tax brackets are progressive. You pay 10% on the first portion, 12% on the next portion, and 22% only on the portion in that bracket.',
      },
    ],
  },
];

// Helper functions
export const getConceptById = (id: string): Concept | undefined => {
  return concepts.find(concept => concept.id === id);
};

export const getConceptsByCategory = (category: string): Concept[] => {
  return concepts.filter(concept => concept.category === category);
};

export const getConceptsByDifficulty = (difficulty: string): Concept[] => {
  return concepts.filter(concept => concept.difficulty === difficulty);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(concepts.map(c => c.category)));
};

