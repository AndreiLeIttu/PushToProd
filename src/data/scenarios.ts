import { ScenarioTemplate } from '../types/simulation';

// Pre-built Simulation Scenarios
// Phase 1, Step 1.1

export const scenarios: ScenarioTemplate[] = [
  {
    id: 'first-job',
    title: 'First Job',
    description: 'You just graduated college and landed your first job. Learn to budget, save, and make smart financial decisions as you start your career.',
    difficulty: 'beginner',
    estimatedTime: '10-15 min',
    initialState: {
      age: 22,
      savings: 1000,
      income: 50000, // annual
      expenses: 0, // will be set by decisions
      debt: 25000, // student loans
      stage: 'early-career',
    },
    learningObjectives: [
      'Create a monthly budget',
      'Understand the importance of emergency savings',
      'Balance lifestyle choices with financial goals',
      'Learn about debt management',
    ],
    decisions: [
      {
        id: 'housing-choice',
        prompt: 'Where will you live?',
        description: 'Your first major decision is choosing where to live. This will significantly impact your monthly expenses.',
        category: 'housing',
        options: [
          {
            id: 'cheap-apartment',
            text: 'Rent a budget apartment ($800/month)',
            financialImpact: {
              expenses: 800,
              description: 'Basic apartment, but you\'ll save more money each month',
            },
            outcome: 'You moved into a cozy studio apartment. It\'s small but affordable, leaving you with $2,367/month after taxes and rent.',
            educationalNote: 'Housing experts recommend spending no more than 30% of your income on rent. You\'re spending about 24% - great job!',
          },
          {
            id: 'nice-apartment',
            text: 'Rent a nicer apartment ($1,200/month)',
            financialImpact: {
              expenses: 1200,
              description: 'Better location and amenities, but less money for savings',
            },
            outcome: 'You moved into a modern one-bedroom apartment. It\'s beautiful, but leaves you with $1,967/month after taxes and rent.',
            educationalNote: 'You\'re spending about 36% of your income on rent, which is above the recommended 30%. This might limit your ability to save.',
          },
          {
            id: 'roommates',
            text: 'Live with roommates ($500/month)',
            financialImpact: {
              expenses: 500,
              description: 'Maximum savings potential by sharing living space',
            },
            outcome: 'You moved in with two roommates. Less privacy, but you\'ll have $2,667/month after taxes and rent.',
            educationalNote: 'Living with roommates can save you thousands per year. Many young professionals use this strategy to build savings faster.',
          },
        ],
      },
      {
        id: 'savings-strategy',
        prompt: 'How much will you save each month?',
        description: 'Building an emergency fund is crucial. Financial experts recommend 3-6 months of expenses saved.',
        category: 'savings',
        options: [
          {
            id: 'aggressive-saver',
            text: 'Save 20% of income ($833/month)',
            financialImpact: {
              savings: 833,
              description: 'Building emergency fund quickly',
            },
            outcome: 'You\'re putting $833/month into savings. At this rate, you\'ll have a 6-month emergency fund in less than a year!',
            educationalNote: 'Saving 20% is excellent! The 50/30/20 rule suggests 20% for savings and debt repayment.',
          },
          {
            id: 'moderate-saver',
            text: 'Save 10% of income ($417/month)',
            financialImpact: {
              savings: 417,
              description: 'Balanced approach to saving',
            },
            outcome: 'You\'re saving $417/month. It will take about 2 years to build a full 6-month emergency fund.',
            educationalNote: 'Saving 10% is a good start. Consider increasing this as your income grows.',
          },
          {
            id: 'minimal-saver',
            text: 'Save whatever is left over',
            financialImpact: {
              savings: 0,
              description: 'No dedicated savings plan',
            },
            outcome: 'Without a savings plan, you tend to spend everything. After 6 months, you\'ve saved almost nothing.',
            educationalNote: 'Pay yourself first! Set up automatic transfers to savings before you have a chance to spend.',
          },
        ],
      },
      {
        id: 'student-loan-decision',
        prompt: 'What\'s your plan for your $25,000 in student loans?',
        description: 'You have student loans at 5% interest. How aggressively will you pay them down?',
        category: 'debt',
        options: [
          {
            id: 'minimum-payment',
            text: 'Make minimum payments ($265/month)',
            financialImpact: {
              debt: -265,
              expenses: 265,
              description: 'Standard 10-year repayment plan',
            },
            outcome: 'You\'re making the minimum payment. Your loans will be paid off in 10 years, and you\'ll pay $6,818 in interest.',
            educationalNote: 'While minimum payments are fine, paying extra can save thousands in interest. Even $50 extra per month makes a big difference.',
          },
          {
            id: 'extra-payment',
            text: 'Pay extra ($400/month)',
            financialImpact: {
              debt: -400,
              expenses: 400,
              description: 'Accelerated repayment',
            },
            outcome: 'You\'re paying $135 extra each month. You\'ll be debt-free in 6.5 years and save $3,200 in interest!',
            educationalNote: 'Paying extra on debt is like getting a guaranteed 5% return on investment. That\'s better than most savings accounts!',
          },
          {
            id: 'ignore-loans',
            text: 'Defer payments for now',
            financialImpact: {
              debt: 104, // interest accrues
              expenses: 0,
              description: 'Interest continues to accumulate',
            },
            outcome: 'By deferring, your loan balance grew by $104/month due to interest. After 6 months, you now owe $25,624.',
            educationalNote: 'Interest never sleeps! Even when not making payments, your debt is growing. This can cost you thousands over time.',
          },
        ],
      },
      {
        id: 'emergency-expense',
        prompt: 'Emergency! Your car needs a $1,000 repair',
        description: 'Life happens. Your car broke down and needs immediate repair. How will you handle this?',
        category: 'expenses',
        options: [
          {
            id: 'use-emergency-fund',
            text: 'Use your emergency savings',
            financialImpact: {
              savings: -1000,
              description: 'Exactly what emergency funds are for!',
            },
            outcome: 'You paid for the repair with your emergency fund. This is exactly what it\'s for! You\'ll rebuild it over the next few months.',
            educationalNote: 'This is why emergency funds exist! Without it, you might have had to use a credit card and pay interest.',
          },
          {
            id: 'credit-card',
            text: 'Put it on a credit card',
            financialImpact: {
              debt: 1000,
              description: 'New credit card debt at 19% interest',
            },
            outcome: 'You charged $1,000 to your credit card at 19% interest. If you only make minimum payments, this will cost you $1,347 total.',
            educationalNote: 'Credit card debt is expensive! At 19% interest, you\'ll pay $347 extra if you take a year to pay it off.',
          },
          {
            id: 'delay-repair',
            text: 'Try to delay the repair',
            financialImpact: {
              expenses: 1500, // Problem gets worse
              description: 'Small problem became a bigger problem',
            },
            outcome: 'You waited too long and the problem got worse. What was $1,000 is now $1,500 and you couldn\'t avoid it.',
            educationalNote: 'Sometimes delaying maintenance costs more in the long run. Small problems can become big problems.',
          },
        ],
      },
      {
        id: 'employer-401k',
        prompt: 'Your employer offers a 401(k) with 3% matching',
        description: 'Your company will match up to 3% of your contributions to your retirement account. What will you do?',
        category: 'investment',
        options: [
          {
            id: 'max-match',
            text: 'Contribute 3% to get full match ($1,250/year)',
            financialImpact: {
              savings: 104, // monthly equivalent
              income: 104, // employer match (free money!)
              description: 'Getting $1,250/year in free money',
            },
            outcome: 'You\'re contributing $104/month and your employer adds another $104. That\'s $2,500/year going toward retirement!',
            educationalNote: 'Employer matching is FREE MONEY! Always contribute at least enough to get the full match. It\'s an instant 100% return.',
          },
          {
            id: 'contribute-more',
            text: 'Contribute 10% ($4,167/year)',
            financialImpact: {
              savings: 347, // monthly
              income: 104, // employer still only matches 3%
              description: 'Aggressive retirement saving',
            },
            outcome: 'You\'re saving $347/month plus $104 employer match. Great job planning for the future!',
            educationalNote: 'Saving 10%+ for retirement in your 20s puts you way ahead. Thanks to compound interest, this could be worth $1M+ when you retire!',
          },
          {
            id: 'skip-401k',
            text: 'Skip it for now',
            financialImpact: {
              income: -104, // Missing out on match
              description: 'Leaving free money on the table',
            },
            outcome: 'You decided not to contribute. You\'re missing out on $1,250/year in free money from your employer.',
            educationalNote: 'Not contributing to a 401(k) match is like turning down a 3% raise! Even if money is tight, try to get the full match.',
          },
        ],
      },
    ],
  },
  
  // Scenario 2: Emergency Fund
  {
    id: 'emergency-fund',
    title: 'Building Your Safety Net',
    description: 'Learn why emergency funds are crucial and how to build one. Experience unexpected expenses and see how preparation makes all the difference.',
    difficulty: 'beginner',
    estimatedTime: '8-12 min',
    initialState: {
      age: 25,
      savings: 2000,
      income: 55000,
      expenses: 2500,
      debt: 15000,
      stage: 'early-career',
    },
    learningObjectives: [
      'Understand the 3-6 month emergency fund rule',
      'Learn to prioritize emergency savings',
      'Experience the cost of being unprepared',
      'Balance emergency savings with other goals',
    ],
    decisions: [
      {
        id: 'emergency-fund-target',
        prompt: 'How much should you save for emergencies?',
        description: 'Financial experts recommend 3-6 months of expenses. Your monthly expenses are $2,500.',
        category: 'savings',
        options: [
          {
            id: 'target-3-months',
            text: '3 months of expenses ($7,500)',
            financialImpact: {
              description: 'Conservative emergency fund target',
            },
            outcome: 'You set a goal of $7,500. This is a solid start and covers basic emergencies.',
            educationalNote: '3 months is a good minimum. If your job is unstable or you have dependents, aim for 6 months.',
          },
          {
            id: 'target-6-months',
            text: '6 months of expenses ($15,000)',
            financialImpact: {
              description: 'Recommended emergency fund target',
            },
            outcome: 'You set a goal of $15,000. This provides excellent protection against job loss or major emergencies.',
            educationalNote: '6 months is the gold standard! It gives you time to find a new job or handle major expenses without going into debt.',
          },
          {
            id: 'target-minimal',
            text: 'Just $1,000 for now',
            financialImpact: {
              description: 'Minimal emergency fund',
            },
            outcome: 'You\'ll save $1,000 total. This barely covers small emergencies and won\'t help with major issues.',
            educationalNote: '$1,000 is better than nothing, but most emergencies cost more. Car repairs, medical bills, and job loss often require thousands.',
          },
        ],
      },
      {
        id: 'savings-pace',
        prompt: 'How fast will you build your emergency fund?',
        description: 'You need to save more. How aggressively will you save?',
        category: 'savings',
        options: [
          {
            id: 'aggressive-saving',
            text: 'Save $500/month (live frugally)',
            financialImpact: {
              savings: 3000, // 6 months of saving
              expenses: 200, // reduced spending
            },
            outcome: 'You cut unnecessary spending and saved $500/month. After 6 months, you have $5,000 saved!',
            educationalNote: 'Aggressive saving builds security fast. The sacrifices are temporary, but the peace of mind is lasting.',
          },
          {
            id: 'moderate-saving',
            text: 'Save $250/month (balanced approach)',
            financialImpact: {
              savings: 1500,
              expenses: 100,
            },
            outcome: 'You saved $250/month while maintaining your lifestyle. After 6 months, you have $3,500 saved.',
            educationalNote: 'Balance is good, but building an emergency fund faster gives you security sooner.',
          },
          {
            id: 'slow-saving',
            text: 'Save $100/month (maintain lifestyle)',
            financialImpact: {
              savings: 600,
            },
            outcome: 'You saved only $100/month. After 6 months, you have just $2,600 total - far from your goal.',
            educationalNote: 'Saving too slowly means you\'re vulnerable for longer. Try to build your emergency fund as quickly as possible, then relax.',
          },
        ],
      },
      {
        id: 'unexpected-medical',
        prompt: 'Emergency! You need dental surgery costing $2,500',
        description: 'A dental emergency requires immediate treatment. How will you pay for it?',
        category: 'expenses',
        options: [
          {
            id: 'use-savings',
            text: 'Use emergency savings',
            financialImpact: {
              savings: -2500,
            },
            outcome: 'You used your emergency fund. This is exactly what it\'s for! You can rebuild it over time without going into debt.',
            educationalNote: 'This is why emergency funds exist! Without it, you\'d be taking on high-interest debt. You can rebuild the fund now.',
          },
          {
            id: 'credit-card-medical',
            text: 'Put it on credit card (19% APR)',
            financialImpact: {
              debt: 2500,
              expenses: 50, // monthly payment
            },
            outcome: 'You charged $2,500 to your credit card. At 19% interest and $50/month payments, you\'ll pay $3,137 total over 5 years.',
            educationalNote: 'Medical debt on a credit card at 19% interest means you\'ll pay $637 extra. An emergency fund would have saved you that money.',
          },
          {
            id: 'payment-plan',
            text: 'Ask for a payment plan',
            financialImpact: {
              expenses: 150, // 18 month payment
            },
            outcome: 'The dentist offered an 18-month payment plan at $150/month with no interest. Much better than a credit card!',
            educationalNote: 'Many medical providers offer payment plans with low or no interest. Always ask! It\'s much better than credit card debt.',
          },
        ],
      },
    ],
  },

  // Scenario 3: Debt Payoff Strategy
  {
    id: 'debt-management',
    title: 'Conquering Debt',
    description: 'You have multiple debts with different interest rates. Learn smart strategies to pay them off efficiently and save thousands in interest.',
    difficulty: 'intermediate',
    estimatedTime: '10-12 min',
    initialState: {
      age: 28,
      savings: 5000,
      income: 60000,
      expenses: 3000,
      debt: 35000, // multiple debts
      stage: 'early-career',
    },
    learningObjectives: [
      'Understand debt avalanche vs snowball methods',
      'Learn about interest rates and their impact',
      'Make trade-offs between saving and debt payoff',
      'Prioritize high-interest debt',
    ],
    decisions: [
      {
        id: 'debt-strategy',
        prompt: 'Choose your debt payoff strategy',
        description: 'You have: $20,000 student loans (5% interest), $10,000 credit card (19% interest), $5,000 car loan (6% interest). You can afford to pay $1,000/month total toward debt.',
        category: 'debt',
        options: [
          {
            id: 'avalanche-method',
            text: 'Avalanche: Pay high-interest debt first',
            financialImpact: {
              debt: -6000, // 6 months aggressive on credit card
              expenses: 1000,
            },
            outcome: 'You focused on the 19% credit card first. After 6 months, you paid off $6,000 and saved $571 in interest!',
            educationalNote: 'The avalanche method saves the most money by targeting high-interest debt. It\'s mathematically optimal.',
          },
          {
            id: 'snowball-method',
            text: 'Snowball: Pay smallest balance first',
            financialImpact: {
              debt: -6000,
              expenses: 1000,
            },
            outcome: 'You paid off the $5,000 car loan completely and feel motivated! However, you paid $571 more in interest than the avalanche method.',
            educationalNote: 'Snowball gives psychological wins by clearing debts fast. Less optimal financially, but the motivation boost helps many people stick with it.',
          },
          {
            id: 'minimum-only',
            text: 'Just pay minimums on everything',
            financialImpact: {
              debt: -1800,
              expenses: 300,
            },
            outcome: 'You made minimum payments. After 6 months, you\'ve barely made a dent and paid $850 in interest.',
            educationalNote: 'Minimum payments keep you in debt for years. You\'ll pay 2-3x the original amount in interest! Always pay more when possible.',
          },
        ],
      },
      {
        id: 'extra-income',
        prompt: 'You have a chance to earn extra money',
        description: 'A friend offers you $500 to help with a weekend project. What will you do with it?',
        category: 'income',
        options: [
          {
            id: 'pay-debt',
            text: 'Put it all toward debt',
            financialImpact: {
              debt: -500,
            },
            outcome: 'You made an extra $500 payment on your credit card. This saved you $95 in interest and speeds up your debt freedom!',
            educationalNote: 'Extra payments on high-interest debt are like getting a guaranteed 19% return. That\'s better than any investment!',
          },
          {
            id: 'split-it',
            text: 'Half to debt ($250), half to savings ($250)',
            financialImpact: {
              debt: -250,
              savings: 250,
            },
            outcome: 'You split it 50/50. Balanced approach, but you\'ll pay more interest over time.',
            educationalNote: 'If you already have an emergency fund, putting extra money toward high-interest debt usually makes more sense than saving.',
          },
          {
            id: 'spend-it',
            text: 'Treat yourself - you earned it!',
            financialImpact: {
              expenses: 500,
            },
            outcome: 'You spent the $500 on entertainment. It felt good temporarily, but your debt remains unchanged.',
            educationalNote: 'Small rewards are fine, but consider the opportunity cost. That $500 toward debt could have saved you $95 in interest.',
          },
        ],
      },
      {
        id: 'consolidation-offer',
        prompt: 'You receive a debt consolidation offer',
        description: 'A lender offers to consolidate your debts into one loan at 8% interest. Should you take it?',
        category: 'debt',
        options: [
          {
            id: 'reject-consolidation',
            text: 'Reject - Keep current strategy',
            financialImpact: {},
            outcome: 'You stuck with your plan. Good choice! The 8% consolidation rate is higher than most of your existing debt.',
            educationalNote: 'Consolidation seems simple, but check the math! This offer would increase your average interest rate from 7.4% to 8%.',
          },
          {
            id: 'accept-consolidation',
            text: 'Accept - Consolidate everything',
            financialImpact: {
              debt: 2100, // fees and higher interest over time
            },
            outcome: 'You consolidated. One payment is convenient, but you\'ll pay $2,100 more in interest over the life of the loan.',
            educationalNote: 'Consolidation can help if you\'re overwhelmed, but often costs more. Read the fine print and do the math!',
          },
        ],
      },
    ],
  },

  // Scenario 4: First Investment
  {
    id: 'first-investment',
    title: 'Your First Investment',
    description: 'You\'ve built some savings and are ready to invest. Learn about compound interest, risk vs. reward, and building wealth over time.',
    difficulty: 'intermediate',
    estimatedTime: '10-15 min',
    initialState: {
      age: 30,
      savings: 15000,
      income: 70000,
      expenses: 3500,
      debt: 5000,
      stage: 'mid-career',
    },
    learningObjectives: [
      'Understand compound interest',
      'Learn about investment risk levels',
      'Discover the power of employer matching',
      'Balance saving vs. investing',
    ],
    decisions: [
      {
        id: '401k-decision',
        prompt: 'Your company offers 401(k) matching up to 6%',
        description: 'They\'ll match dollar-for-dollar up to 6% of your salary. That\'s $4,200/year in free money!',
        category: 'investment',
        options: [
          {
            id: 'max-match',
            text: 'Contribute 6% to get full match',
            financialImpact: {
              savings: -4200, // from take-home
              income: 4200, // employer match
            },
            outcome: 'You\'re contributing $350/month and your employer adds another $350. That\'s $8,400/year toward retirement!',
            educationalNote: 'Employer matching is literally free money! It\'s an instant 100% return. Always contribute enough to get the full match.',
          },
          {
            id: 'contribute-less',
            text: 'Contribute 3% only',
            financialImpact: {
              savings: -2100,
              income: 2100,
            },
            outcome: 'You\'re leaving $2,100/year of free money on the table by not maximizing the match.',
            educationalNote: 'You\'re missing out! Even if money is tight, try to get the full match. It\'s the best investment return you\'ll ever get.',
          },
          {
            id: 'skip-401k',
            text: 'Skip for now - keep cash',
            financialImpact: {},
            outcome: 'You passed on the 401(k). You just turned down $4,200 in free money this year.',
            educationalNote: 'This is a mistake! Unless you have high-interest debt or no emergency fund, always take the employer match.',
          },
        ],
      },
      {
        id: 'extra-investment',
        prompt: 'You have $5,000 extra. Where should it go?',
        description: 'After building your emergency fund and getting the 401(k) match, you have extra money to invest.',
        category: 'investment',
        options: [
          {
            id: 'index-funds',
            text: 'Low-cost index funds (Diversified)',
            financialImpact: {
              savings: -5000,
              description: 'Historical avg return: 10%/year',
            },
            outcome: 'You invested in index funds. Over 30 years at 10% average return, this $5,000 could become $87,000!',
            educationalNote: 'Index funds are the gold standard for most investors. Low fees, automatic diversification, and solid long-term returns.',
          },
          {
            id: 'individual-stocks',
            text: 'Individual stocks (Higher risk)',
            financialImpact: {
              savings: -5000,
              description: 'Potential for higher returns but more risk',
            },
            outcome: 'You picked a few stocks. This could work out great or poorly - time will tell. Most individual investors underperform index funds.',
            educationalNote: 'Studies show 90% of individual stock pickers underperform the market long-term. Index funds usually win.',
          },
          {
            id: 'high-yield-savings',
            text: 'Keep in high-yield savings account (4% APY)',
            financialImpact: {
              savings: 200, // 6 months of 4% interest
            },
            outcome: 'Your $5,000 earned $100 in interest after 6 months. Safe, but inflation might cancel out your gains.',
            educationalNote: 'Savings accounts are great for emergency funds, but for long-term money, investing typically grows wealth much faster.',
          },
        ],
      },
      {
        id: 'market-crash',
        prompt: 'The market drops 20% overnight!',
        description: 'Your investments just lost $1,000 in value. What do you do?',
        category: 'investment',
        options: [
          {
            id: 'stay-invested',
            text: 'Stay calm and keep investing',
            financialImpact: {
              savings: -1000, // temporary loss that recovers
            },
            outcome: 'You stayed invested and kept contributing. 6 months later, the market recovered and you\'re up 15% total because you bought low!',
            educationalNote: 'Time in the market beats timing the market. Downturns are buying opportunities! Historical data shows markets always recover.',
          },
          {
            id: 'panic-sell',
            text: 'Sell everything - cut your losses!',
            financialImpact: {
              savings: -1000, // locked in loss
            },
            outcome: 'You sold at a loss. When the market recovered 6 months later, you missed out on $1,500 in gains.',
            educationalNote: 'Panic selling is how people lose money in the stock market. If you can\'t handle volatility, you\'re not ready to invest.',
          },
          {
            id: 'invest-more',
            text: 'Invest more - everything is on sale!',
            financialImpact: {
              savings: -2000,
            },
            outcome: 'You invested $1,000 more during the dip. 6 months later, you\'re up 30% on that purchase. Brave move paid off!',
            educationalNote: 'Buying during market crashes is how wealthy investors are made. Warren Buffett says "Be fearful when others are greedy, and greedy when others are fearful."',
          },
        ],
      },
    ],
  },

  // Scenario 5: Big Purchase Decision
  {
    id: 'big-purchase',
    title: 'Rent vs. Buy: Your First Home',
    description: 'You\'re tired of renting and thinking about buying a home. But is it the right financial decision? Navigate the complex world of mortgages and home ownership.',
    difficulty: 'advanced',
    estimatedTime: '12-18 min',
    initialState: {
      age: 32,
      savings: 40000,
      income: 80000,
      expenses: 2500,
      debt: 10000,
      stage: 'mid-career',
    },
    learningObjectives: [
      'Understand the true cost of homeownership',
      'Learn about down payments and mortgages',
      'Compare renting vs. buying financially',
      'Avoid common first-time homebuyer mistakes',
    ],
    decisions: [
      {
        id: 'rent-vs-buy',
        prompt: 'Should you buy a home?',
        description: 'Homes in your area cost $300,000. You have $40,000 saved. Do you buy or keep renting?',
        category: 'housing',
        options: [
          {
            id: 'buy-house',
            text: 'Buy with 10% down ($30,000)',
            financialImpact: {
              savings: -30000,
              expenses: 1800, // mortgage, insurance, taxes, maintenance
              debt: 270000, // mortgage
            },
            outcome: 'You bought the house! Monthly payment is $1,800. You\'re building equity, but you\'re also responsible for all repairs and maintenance.',
            educationalNote: 'Homeownership builds equity but costs more than just the mortgage: taxes, insurance, maintenance, and opportunity cost of the down payment.',
          },
          {
            id: 'keep-renting',
            text: 'Keep renting ($1,500/month)',
            financialImpact: {
              expenses: 1500,
            },
            outcome: 'You stayed flexible. Your $40,000 stayed invested, earning returns. No surprise repairs or property taxes to worry about.',
            educationalNote: 'Renting isn\'t "throwing away money" - you\'re paying for flexibility. Sometimes renting is smarter, especially if you might move soon.',
          },
          {
            id: 'buy-smaller',
            text: 'Buy a smaller condo ($200,000)',
            financialImpact: {
              savings: -20000,
              expenses: 1300,
              debt: 180000,
            },
            outcome: 'You bought a smaller place. Lower payments, less maintenance, still building equity. Smart compromise!',
            educationalNote: 'Buying less house than you can afford leaves room in your budget for investing, emergencies, and enjoying life.',
          },
        ],
      },
      {
        id: 'inspection-issue',
        prompt: 'Home inspection found $15,000 in repairs needed',
        description: 'The inspection revealed roof damage and old plumbing. What do you do?',
        category: 'expenses',
        options: [
          {
            id: 'negotiate-price',
            text: 'Negotiate $15,000 off the price',
            financialImpact: {
              debt: -15000, // Smaller mortgage
              expenses: -100, // Lower monthly payment
            },
            outcome: 'Seller agreed to drop the price! You saved $15,000 and your monthly payment is $100 less. You\'ll fix the issues over time.',
            educationalNote: 'Always negotiate after inspection! Sellers often prefer lowering price over doing repairs. This saves you money monthly.',
          },
          {
            id: 'seller-repairs',
            text: 'Require seller to make repairs before closing',
            financialImpact: {},
            outcome: 'Seller made the repairs, but used cheap contractors. 2 years later, the roof is leaking again.',
            educationalNote: 'Sellers often use the cheapest option when forced to repair. Sometimes getting money off the price is better so you can hire quality contractors.',
          },
          {
            id: 'walk-away',
            text: 'Walk away from the deal',
            financialImpact: {
              savings: -500, // inspection and appraisal costs lost
            },
            outcome: 'You walked away. Lost $500 in inspection costs, but avoided a money pit. Smart move!',
            educationalNote: 'Sometimes the best decision is walking away. That $500 loss could have saved you from $50,000+ in problems.',
          },
        ],
      },
      {
        id: 'emergency-fund-after-purchase',
        prompt: 'After buying, your emergency fund is depleted',
        description: 'You used most of your savings for the down payment. Your emergency fund is now only $2,000.',
        category: 'savings',
        options: [
          {
            id: 'rebuild-emergency',
            text: 'Prioritize rebuilding emergency fund',
            financialImpact: {
              savings: 6000, // 6 months of aggressive saving
            },
            outcome: 'You focused on rebuilding savings. When the water heater broke ($1,200), you had the cash to fix it immediately.',
            educationalNote: 'Homeownership comes with surprise expenses. A healthy emergency fund (6-12 months) is crucial for homeowners.',
          },
          {
            id: 'upgrade-house',
            text: 'Start making home improvements',
            financialImpact: {
              savings: -5000,
              debt: 5000, // home improvement loan
            },
            outcome: 'You financed renovations but had no emergency fund. When the water heater broke, you had to put it on a credit card.',
            educationalNote: 'Resist the temptation to upgrade immediately! Build your emergency fund first. Unexpected home repairs will happen.',
          },
        ],
      },
    ],
  },
];

// Helper function to get scenario by ID
export const getScenarioById = (id: string): ScenarioTemplate | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};

// Helper function to get scenarios by difficulty
export const getScenariosByDifficulty = (
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): ScenarioTemplate[] => {
  return scenarios.filter(scenario => scenario.difficulty === difficulty);
};

