import { LifeEvent, LifeStage } from '../types/simulation';

// BitLife-Style Life Events - Complete Life Simulation
// Events organized by life stages from childhood to death

export const lifeEvents: LifeEvent[] = [
  // ===== TEENAGER EVENTS (13-17) =====
  {
    id: 'high-school-start',
    title: 'Starting High School',
    prompt: 'You\'re starting high school! What approach will you take?',
    description: 'Your education choices now can impact your future career and college options.',
    minAge: 14,
    maxAge: 14,
    category: 'education',
    isRequired: true,
    lifeStage: ['teenager'],
    options: [
      {
        id: 'focus-academics',
        text: 'Focus on academics and grades',
        financialImpact: {
          description: 'Good grades open doors to scholarships',
        },
        outcome: 'You dedicated yourself to studying. Your GPA is stellar and teachers love you!',
        educationalNote: 'Strong academic performance can lead to college scholarships, saving tens of thousands of dollars.',
        ageImpact: 1,
      },
      {
        id: 'balanced-approach',
        text: 'Balance school with part-time work',
        financialImpact: {
          savings: 5000,
          income: 5000,
        },
        outcome: 'You worked part-time while maintaining decent grades. You saved $5,000 and learned valuable work skills!',
        educationalNote: 'Part-time work as a teen builds work ethic and provides early savings, but can impact study time.',
        ageImpact: 1,
      },
      {
        id: 'just-pass',
        text: 'Do the minimum to pass',
        financialImpact: {},
        outcome: 'You barely graduated. Limited college options and no scholarships available.',
        educationalNote: 'Poor academic performance limits future opportunities and can cost you in scholarships and career prospects.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'part-time-job',
    title: 'First Part-Time Job',
    prompt: 'You\'re offered a part-time job at a local store. Will you take it?',
    description: 'Earn some money while in high school.',
    minAge: 15,
    maxAge: 17,
    category: 'career',
    lifeStage: ['teenager'],
    options: [
      {
        id: 'take-job',
        text: 'Take the job ($200/week)',
        financialImpact: {
          savings: 8000,
          income: 10000,
          expenses: 2000,
        },
        outcome: 'You earned $200/week and saved most of it. You now have $8,000 saved and valuable work experience!',
        educationalNote: 'Early work experience builds your resume and provides seed money for future investments or education.',
        ageImpact: 1,
      },
      {
        id: 'focus-school',
        text: 'Focus on school instead',
        financialImpact: {},
        outcome: 'You focused entirely on academics. Your GPA improved significantly.',
        educationalNote: 'Sometimes focusing on education is the better investment, especially if pursuing competitive colleges.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'got-car',
    title: 'Getting Your First Car',
    prompt: 'You need transportation. How will you get a car?',
    description: 'Cars are expensive - both to buy and maintain.',
    minAge: 16,
    maxAge: 18,
    category: 'expenses',
    lifeStage: ['teenager', 'young-adult'],
    options: [
      {
        id: 'used-car-cash',
        text: 'Buy a $3,000 used car with cash',
        financialImpact: {
          savings: -3000,
          expenses: 150,
        },
        outcome: 'You bought a reliable used car. No payments, just insurance and gas ($150/month).',
        educationalNote: 'Buying a used car with cash avoids debt and interest payments. It\'s the smartest financial move for your first car.',
        ageImpact: 1,
      },
      {
        id: 'finance-new-car',
        text: 'Finance a new car ($25,000)',
        financialImpact: {
          debt: 25000,
          expenses: 550,
        },
        outcome: 'You financed a brand new car. Payments are $400/month plus $150 insurance. That\'s $6,600/year!',
        educationalNote: 'Financing a new car young is a huge financial mistake. The average new car loses 20% of value in the first year!',
        ageImpact: 1,
      },
      {
        id: 'no-car',
        text: 'Use public transportation',
        financialImpact: {
          expenses: 50,
        },
        outcome: 'You use the bus and bike. It\'s less convenient but you\'re saving thousands.',
        educationalNote: 'Not having a car saves money but may limit job opportunities. Consider your location and needs.',
        ageImpact: 1,
      },
    ],
  },

  // ===== YOUNG ADULT EVENTS (18-25) =====
  {
    id: 'college-decision',
    title: '🎓 The Big Decision',
    prompt: 'OMG you graduated! 🎉 Time to choose your path...',
    description: 'This choice literally shapes your whole future. No pressure! 😅',
    minAge: 18,
    maxAge: 18,
    category: 'education',
    isRequired: true,
    lifeStage: ['young-adult'],
    options: [
      {
        id: 'state-college',
        text: '🏫 Go to state university (4 years)',
        financialImpact: {
          debt: 40000,
          expenses: 25000,
        },
        outcome: 'College life was epic! You got that degree but also $40k in student loans. Worth it though - better job opportunities await! 📚💪',
        educationalNote: '💡 Real talk: College grads earn $1M+ more over their lifetime. State schools = same degree, way less debt!',
        ageImpact: 4,
      },
      {
        id: 'community-then-transfer',
        text: '🧠 Big brain move: Community college → transfer (4 years)',
        financialImpact: {
          debt: 25000,
          expenses: 15000,
          savings: -5000,
        },
        outcome: 'Yooo smart! You hacked the system - saved $15K doing gen-eds at community college, then transferred. Same degree, way less debt! 🧠✨',
        educationalNote: '💡 Pro gamer move: CC for 2 years then transfer = same diploma, $20K-40K saved. Employers literally don\'t care!',
        ageImpact: 4,
      },
      {
        id: 'private-college',
        text: '💸 Fancy private university (4 years)',
        financialImpact: {
          debt: 120000,
          expenses: 60000,
        },
        outcome: 'Prestiiige! But oof... $120K in debt = $1,200/month payments for 10 years. That\'s gonna hurt. 😬💸',
        educationalNote: '⚠️ Reality check: Unless it\'s Harvard/MIT, private colleges rarely worth it. Your future boss won\'t care where you went!',
        ageImpact: 4,
      },
      {
        id: 'trade-school',
        text: '🔧 Learn a trade (2 years)',
        financialImpact: {
          debt: 15000,
          expenses: 10000,
          income: 45000,
        },
        outcome: 'Skilled up! Only $15K debt and you\'re already making $45K. Plot twist: you might out-earn your college friends! 🔧💰',
        educationalNote: '💡 Real talk: Plumbers & electricians often make $80K+. Everyone needs them, nobody wants to do it = 💵💵',
        ageImpact: 2,
      },
      {
        id: 'start-working',
        text: '💼 Jump straight into work',
        financialImpact: {
          income: 30000,
          expenses: 1500,
        },
        outcome: 'You said "nah" to more school. Making $30K, zero debt, but your pay ceiling might be lower. Still, you do you! 💪',
        educationalNote: '💡 No college = no debt but might hit a ceiling later. Keep learning new skills to level up your career!',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'first-real-job',
    title: '💼 First Real Paycheck!',
    prompt: 'You got the job! 🎉 That first paycheck hit different...',
    description: 'What you do with that money now = your whole financial vibe later. Choose wisely!',
    minAge: 22,
    maxAge: 23,
    category: 'career',
    isRequired: true,
    prerequisite: {
      hasJob: false,
    },
    lifeStage: ['young-adult'],
    options: [
      {
        id: 'save-first',
        text: '💰 Live cheap, stack that bread',
        financialImpact: {
          savings: 15000,
          income: 50000,
          expenses: 2000,
        },
        outcome: 'Kept the roommates, packed lunches, said no to brunch. A year later? $15K saved! Future you is so grateful rn. 🙏💸',
        educationalNote: '💡 Your 20s = best time to grind and save. Live like you\'re broke now, live like you\'re rich later!',
        ageImpact: 1,
      },
      {
        id: 'lifestyle-inflation',
        text: '✨ Upgrade everything - I deserve it!',
        financialImpact: {
          savings: 2000,
          income: 50000,
          expenses: 3500,
        },
        outcome: 'New apartment, new wardrobe, eating out daily... living your best life! But only $2K saved this year. Paycheck to paycheck vibes. 😬',
        educationalNote: '⚠️ Lifestyle inflation is REAL. Just because you CAN afford it doesn\'t mean you SHOULD buy it. This is how people stay broke!',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'employer-401k',
    title: '401(k) Decision',
    prompt: 'Your employer offers a 401(k) with company matching. What will you do?',
    description: 'This is free money - but you have to contribute to get it.',
    minAge: 22,
    maxAge: 30,
    category: 'investment',
    prerequisite: {
      hasJob: true,
    },
    lifeStage: ['young-adult', 'adult'],
    options: [
      {
        id: 'max-match',
        text: 'Contribute enough to get full match (6%)',
        financialImpact: {
          savings: 3000,
          income: 3000,
        },
        outcome: 'You contribute $3,000 and your employer adds $3,000. That\'s $6,000/year toward retirement - instant 100% return!',
        educationalNote: 'Employer matching is FREE MONEY. Always contribute at least enough to get the full match.',
        ageImpact: 1,
      },
      {
        id: 'skip-it',
        text: 'Skip it - you need cash now',
        financialImpact: {
          income: -3000,
        },
        outcome: 'You passed on $3,000 in free money. Over 40 years, this could have grown to $100,000+.',
        educationalNote: 'Not taking employer match is like refusing a 6% raise. It\'s the single biggest financial mistake young workers make.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'emergency-fund-build',
    title: 'Building an Emergency Fund',
    prompt: 'Financial experts say you need 3-6 months of expenses saved. Will you build one?',
    description: 'Emergency funds protect you from going into debt when life happens.',
    minAge: 23,
    maxAge: 28,
    category: 'savings',
    lifeStage: ['young-adult', 'adult'],
    options: [
      {
        id: 'build-6-months',
        text: 'Build a 6-month emergency fund',
        financialImpact: {
          savings: 12000,
        },
        outcome: 'You saved $12,000 over two years. When your car broke down, you paid cash instead of going into debt!',
        educationalNote: 'Emergency funds are insurance against life\'s surprises. They prevent small problems from becoming financial disasters.',
        ageImpact: 2,
      },
      {
        id: 'minimal-savings',
        text: 'Just keep $1,000 on hand',
        financialImpact: {
          savings: 1000,
        },
        outcome: 'You have $1,000 saved. When you lost your job, you had to put everything on credit cards. Now you have $8,000 in high-interest debt.',
        educationalNote: '$1,000 barely covers minor emergencies. Job loss, medical bills, and major repairs require much more.',
        ageImpact: 2,
      },
    ],
  },

  {
    id: 'student-loan-repayment',
    title: 'Student Loan Strategy',
    prompt: 'You have $40,000 in student loans at 5% interest. How will you handle them?',
    description: 'Your repayment strategy will affect your finances for years.',
    minAge: 23,
    maxAge: 25,
    category: 'debt',
    prerequisite: {
      hasDebt: true,
    },
    lifeStage: ['young-adult'],
    options: [
      {
        id: 'aggressive-payoff',
        text: 'Pay aggressively ($800/month)',
        financialImpact: {
          debt: -28800,
          expenses: 800,
        },
        outcome: 'You paid $800/month for 3 years. You\'re now debt-free and saved $7,000 in interest!',
        educationalNote: 'Paying extra on student loans saves thousands in interest and frees up cash flow years sooner.',
        ageImpact: 3,
      },
      {
        id: 'minimum-only',
        text: 'Make minimum payments ($425/month)',
        financialImpact: {
          debt: -15300,
          expenses: 425,
        },
        outcome: 'Making minimum payments means you\'ll be in debt for 10 years and pay $11,000 in interest.',
        educationalNote: 'Minimum payments keep you in debt longer. Even an extra $50/month makes a huge difference.',
        ageImpact: 3,
      },
      {
        id: 'refinance',
        text: 'Refinance to lower rate (3%)',
        financialImpact: {
          debt: -12000,
          expenses: 500,
        },
        outcome: 'You refinanced to 3%. You\'ll save $3,500 in interest over the life of the loan!',
        educationalNote: 'Refinancing student loans can save thousands, but you lose federal protections. Do the math first.',
        ageImpact: 3,
      },
    ],
  },

  // ===== ADULT EVENTS (26-40) =====
  {
    id: 'career-advancement',
    title: 'Career Opportunity',
    prompt: 'You\'re offered a promotion with more responsibility.',
    description: 'More money but more stress. Is it worth it?',
    minAge: 26,
    maxAge: 35,
    category: 'career',
    prerequisite: {
      hasJob: true,
      minIncome: 40000,
    },
    lifeStage: ['adult'],
    options: [
      {
        id: 'take-promotion',
        text: 'Take the promotion (+$20,000/year)',
        financialImpact: {
          income: 20000,
          expenses: 500,
        },
        outcome: 'You accepted! You\'re earning $20,000 more per year. This compounds to $600,000+ over your career!',
        educationalNote: 'Early career advancement has massive long-term impact. Each raise compounds over your lifetime.',
        ageImpact: 2,
      },
      {
        id: 'stay-comfortable',
        text: 'Stay in current role',
        financialImpact: {},
        outcome: 'You stayed comfortable, but your peers who took promotions are now earning much more.',
        educationalNote: 'Playing it safe early in your career can cost hundreds of thousands in lifetime earnings.',
        ageImpact: 2,
      },
    ],
  },

  {
    id: 'first-home-decision',
    title: 'Rent vs Buy Your First Home',
    prompt: 'You\'re tired of renting. Should you buy a house?',
    description: 'Homeownership builds equity but comes with hidden costs.',
    minAge: 28,
    maxAge: 35,
    category: 'housing',
    prerequisite: {
      minSavings: 20000,
      minIncome: 50000,
    },
    lifeStage: ['adult'],
    options: [
      {
        id: 'buy-smart',
        text: 'Buy a modest home with 20% down',
        financialImpact: {
          savings: -50000,
          debt: 200000,
          expenses: 1800,
        },
        outcome: 'You bought a $250,000 home with 20% down. No PMI, and you\'re building equity. Monthly payment: $1,800.',
        educationalNote: 'Putting 20% down avoids PMI and shows you\'re ready for homeownership. Don\'t buy until you can do this.',
        ageImpact: 1,
      },
      {
        id: 'buy-aggressive',
        text: 'Buy with 5% down (larger home)',
        financialImpact: {
          savings: -18000,
          debt: 340000,
          expenses: 2800,
        },
        outcome: 'You bought a $350,000 home with minimal down payment. Between mortgage, PMI, taxes, and insurance, you\'re paying $2,800/month!',
        educationalNote: 'Low down payments mean PMI ($100-200/month), higher interest rates, and being house-poor. Save up the 20%.',
        ageImpact: 1,
      },
      {
        id: 'keep-renting',
        text: 'Keep renting and invest the difference',
        financialImpact: {
          expenses: 1500,
          savings: 30000,
        },
        outcome: 'You kept renting at $1,500/month and invested your down payment savings. Your investments grew to $65,000 over 5 years!',
        educationalNote: 'Renting isn\'t throwing money away. When you factor in maintenance, taxes, and opportunity cost, renting can be smarter.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'wedding-costs',
    title: 'Planning Your Wedding',
    prompt: 'You\'re getting married! How much will you spend on the wedding?',
    description: 'The average wedding costs $30,000. But it doesn\'t have to.',
    minAge: 26,
    maxAge: 35,
    category: 'expenses',
    lifeStage: ['adult'],
    probability: 0.7,
    options: [
      {
        id: 'modest-wedding',
        text: 'Small wedding ($5,000)',
        financialImpact: {
          savings: -5000,
        },
        outcome: 'You had a beautiful intimate wedding with close family. You saved $25,000 that you put toward a house down payment!',
        educationalNote: 'Many couples regret spending so much on one day. Start your marriage with savings, not debt.',
        ageImpact: 1,
      },
      {
        id: 'average-wedding',
        text: 'Traditional wedding ($30,000)',
        financialImpact: {
          savings: -30000,
        },
        outcome: 'You had a beautiful traditional wedding, but it wiped out your savings. You\'ll have to rebuild your emergency fund.',
        educationalNote: 'The average wedding costs $30,000. That money could be a house down payment or retirement investment.',
        ageImpact: 1,
      },
      {
        id: 'financed-wedding',
        text: 'Dream wedding on credit ($50,000)',
        financialImpact: {
          debt: 50000,
          expenses: 500,
        },
        outcome: 'You financed your dream wedding. At $500/month, you\'ll be paying for this day for 10 years. That\'s $60,000 total with interest!',
        educationalNote: 'Going into debt for a wedding is starting your marriage on the wrong foot. Many couples who do this later divorce over money stress.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'having-kids',
    title: 'Starting a Family',
    prompt: 'You\'re thinking about having a child. Are you financially ready?',
    description: 'Kids cost about $250,000 to raise to age 18. Plus college...',
    minAge: 28,
    maxAge: 38,
    category: 'expenses',
    lifeStage: ['adult'],
    probability: 0.6,
    options: [
      {
        id: 'start-family-prepared',
        text: 'Start family (you\'ve saved ahead)',
        financialImpact: {
          expenses: 1500,
          savings: -20000,
        },
        outcome: 'You had a baby! It\'s expensive ($1,500/month), but you planned ahead and have savings to cover emergencies.',
        educationalNote: 'Kids are expensive but rewarding. Having savings and stable income before starting a family reduces financial stress.',
        ageImpact: 2,
      },
      {
        id: 'wait-longer',
        text: 'Wait a few more years to build savings',
        financialImpact: {
          savings: 25000,
        },
        outcome: 'You waited and saved aggressively. Now you\'re more financially stable and ready for kids.',
        educationalNote: 'Waiting to have kids until you\'re financially stable means less stress and more options for your family.',
        ageImpact: 2,
      },
    ],
  },

  {
    id: 'max-out-401k',
    title: 'Maxing Out Retirement',
    prompt: 'You\'re financially stable. Should you max out your 401(k)?',
    description: 'The limit is $23,000/year. That\'s aggressive savings but huge long-term benefits.',
    minAge: 30,
    maxAge: 45,
    category: 'investment',
    prerequisite: {
      minIncome: 70000,
      hasJob: true,
    },
    lifeStage: ['adult', 'middle-age'],
    options: [
      {
        id: 'max-401k',
        text: 'Max it out ($23,000/year)',
        financialImpact: {
          savings: 23000,
          income: 3000,
        },
        outcome: 'You maxed out your 401(k)! With employer match, you\'re saving $26,000/year for retirement. You\'ll be a millionaire by retirement!',
        educationalNote: 'Maxing out 401(k) in your 30s virtually guarantees a comfortable retirement. It\'s the single best wealth-building tool.',
        ageImpact: 1,
      },
      {
        id: 'standard-amount',
        text: 'Stick with 10% ($7,000/year)',
        financialImpact: {
          savings: 7000,
          income: 3000,
        },
        outcome: 'You\'re saving a solid 10% which is good, but you\'re leaving opportunity on the table.',
        educationalNote: '10% is solid, but in your peak earning years, saving more aggressively can make retirement luxurious instead of comfortable.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'investment-decisions',
    title: 'Building Your Investment Portfolio',
    prompt: 'You have $50,000 to invest. Where will you put it?',
    description: 'Investment choices now compound for decades.',
    minAge: 30,
    maxAge: 50,
    category: 'investment',
    prerequisite: {
      minSavings: 50000,
    },
    lifeStage: ['adult', 'middle-age'],
    options: [
      {
        id: 'index-funds',
        text: 'Low-cost index funds',
        financialImpact: {
          savings: -50000,
        },
        outcome: 'You invested in index funds. Over 20 years at 10% average return, your $50,000 grew to $336,000!',
        educationalNote: 'Index funds are the gold standard. Warren Buffett recommends them. Low fees, diversification, and consistent returns.',
        ageImpact: 1,
      },
      {
        id: 'individual-stocks',
        text: 'Pick individual stocks',
        financialImpact: {
          savings: -50000,
        },
        outcome: 'You tried picking stocks. Some winners, some losers. After 20 years and fees, you have $220,000. Index funds would have been $336,000.',
        educationalNote: '90% of stock pickers underperform the market. Unless you\'re a professional, stick with index funds.',
        ageImpact: 1,
      },
      {
        id: 'real-estate',
        text: 'Buy a rental property',
        financialImpact: {
          savings: -50000,
          income: 6000,
          expenses: 4000,
        },
        outcome: 'You bought a rental property. After expenses, you\'re clearing $2,000/year. Plus the property appreciated 50% over 10 years!',
        educationalNote: 'Real estate can build wealth, but requires work, management, and carries risks. Not as passive as index funds.',
        ageImpact: 1,
      },
      {
        id: 'keep-savings',
        text: 'Keep it in savings account',
        financialImpact: {},
        outcome: 'You left it in savings at 1% interest. After 20 years and inflation, you lost purchasing power. Opportunity cost: $286,000!',
        educationalNote: 'Keeping large amounts in savings guarantees you lose money to inflation. Your purchasing power decreases every year.',
        ageImpact: 1,
      },
    ],
  },

  // ===== MIDDLE AGE EVENTS (41-60) =====
  {
    id: 'kids-college',
    title: 'Paying for College',
    prompt: 'Your child is heading to college. How will you help them pay for it?',
    description: 'College costs have skyrocketed. What\'s your strategy?',
    minAge: 45,
    maxAge: 55,
    category: 'expenses',
    lifeStage: ['middle-age'],
    prerequisite: {
      minIncome: 60000,
    },
    probability: 0.5,
    options: [
      {
        id: 'saved-with-529',
        text: 'Use your 529 savings ($80,000)',
        financialImpact: {
          savings: -80000,
        },
        outcome: 'You saved in a 529 plan for 18 years. Your $40,000 in contributions grew to $80,000 tax-free. Your kid graduates debt-free!',
        educationalNote: '529 plans grow tax-free for education. Starting when kids are born, you can fund their college with less out-of-pocket.',
        ageImpact: 4,
      },
      {
        id: 'split-costs',
        text: 'Pay half, they borrow half',
        financialImpact: {
          savings: -40000,
        },
        outcome: 'You paid half ($40,000), they borrowed half. A good compromise that teaches responsibility while helping them start life.',
        educationalNote: 'Splitting college costs teaches financial responsibility while still helping. They\'ll have debt but less than average.',
        ageImpact: 4,
      },
      {
        id: 'take-parent-loans',
        text: 'Take out Parent PLUS loans',
        financialImpact: {
          debt: 80000,
          expenses: 800,
        },
        outcome: 'You took out $80,000 in Parent PLUS loans at 7% interest. You\'ll be paying $800/month until you\'re 70. This hurts your retirement.',
        educationalNote: 'Parent PLUS loans can destroy your retirement. Never borrow for your kids\' college if it jeopardizes your financial security.',
        ageImpact: 4,
      },
      {
        id: 'community-college-option',
        text: 'Encourage community college then transfer',
        financialImpact: {
          savings: -20000,
        },
        outcome: 'Smart! They did 2 years at community college then transferred. You paid $20,000 total, they graduated with same degree and no debt!',
        educationalNote: 'Community college for 2 years then transferring saves $40,000-$80,000 while earning the same degree. Best value in education.',
        ageImpact: 4,
      },
    ],
  },

  {
    id: 'peak-earning-years',
    title: 'Peak Earning Years',
    prompt: 'You\'re in your peak earning years. How will you use this income?',
    description: 'These are your highest-income years. Choose wisely.',
    minAge: 45,
    maxAge: 55,
    category: 'investment',
    prerequisite: {
      minIncome: 100000,
    },
    lifeStage: ['middle-age'],
    options: [
      {
        id: 'max-retirement',
        text: 'Max out all retirement accounts',
        financialImpact: {
          savings: 50000,
        },
        outcome: 'You maxed 401(k), IRA, and HSA. That\'s $50,000/year in retirement savings! You\'re on track for a wealthy retirement.',
        educationalNote: 'Your 40s and 50s are when you should save most aggressively. You\'re high-earning with less time until retirement.',
        ageImpact: 3,
      },
      {
        id: 'upgrade-lifestyle',
        text: 'Upgrade lifestyle to match income',
        financialImpact: {
          savings: 15000,
          expenses: 2000,
        },
        outcome: 'You bought a bigger house, nicer cars, frequent vacations. Your lifestyle improved but retirement savings didn\'t increase much.',
        educationalNote: 'Lifestyle inflation in peak earning years is the enemy of retirement security. Resist the urge to spend every raise.',
        ageImpact: 3,
      },
    ],
  },

  {
    id: 'aging-parents',
    title: 'Caring for Aging Parents',
    prompt: 'Your parents need financial help. What will you do?',
    description: 'The sandwich generation - supporting kids and parents simultaneously.',
    minAge: 48,
    maxAge: 60,
    category: 'expenses',
    lifeStage: ['middle-age'],
    probability: 0.6,
    options: [
      {
        id: 'help-within-means',
        text: 'Help within your budget ($500/month)',
        financialImpact: {
          expenses: 500,
        },
        outcome: 'You help your parents with $500/month. It\'s tight, but you\'re not sacrificing your own retirement security.',
        educationalNote: 'You can\'t pour from an empty cup. Help parents if you can, but don\'t destroy your own retirement to do it.',
        ageImpact: 3,
      },
      {
        id: 'raid-retirement',
        text: 'Withdraw from retirement to help ($50,000)',
        financialImpact: {
          savings: -50000,
          expenses: 15000,
        },
        outcome: 'You withdrew $50,000 from your 401(k). Between taxes and penalties, you paid $15,000 extra. Plus you lost decades of growth.',
        educationalNote: 'Early retirement withdrawals carry huge penalties and taxes. You lose 30-40% to taxes/penalties plus future growth.',
        ageImpact: 3,
      },
    ],
  },

  {
    id: 'mortgage-payoff',
    title: 'Pay Off Mortgage Early?',
    prompt: 'You have 10 years left on your mortgage. Should you pay it off early?',
    description: 'Being debt-free feels great, but is it the right financial move?',
    minAge: 50,
    maxAge: 60,
    category: 'debt',
    prerequisite: {
      minSavings: 100000,
      hasDebt: true,
    },
    lifeStage: ['middle-age'],
    options: [
      {
        id: 'pay-off-mortgage',
        text: 'Pay off mortgage ($80,000)',
        financialImpact: {
          savings: -80000,
          debt: -80000,
          expenses: -1500,
        },
        outcome: 'You paid off your mortgage! You\'re debt-free and your monthly expenses dropped $1,500. Peace of mind is priceless!',
        educationalNote: 'Paying off your mortgage before retirement is smart. No payments means lower expenses and less stress in retirement.',
        ageImpact: 1,
      },
      {
        id: 'invest-instead',
        text: 'Keep mortgage, invest the money',
        financialImpact: {
          savings: 80000,
        },
        outcome: 'Your mortgage is 3% interest. The market returns 10%. Your $80,000 investment will grow to $200,000+ while paying the mortgage.',
        educationalNote: 'Mathematically, investing usually beats paying off low-interest debt. But there\'s value in the security of being debt-free.',
        ageImpact: 1,
      },
    ],
  },

  // ===== SENIOR EVENTS (61-80) =====
  {
    id: 'retirement-decision',
    title: 'When to Retire?',
    prompt: 'You\'re eligible to retire. When will you stop working?',
    description: 'Retiring at different ages dramatically affects your finances.',
    minAge: 62,
    maxAge: 70,
    category: 'career',
    isRequired: true,
    lifeStage: ['senior'],
    options: [
      {
        id: 'retire-62',
        text: 'Retire at 62 (early)',
        financialImpact: {
          income: -20000,
          savings: -30000,
        },
        outcome: 'You retired at 62. Social Security is reduced 30% for life. You\'ll need your savings to last 25+ years.',
        educationalNote: 'Retiring at 62 means reduced Social Security forever and your savings must last longer. Only do if fully prepared.',
        ageImpact: 1,
      },
      {
        id: 'retire-67',
        text: 'Retire at 67 (full retirement age)',
        financialImpact: {
          income: 25000,
        },
        outcome: 'You retired at full retirement age. You get 100% of your Social Security benefit and your savings had 5 more years to grow!',
        educationalNote: 'Retiring at full retirement age (67) means full Social Security benefits and less strain on your savings.',
        ageImpact: 1,
      },
      {
        id: 'retire-70',
        text: 'Work until 70 (delayed retirement)',
        financialImpact: {
          income: 35000,
          savings: 100000,
        },
        outcome: 'You worked until 70. Your Social Security increased 24%, your savings had 8 more years to grow. You\'re very comfortable in retirement!',
        educationalNote: 'Each year you delay Social Security past 67 increases your benefit by 8%. Working to 70 can mean 50% more lifetime income.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'retirement-budget',
    title: 'Retirement Lifestyle',
    prompt: 'You\'re retired! What lifestyle will you choose?',
    description: 'Your spending in retirement determines how long your money lasts.',
    minAge: 65,
    maxAge: 70,
    category: 'expenses',
    lifeStage: ['senior'],
    options: [
      {
        id: 'modest-retirement',
        text: 'Live modestly ($3,500/month)',
        financialImpact: {
          expenses: 3500,
        },
        outcome: 'You live comfortably but modestly. Your savings should last your entire life with room for emergencies.',
        educationalNote: 'The 4% rule says you can withdraw 4% of savings yearly in retirement. Plan your lifestyle around this.',
        ageImpact: 1,
      },
      {
        id: 'expensive-retirement',
        text: 'Live it up ($7,000/month)',
        financialImpact: {
          expenses: 7000,
          savings: -40000,
        },
        outcome: 'You\'re living large! But at this rate, you might run out of money in your 80s. Consider downsizing.',
        educationalNote: 'Overspending in early retirement is dangerous. If you live to 90, your money needs to last 25-30 years.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'healthcare-costs',
    title: 'Healthcare in Retirement',
    prompt: 'Healthcare costs are rising. How will you prepare?',
    description: 'Healthcare is often the biggest expense in retirement.',
    minAge: 63,
    maxAge: 65,
    category: 'health',
    lifeStage: ['senior'],
    options: [
      {
        id: 'hsa-prepared',
        text: 'You saved in HSA for decades',
        financialImpact: {
          savings: 150000,
        },
        outcome: 'You maxed out HSA contributions for 20 years. You have $150,000 tax-free for healthcare! This covers most medical expenses.',
        educationalNote: 'HSAs are the most tax-advantaged account. Contributions are deductible, growth is tax-free, and withdrawals for healthcare are tax-free.',
        ageImpact: 1,
      },
      {
        id: 'unprepared-healthcare',
        text: 'Hope Medicare covers everything',
        financialImpact: {
          expenses: 800,
          savings: -50000,
        },
        outcome: 'Medicare doesn\'t cover everything. Premiums, copays, and prescriptions cost $800/month. Plus a health crisis cost you $50,000 out-of-pocket.',
        educationalNote: 'Medicare has gaps. Supplemental insurance, prescriptions, and dental/vision add up. Plan for $10,000-$15,000/year in healthcare.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'downsizing-home',
    title: 'Downsize Your Home?',
    prompt: 'Your home is too big now. Should you downsize?',
    description: 'A smaller home means lower expenses and potential cash infusion.',
    minAge: 65,
    maxAge: 75,
    category: 'housing',
    lifeStage: ['senior', 'elderly'],
    options: [
      {
        id: 'downsize',
        text: 'Sell and move to smaller home',
        financialImpact: {
          savings: 150000,
          expenses: -800,
        },
        outcome: 'You sold your $400,000 home and bought a $250,000 condo. You pocketed $150,000 and your expenses dropped $800/month!',
        educationalNote: 'Downsizing in retirement frees up equity and reduces expenses. Many retirees wait too long to make this move.',
        ageImpact: 1,
      },
      {
        id: 'stay-put',
        text: 'Stay in family home',
        financialImpact: {},
        outcome: 'You kept the family home. It\'s filled with memories, but the maintenance and costs are eating into your retirement savings.',
        educationalNote: 'Staying in a large home in retirement means higher property taxes, maintenance, and utilities. Consider the trade-offs.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'leaving-legacy',
    title: 'Estate Planning',
    prompt: 'You have $500,000 saved. What\'s your plan for this money?',
    description: 'How you handle your estate affects your family and legacy.',
    minAge: 70,
    maxAge: 80,
    category: 'investment',
    prerequisite: {
      minSavings: 300000,
    },
    lifeStage: ['senior', 'elderly'],
    options: [
      {
        id: 'enjoy-it',
        text: 'Spend it all enjoying retirement',
        financialImpact: {
          savings: -500000,
          expenses: 3000,
        },
        outcome: 'You spent your final years traveling and enjoying life. You died with $0, but you lived fully. "Die with zero" philosophy.',
        educationalNote: 'Some believe in spending everything and leaving no inheritance. "You can\'t take it with you." Your money, your choice.',
        ageImpact: 5,
      },
      {
        id: 'leave-inheritance',
        text: 'Live modestly and leave inheritance',
        financialImpact: {
          expenses: 2000,
        },
        outcome: 'You lived modestly and passed away with $500,000 to leave your family. They\'re grateful, and it helps jumpstart their financial lives.',
        educationalNote: 'Inheritances can transform families. Even modest amounts help kids buy homes, pay off debt, or fund grandkids\' college.',
        ageImpact: 5,
      },
      {
        id: 'charity-legacy',
        text: 'Donate most to charity',
        financialImpact: {
          savings: -400000,
        },
        outcome: 'You donated $400,000 to causes you care about. Your legacy lives on through your charitable impact.',
        educationalNote: 'Charitable giving can provide tax benefits and creates lasting impact. Many wealthy people find meaning in philanthropy.',
        ageImpact: 5,
      },
    ],
  },

  // ===== RANDOM EVENTS (Can happen at various ages) =====
  {
    id: 'emergency-medical',
    title: 'Medical Emergency!',
    prompt: 'You have a medical emergency that costs $15,000 after insurance.',
    description: 'Do you have enough emergency savings?',
    minAge: 25,
    maxAge: 65,
    category: 'health',
    probability: 0.3,
    lifeStage: ['young-adult', 'adult', 'middle-age', 'senior'],
    options: [
      {
        id: 'use-emergency-fund',
        text: 'Pay from emergency fund',
        financialImpact: {
          savings: -15000,
        },
        outcome: 'You paid cash from your emergency fund. This is exactly what it\'s for! You\'ll rebuild it over time.',
        educationalNote: 'This is why emergency funds exist. Without one, you\'d be going into high-interest debt for this emergency.',
        ageImpact: 1,
      },
      {
        id: 'payment-plan',
        text: 'Set up hospital payment plan',
        financialImpact: {
          expenses: 300,
        },
        outcome: 'The hospital set up a 0% interest payment plan for $300/month over 5 years. Better than credit card debt!',
        educationalNote: 'Hospitals often offer interest-free payment plans. Always ask before using high-interest credit cards.',
        ageImpact: 1,
      },
      {
        id: 'credit-card-medical',
        text: 'Put it on credit card',
        financialImpact: {
          debt: 15000,
          expenses: 300,
        },
        outcome: 'You charged $15,000 at 19% interest. If you only make minimum payments, you\'ll pay over $25,000 total!',
        educationalNote: 'Medical debt on credit cards is expensive. At 19% interest, you\'ll pay thousands extra. Emergency funds or payment plans are better.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'job-loss',
    title: 'You Lost Your Job!',
    prompt: 'Unexpected layoff! How long can you survive without income?',
    description: 'This is the ultimate test of your emergency fund.',
    minAge: 25,
    maxAge: 60,
    category: 'career',
    probability: 0.2,
    lifeStage: ['young-adult', 'adult', 'middle-age'],
    options: [
      {
        id: 'six-month-fund',
        text: 'Live on 6-month emergency fund',
        financialImpact: {
          savings: -18000,
          income: 50000,
        },
        outcome: 'You lived on your emergency fund for 4 months then found a new job. Crisis averted! You had the time to find the right opportunity.',
        educationalNote: 'A 6-month emergency fund gives you time to find a good job instead of taking the first offer out of desperation.',
        ageImpact: 1,
      },
      {
        id: 'no-savings',
        text: 'Scramble with no savings',
        financialImpact: {
          debt: 20000,
          income: 40000,
        },
        outcome: 'With no savings, you went into panic mode. You accumulated $20,000 in debt and had to take a lower-paying job out of desperation.',
        educationalNote: 'Without emergency savings, job loss becomes a financial disaster. You make poor decisions under pressure.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'inheritance-received',
    title: 'You Received an Inheritance',
    prompt: 'A relative left you $50,000. What will you do with it?',
    description: 'Windfalls can be life-changing or quickly wasted.',
    minAge: 30,
    maxAge: 60,
    category: 'random',
    probability: 0.3,
    lifeStage: ['adult', 'middle-age'],
    options: [
      {
        id: 'invest-inheritance',
        text: 'Invest it all for retirement',
        financialImpact: {
          savings: 50000,
        },
        outcome: 'You invested $50,000 in index funds. At 10% returns over 20 years, this will grow to $336,000! Your retirement is secure.',
        educationalNote: 'Investing windfalls instead of spending them compounds wealth. This single inheritance could fund your retirement.',
        ageImpact: 1,
      },
      {
        id: 'pay-off-debt',
        text: 'Pay off all debts',
        financialImpact: {
          savings: 50000,
          debt: -50000,
          expenses: -500,
        },
        outcome: 'You paid off all your debts! You\'re debt-free and saving $500/month in payments. This frees up cash flow for years!',
        educationalNote: 'Paying off high-interest debt with a windfall is smart. You get a guaranteed return equal to your interest rate.',
        ageImpact: 1,
      },
      {
        id: 'lifestyle-upgrade',
        text: 'New car and vacation',
        financialImpact: {
          savings: -50000,
        },
        outcome: 'You bought a new car and took a dream vacation. It was fun, but a year later, you\'re back where you started financially.',
        educationalNote: 'Most lottery winners and inheritance recipients end up broke. Windfalls should be invested, not spent.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'market-crash',
    title: 'Stock Market Crash!',
    prompt: 'The market dropped 40% overnight! Your investments lost $100,000 on paper.',
    description: 'How you react to market crashes determines your long-term success.',
    minAge: 30,
    maxAge: 60,
    category: 'investment',
    probability: 0.2,
    prerequisite: {
      minSavings: 100000,
    },
    lifeStage: ['adult', 'middle-age'],
    options: [
      {
        id: 'stay-invested',
        text: 'Stay calm and keep investing',
        financialImpact: {
          savings: 50000,
        },
        outcome: 'You stayed invested and kept contributing. 2 years later, the market recovered and your portfolio hit new highs! You bought low.',
        educationalNote: 'Markets always recover. Staying invested through crashes is how wealth is built. Time in the market beats timing the market.',
        ageImpact: 1,
      },
      {
        id: 'panic-sell',
        text: 'Sell everything!',
        financialImpact: {
          savings: -100000,
        },
        outcome: 'You panic-sold at the bottom, locking in your losses. When the market recovered 2 years later, you missed $150,000 in gains.',
        educationalNote: 'Panic selling is the worst mistake investors make. You lock in losses and miss the recovery. Never sell during crashes.',
        ageImpact: 1,
      },
      {
        id: 'buy-more',
        text: 'Buy more - everything is on sale!',
        financialImpact: {
          savings: 20000,
        },
        outcome: 'You invested $20,000 more during the crash. When the market recovered, that investment doubled! Brave move paid off huge.',
        educationalNote: 'Market crashes are buying opportunities for those with cash and courage. This is how the wealthy get wealthier.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'crypto-temptation',
    title: 'Cryptocurrency Craze',
    prompt: 'Everyone is making money on crypto! A friend says you should invest.',
    description: 'FOMO is powerful. Will you chase the trend?',
    minAge: 25,
    maxAge: 50,
    category: 'investment',
    probability: 0.4,
    lifeStage: ['young-adult', 'adult', 'middle-age'],
    options: [
      {
        id: 'small-speculation',
        text: 'Invest 5% of savings ($5,000)',
        financialImpact: {
          savings: -5000,
        },
        outcome: 'You put $5,000 in crypto. It went up 3x then crashed 80%. You lost $2,000 but learned a lesson about speculation.',
        educationalNote: 'Crypto is highly speculative. Only invest money you can afford to lose. Never more than 5% of your portfolio.',
        ageImpact: 1,
      },
      {
        id: 'all-in-crypto',
        text: 'Go all-in on crypto ($50,000)',
        financialImpact: {
          savings: -50000,
        },
        outcome: 'You put $50,000 into crypto at the peak. It crashed 70%. You lost $35,000 and seriously damaged your retirement plans.',
        educationalNote: 'Going all-in on speculative assets is gambling, not investing. Many crypto investors lost life savings in crashes.',
        ageImpact: 1,
      },
      {
        id: 'skip-crypto',
        text: 'Stick with index funds',
        financialImpact: {
          savings: 10000,
        },
        outcome: 'You ignored the hype and kept investing in index funds. While others panicked during crypto crashes, your portfolio steadily grew.',
        educationalNote: 'FOMO causes bad decisions. Boring index fund investing beats chasing trends. Slow and steady wins the race.',
        ageImpact: 1,
      },
    ],
  },

  {
    id: 'side-hustle',
    title: 'Start a Side Business?',
    prompt: 'You have an idea for a side business. Will you pursue it?',
    description: 'Extra income can accelerate wealth building.',
    minAge: 25,
    maxAge: 50,
    category: 'career',
    probability: 0.5,
    lifeStage: ['young-adult', 'adult', 'middle-age'],
    options: [
      {
        id: 'start-business',
        text: 'Start the business ($5,000 investment)',
        financialImpact: {
          savings: -5000,
          income: 15000,
        },
        outcome: 'You started a side business! After initial costs, you\'re making an extra $15,000/year. This accelerates your financial goals!',
        educationalNote: 'Side income can dramatically speed up debt payoff, savings goals, and wealth building. Many millionaires had multiple income streams.',
        ageImpact: 2,
      },
      {
        id: 'skip-business',
        text: 'Too risky, stick with day job',
        financialImpact: {},
        outcome: 'You played it safe. Your income stayed flat while friends who started side hustles pulled ahead financially.',
        educationalNote: 'Calculated risks often pay off. Diversifying income sources provides security and acceleration toward financial goals.',
        ageImpact: 2,
      },
    ],
  },
];

// Helper function to get appropriate events for current age and life stage
export const getAvailableEvents = (
  currentAge: number,
  lifeStage: LifeStage,
  simulation: any
): LifeEvent[] => {
  return lifeEvents.filter(event => {
    // Check age range
    if (currentAge < event.minAge || currentAge > event.maxAge) return false;
    
    // Check life stage
    if (!event.lifeStage.includes(lifeStage)) return false;
    
    // Check prerequisites if they exist
    if (event.prerequisite) {
      const prereq = event.prerequisite;
      if (prereq.minSavings && simulation.currentSavings < prereq.minSavings) return false;
      if (prereq.minIncome && simulation.currentIncome < prereq.minIncome) return false;
      if (prereq.hasDebt !== undefined && (simulation.currentDebt > 0) !== prereq.hasDebt) return false;
      if (prereq.hasJob !== undefined && simulation.hasJob !== prereq.hasJob) return false;
    }
    
    return true;
  });
};

// Helper to determine life stage from age
export const getLifeStageFromAge = (age: number): LifeStage => {
  if (age <= 12) return 'childhood';
  if (age <= 17) return 'teenager';
  if (age <= 25) return 'young-adult';
  if (age <= 40) return 'adult';
  if (age <= 60) return 'middle-age';
  if (age <= 80) return 'senior';
  return 'elderly';
};

// Helper to get next event (prioritizes required events)
export const getNextLifeEvent = (
  currentAge: number,
  lifeStage: LifeStage,
  simulation: any,
  completedEventIds: string[]
): LifeEvent | null => {
  const available = getAvailableEvents(currentAge, lifeStage, simulation)
    .filter(event => !completedEventIds.includes(event.id));
  
  if (available.length === 0) return null;
  
  // Prioritize required events
  const requiredEvents = available.filter(e => e.isRequired);
  if (requiredEvents.length > 0) {
    return requiredEvents[0];
  }
  
  // Handle probability for random events
  const randomEvents = available.filter(e => e.probability);
  const guaranteedEvents = available.filter(e => !e.probability);
  
  // Mix of guaranteed and random events
  const allPossible = [...guaranteedEvents];
  randomEvents.forEach(event => {
    if (Math.random() < (event.probability || 0.5)) {
      allPossible.push(event);
    }
  });
  
  if (allPossible.length === 0) return null;
  
  // Return random event from possible ones
  return allPossible[Math.floor(Math.random() * allPossible.length)];
};

