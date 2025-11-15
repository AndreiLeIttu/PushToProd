import { LifeEvent, LifeStage } from '../types/simulation';

// Stage-based Life Scenarios
// Each life stage has 3-5 scenarios that must be completed before moving to next stage

export interface StageScenarios {
  stage: LifeStage;
  displayName: string;
  ageRange: string;
  scenarios: LifeEvent[];
}

export const stageBasedScenarios: StageScenarios[] = [
  // ===== TEENAGER STAGE (14-17) =====
  {
    stage: 'teenager',
    displayName: '🎒 Teen Years',
    ageRange: '14-17',
    scenarios: [
      {
        id: 'teen-1-high-school',
        title: '🎓 High School Hustle',
        prompt: 'High school starts! What\'s your game plan?',
        description: 'Your choices here can open doors later... or close them 😬',
        minAge: 14,
        maxAge: 14,
        category: 'education',
        lifeStage: ['teenager'],
        options: [
          {
            id: 'focus-grades',
            text: '📚 Grind hard on grades (straight A\'s)',
            financialImpact: {
              description: 'Scholarship potential unlocked!',
            },
            outcome: 'You hit the books HARD! Your GPA is fire 🔥 and scholarships are noticing you!',
            educationalNote: '💡 Good grades = scholarship money = less debt. It\'s literally free money!',
            ageImpact: 1,
          },
          {
            id: 'work-and-study',
            text: '💼 Balance school + part-time job',
            financialImpact: {
              savings: 3000,
              income: 3000,
            },
            outcome: 'You\'re making $200/week after school! Grades are solid (B\'s) and you\'re learning work ethic early. Respect! 💪',
            educationalNote: '💡 Early work experience builds resume AND savings. Future employers love seeing this!',
            ageImpact: 1,
          },
          {
            id: 'coast-through',
            text: '😎 Just vibe, do minimum to pass',
            financialImpact: {},
            outcome: 'C\'s get degrees, right? But... your college options just got way more limited and expensive 😬',
            educationalNote: '⚠️ Coasting in high school = more expensive college options = more debt. No cap.',
            ageImpact: 1,
          },
        ],
      },
      {
        id: 'teen-2-first-car',
        title: '🚗 Getting Wheels',
        prompt: 'You need a car to get around. How you getting one?',
        description: 'Transportation = freedom... but cars ain\'t cheap!',
        minAge: 16,
        maxAge: 16,
        category: 'expenses',
        lifeStage: ['teenager'],
        options: [
          {
            id: 'cheap-used',
            text: '🔧 Buy cheap used car ($2,500 cash)',
            financialImpact: {
              savings: -2500,
              expenses: 100,
            },
            outcome: 'Got yourself a reliable beater! It\'s not pretty but gets you from A to B. Insurance is cheap too! 🚙',
            educationalNote: '💡 Used cars paid in cash = no debt, lower insurance. Smart first car move!',
            ageImpact: 1,
          },
          {
            id: 'no-car-yet',
            text: '🚌 Bike + bus for now, save the money',
            financialImpact: {
              savings: 2500,
              expenses: 20,
            },
            outcome: 'Yeah it\'s less convenient, but you\'re stacking that cash! $2,500 saved while everyone else is paying insurance 💰',
            educationalNote: '💡 Not buying a car = thousands saved. Use that money for better things!',
            ageImpact: 1,
          },
          {
            id: 'new-car-loan',
            text: '✨ Finance a newer car ($18,000)',
            financialImpact: {
              debt: 18000,
              expenses: 400,
            },
            outcome: 'That new car smell hits different! But... $400/month payments for 5 years. At 17. Oof. 😰',
            educationalNote: '⚠️ Financing cars young = years of payments. That $400/month could be invested!',
            ageImpact: 1,
          },
        ],
      },
      {
        id: 'teen-3-summer-money',
        title: '☀️ Summer Plans',
        prompt: 'Summer break! What\'s the move?',
        description: '3 months off school... how you using it?',
        minAge: 16,
        maxAge: 17,
        category: 'career',
        lifeStage: ['teenager'],
        options: [
          {
            id: 'summer-job',
            text: '💰 Full-time summer job',
            financialImpact: {
              savings: 4000,
              income: 5000,
            },
            outcome: 'You grinded all summer! Made $5K and saved most of it. That\'s serious seed money! 💪',
            educationalNote: '💡 Summer jobs as a teen = $4K-5K saved. Do this 3 summers = $12K-15K for college!',
            ageImpact: 1,
          },
          {
            id: 'internship',
            text: '📊 Unpaid internship (career exp)',
            financialImpact: {},
            outcome: 'No pay, but you got connections and resume material. This could pay off big later! 🎯',
            educationalNote: '💡 Strategic internships can lead to scholarships, jobs, and network connections. Sometimes experience > money.',
            ageImpact: 1,
          },
          {
            id: 'just-chill',
            text: '🎮 Chill and game all summer',
            financialImpact: {
              expenses: 500,
            },
            outcome: 'That was a fun summer! But you spent $500 on games and made $0. Your friends who worked are way ahead now... 😬',
            educationalNote: '⚠️ Wasting summers = thousands lost. Your future self will wish you hustled!',
            ageImpact: 1,
          },
        ],
      },
    ],
  },

  // ===== YOUNG ADULT STAGE (18-25) =====
  {
    stage: 'young-adult',
    displayName: '🎓 Young Adult',
    ageRange: '18-25',
    scenarios: [
      {
        id: 'ya-1-college',
        title: '🎓 The Big Decision',
        prompt: 'You graduated! Time to decide your path...',
        description: 'This choice literally shapes everything. Choose wisely! 🎯',
        minAge: 18,
        maxAge: 18,
        category: 'education',
        lifeStage: ['young-adult'],
        options: [
          {
            id: 'state-college',
            text: '🏫 State university (4 years)',
            financialImpact: {
              debt: 40000,
              expenses: 25000,
            },
            outcome: 'College life was epic! Degree secured but $40K in student loans. Still, way better than private school! 📚',
            educationalNote: '💡 State schools = same degree, $80K less debt than private. Employers don\'t care!',
            ageImpact: 4,
          },
          {
            id: 'cc-transfer',
            text: '🧠 Community college → transfer',
            financialImpact: {
              debt: 25000,
              expenses: 15000,
            },
            outcome: 'BIG BRAIN MOVE! You hacked the system - saved $15K, same diploma. Employers can\'t even tell! 🔥',
            educationalNote: '💡 This is the cheat code! 2 years CC then transfer = $20K-40K saved!',
            ageImpact: 4,
          },
          {
            id: 'trade-school',
            text: '🔧 Trade school (plumbing/electrical)',
            financialImpact: {
              debt: 15000,
              income: 45000,
            },
            outcome: 'You skilled up! $15K debt but already earning $45K. Your college friends are jealous rn! 💰',
            educationalNote: '💡 Skilled trades = high pay, low debt. Plumbers can make $80K+!',
            ageImpact: 2,
          },
          {
            id: 'straight-work',
            text: '💼 Skip school, start working',
            financialImpact: {
              income: 30000,
            },
            outcome: 'Zero debt, making $30K. Not bad! But your pay ceiling might be lower without skills... 🤔',
            educationalNote: '💡 No college = no debt but limited growth. Learn skills to break through!',
            ageImpact: 1,
          },
        ],
      },
      {
        id: 'ya-2-first-job',
        title: '💼 First Real Paycheck',
        prompt: 'You got your first career job! 💰 Now what?',
        description: 'What you do with this money defines your financial future!',
        minAge: 22,
        maxAge: 23,
        category: 'career',
        lifeStage: ['young-adult'],
        options: [
          {
            id: 'save-hard',
            text: '💪 Live cheap, save aggressively',
            financialImpact: {
              savings: 15000,
              income: 50000,
              expenses: 1500,
            },
            outcome: 'Roommates, packed lunches, no takeout. A year later? $15K saved! Future you is SO grateful! 🙏',
            educationalNote: '💡 Your 20s = best time to save. Live like you\'re broke now, rich later!',
            ageImpact: 1,
          },
          {
            id: 'lifestyle-creep',
            text: '✨ Upgrade everything - you earned it!',
            financialImpact: {
              savings: 2000,
              income: 50000,
              expenses: 3500,
            },
            outcome: 'New apt, new clothes, eating out daily... living your best life! But only $2K saved. That\'s... not great. 😬',
            educationalNote: '⚠️ Lifestyle inflation is how people stay broke forever. Can afford ≠ should buy!',
            ageImpact: 1,
          },
        ],
      },
      {
        id: 'ya-3-housing',
        title: '🏠 Where You Gonna Live?',
        prompt: 'Time to figure out your living situation...',
        description: 'Biggest expense of your life. Choose smart!',
        minAge: 23,
        maxAge: 24,
        category: 'housing',
        lifeStage: ['young-adult'],
        options: [
          {
            id: 'roommates',
            text: '🤝 Roommates ($600/month)',
            financialImpact: {
              expenses: 600,
              savings: 12000,
            },
            outcome: 'Less privacy but WAY more savings! $600/month = you\'re saving $1K+ vs living alone. Smart! 💰',
            educationalNote: '💡 Roommates in your 20s = literally thousands saved per year. Use it wisely!',
            ageImpact: 1,
          },
          {
            id: 'own-apartment',
            text: '🏢 Own apartment ($1,500/month)',
            financialImpact: {
              expenses: 1500,
              savings: 3000,
            },
            outcome: 'Your own place feels amazing! But $1,500/month + utilities = most of your paycheck. Savings taking a hit... 😅',
            educationalNote: '⚠️ Living alone young = thousands less saved. Privacy is expensive!',
            ageImpact: 1,
          },
        ],
      },
      {
        id: 'ya-4-emergency-fund',
        title: '🚨 Emergency Fund?',
        prompt: 'Everyone talks about emergency funds... should you?',
        description: 'Experts say save 3-6 months expenses. That\'s like... a lot tho',
        minAge: 24,
        maxAge: 25,
        category: 'savings',
        lifeStage: ['young-adult'],
        options: [
          {
            id: 'build-fund',
            text: '💰 Build 6-month fund ($9,000)',
            financialImpact: {
              savings: 9000,
            },
            outcome: 'You sacrificed and saved $9K over a year. When your car broke down? Paid cash. No stress. THIS is why! 🎯',
            educationalNote: '💡 Emergency funds = insurance against life. Without it, small problems become debt disasters!',
            ageImpact: 1,
          },
          {
            id: 'skip-fund',
            text: '😬 YOLO, save whatever\'s left',
            financialImpact: {
              savings: 500,
            },
            outcome: 'You kept meaning to save but... life happened. Then your car broke ($2K) and you had to credit card it. Oof. 💳😰',
            educationalNote: '⚠️ No emergency fund = every unexpected expense becomes debt. Don\'t learn this the hard way!',
            ageImpact: 1,
          },
        ],
      },
      {
        id: 'ya-5-401k',
        title: '📈 Your Job Offers 401(k) Matching',
        prompt: 'HR keeps bugging you about retirement... at 25?! 🙄',
        description: 'They match 3%. That\'s like... free money? But retirement is SO far away...',
        minAge: 25,
        maxAge: 25,
        category: 'investment',
        lifeStage: ['young-adult'],
        options: [
          {
            id: 'max-match',
            text: '💰 Do it! Get that free money (3%)',
            financialImpact: {
              savings: 1500,
              income: 1500,
            },
            outcome: 'You put in $1,500, they added $1,500. That\'s $3K/year for retirement. At 25! Future you is RICH! 🔥',
            educationalNote: '💡 Employer match = instant 100% return. It\'s literally free money. ALWAYS take it!',
            ageImpact: 1,
          },
          {
            id: 'skip-401k',
            text: '🤷 Nah, retirement is decades away',
            financialImpact: {
              income: -1500,
            },
            outcome: 'You skipped it. That\'s $1,500/year in free money you just said no to. That could be $200K by retirement... 💀',
            educationalNote: '⚠️ Not taking employer match = refusing a 3% raise. It\'s the biggest money mistake young people make!',
            ageImpact: 1,
          },
        ],
      },
    ],
  },

  // ===== ADULT STAGE (26-40) =====
  {
    stage: 'adult',
    displayName: '💼 Adulthood',
    ageRange: '26-40',
    scenarios: [
      {
        id: 'adult-1-promotion',
        title: '📊 Career Moves',
        prompt: 'Your boss offers you a promotion. Big raise, but way more stress...',
        description: 'More money but more responsibility. Is it worth?',
        minAge: 28,
        maxAge: 28,
        category: 'career',
        lifeStage: ['adult'],
        options: [
          {
            id: 'take-promo',
            text: '🚀 Take it! (+$20K/year)',
            financialImpact: {
              income: 20000,
              expenses: 500,
            },
            outcome: '$20K raise! Yeah it\'s more work, but that\'s $20K EXTRA every single year. Over career? That\'s $600K+! 💰💰',
            educationalNote: '💡 Early promotions compound over your lifetime. Each raise builds on the last!',
            ageImpact: 2,
          },
          {
            id: 'stay-comfy',
            text: '😌 Stay comfortable, same role',
            financialImpact: {},
            outcome: 'You kept your chill job. But your coworker took the promo and is now making $20K more than you... forever. 😬',
            educationalNote: '⚠️ Playing it safe early = hundreds of thousands lost over career. Take calculated risks!',
            ageImpact: 2,
          },
        ],
      },
      {
        id: 'adult-2-house',
        title: '🏠 Buy a House?',
        prompt: 'Rent is "throwing money away" they say... time to buy?',
        description: 'Biggest purchase of your life. Don\'t mess this up!',
        minAge: 30,
        maxAge: 32,
        category: 'housing',
        lifeStage: ['adult'],
        options: [
          {
            id: 'buy-house',
            text: '🏡 Buy with 20% down ($250K house)',
            financialImpact: {
              savings: -50000,
              debt: 200000,
              expenses: 1800,
            },
            outcome: 'You\'re a homeowner! $1,800/month mortgage but you\'re building equity. No more landlord! 🔑',
            educationalNote: '💡 20% down = no PMI = hundreds saved monthly. Don\'t buy with less!',
            ageImpact: 1,
          },
          {
            id: 'keep-renting',
            text: '🏢 Keep renting, invest the difference',
            financialImpact: {
              expenses: 1500,
              savings: 30000,
            },
            outcome: 'Still renting but your $50K stayed invested. It grew to $75K! Plus no maintenance costs. Not mad about it! 📈',
            educationalNote: '💡 Renting isn\'t "wasting money" - it\'s paying for flexibility. Sometimes it\'s smarter!',
            ageImpact: 1,
          },
        ],
      },
      {
        id: 'adult-3-wedding',
        title: '💍 Getting Married!',
        prompt: 'You\'re getting married! How much to spend on the wedding?',
        description: 'Everyone says weddings are expensive. But like... how expensive?',
        minAge: 30,
        maxAge: 35,
        category: 'expenses',
        lifeStage: ['adult'],
        options: [
          {
            id: 'simple-wedding',
            text: '💕 Small ceremony ($5,000)',
            financialImpact: {
              savings: -5000,
            },
            outcome: 'Intimate wedding with close people. Spent $5K, kept $25K for a house down payment. Future you is grateful! 🏠',
            educationalNote: '💡 Many couples regret expensive weddings. One day vs. decades of financial security? Easy choice.',
            ageImpact: 1,
          },
          {
            id: 'big-wedding',
            text: '🎉 Dream wedding ($30,000)',
            financialImpact: {
              savings: -30000,
            },
            outcome: 'Amazing day! But you just spent a house down payment on 6 hours. Savings = wiped. Back to square one... 😰',
            educationalNote: '⚠️ $30K wedding = no house, no emergency fund. That "dream day" might cause nightmare years.',
            ageImpact: 1,
          },
        ],
      },
      {
        id: 'adult-4-kids',
        title: '👶 Starting a Family',
        prompt: 'Thinking about having a baby. Are you financially ready?',
        description: 'Kids cost $250K to raise to 18. Plus college... 😱',
        minAge: 32,
        maxAge: 35,
        category: 'expenses',
        lifeStage: ['adult'],
        options: [
          {
            id: 'have-kids-ready',
            text: '👶 Start family (prepared with savings)',
            financialImpact: {
              expenses: 1500,
              savings: -20000,
            },
            outcome: 'Baby time! It\'s expensive ($1,500/month) but you planned ahead and have emergency savings. You got this! 💪',
            educationalNote: '💡 Kids with financial prep = way less stress. Save first, baby second!',
            ageImpact: 3,
          },
          {
            id: 'wait-save-more',
            text: '⏰ Wait, save more first',
            financialImpact: {
              savings: 30000,
            },
            outcome: 'You waited and stacked cash. Now you\'re super ready financially and mentally. Good call! 🎯',
            educationalNote: '💡 Waiting to have kids until stable = better outcomes for everyone. It\'s okay to wait!',
            ageImpact: 3,
          },
        ],
      },
    ],
  },

  // ===== MIDDLE-AGE STAGE (41-60) =====
  {
    stage: 'middle-age',
    displayName: '🏆 Middle Age',
    ageRange: '41-60',
    scenarios: [
      {
        id: 'ma-1-peak-earning',
        title: '💰 Peak Earning Years',
        prompt: 'You\'re making more than ever. What\'s the move?',
        description: 'Your 40s-50s = highest income. Use it wisely!',
        minAge: 45,
        maxAge: 45,
        category: 'investment',
        lifeStage: ['middle-age'],
        options: [
          {
            id: 'max-retirement',
            text: '🎯 Max out ALL retirement accounts',
            financialImpact: {
              savings: 40000,
            },
            outcome: 'You\'re putting away $40K/year! That\'s INSANE. You\'re gonna retire SO rich! 🔥💰',
            educationalNote: '💡 Maxing retirement in 40s-50s = multi-million dollar retirement. This is the time!',
            ageImpact: 5,
          },
          {
            id: 'upgrade-lifestyle',
            text: '✨ Finally live a little! Upgrade everything',
            financialImpact: {
              savings: 10000,
              expenses: 2000,
            },
            outcome: 'Nicer house, nicer car, fancy vacations. Living good! But retirement savings didn\'t increase much... 😬',
            educationalNote: '⚠️ Lifestyle inflation in peak years = retirement delayed. Resist the urge!',
            ageImpact: 5,
          },
        ],
      },
      {
        id: 'ma-2-kids-college',
        title: '🎓 Kids Going to College',
        prompt: 'Your kid got into college. How you paying for this?',
        description: '$40K/year for 4 years. That\'s... a lot. 😰',
        minAge: 48,
        maxAge: 50,
        category: 'expenses',
        lifeStage: ['middle-age'],
        options: [
          {
            id: 'saved-529',
            text: '💰 Use 529 savings ($80K saved)',
            financialImpact: {
              savings: -80000,
            },
            outcome: 'You started saving when they were born. Your $40K in contributions grew to $80K tax-free! They graduate debt-free! 🎉',
            educationalNote: '💡 529 plans = cheat code for college. Started early = tax-free growth!',
            ageImpact: 4,
          },
          {
            id: 'split-cost',
            text: '🤝 Pay half, they borrow half',
            financialImpact: {
              savings: -40000,
            },
            outcome: 'Good compromise! You helped, they have skin in the game. They\'ll have debt but way less than average. 💪',
            educationalNote: '💡 Splitting costs teaches responsibility while still helping. Balanced approach!',
            ageImpact: 4,
          },
          {
            id: 'parent-loans',
            text: '😰 Take out Parent PLUS loans',
            financialImpact: {
              debt: 80000,
              expenses: 800,
            },
            outcome: '$80K in YOUR name at 7% interest. You\'ll be paying $800/month until you\'re 70. This HURTS your retirement... 💀',
            educationalNote: '⚠️ Parent PLUS loans = retirement destroyer. Never sacrifice your security for their college!',
            ageImpact: 4,
          },
        ],
      },
      {
        id: 'ma-3-aging-parents',
        title: '👵 Aging Parents Need Help',
        prompt: 'Your parents need financial help. What do you do?',
        description: 'The sandwich generation is real. Kids + parents = expensive!',
        minAge: 52,
        maxAge: 55,
        category: 'expenses',
        lifeStage: ['middle-age'],
        options: [
          {
            id: 'help-affordable',
            text: '💙 Help within budget ($500/month)',
            financialImpact: {
              expenses: 500,
            },
            outcome: 'You\'re helping with $500/month. It\'s tight but you\'re not destroying your own retirement. Family matters. 💙',
            educationalNote: '💡 Help parents if you can, but don\'t sacrifice your own retirement. Can\'t pour from empty cup!',
            ageImpact: 3,
          },
          {
            id: 'raid-retirement',
            text: '😰 Pull from retirement ($50K)',
            financialImpact: {
              savings: -50000,
              expenses: 15000,
            },
            outcome: 'You withdrew $50K from 401(k). After taxes/penalties you paid $15K extra. Plus lost decades of growth. This hurt... 💀',
            educationalNote: '⚠️ Early retirement withdrawals = 30-40% penalty + lost growth. Almost never worth it!',
            ageImpact: 3,
          },
        ],
      },
      {
        id: 'ma-4-mortgage-payoff',
        title: '🏠 Pay Off Mortgage Early?',
        prompt: 'You could pay off your mortgage now. Should you?',
        description: 'Debt-free sounds amazing... but is it the smart move?',
        minAge: 55,
        maxAge: 58,
        category: 'debt',
        lifeStage: ['middle-age'],
        options: [
          {
            id: 'pay-off',
            text: '✅ Pay it off! ($80K)',
            financialImpact: {
              savings: -80000,
              debt: -80000,
              expenses: -1500,
            },
            outcome: 'NO MORE MORTGAGE! Debt-free baby! Your expenses dropped $1,500/month. Peace of mind is priceless! 😌',
            educationalNote: '💡 Paying off mortgage before retirement = lower expenses = need less savings. Smart move!',
            ageImpact: 2,
          },
          {
            id: 'invest-instead',
            text: '📈 Keep mortgage, invest the $80K',
            financialImpact: {
              savings: 80000,
            },
            outcome: 'Your mortgage is 3%, market returns 10%. Math says invest! Your $80K grew to $175K over 10 years! 📈',
            educationalNote: '💡 Low interest debt + high return investments = mathematically optimal. But peace of mind matters too!',
            ageImpact: 2,
          },
        ],
      },
    ],
  },

  // ===== SENIOR STAGE (61-80) =====
  {
    stage: 'senior',
    displayName: '🌅 Senior Years',
    ageRange: '61-80',
    scenarios: [
      {
        id: 'senior-1-retire-when',
        title: '⏰ When to Retire?',
        prompt: 'You can retire now at 62, or wait. What do?',
        description: 'Retire age = HUGE impact on your finances!',
        minAge: 62,
        maxAge: 62,
        category: 'career',
        lifeStage: ['senior'],
        options: [
          {
            id: 'retire-62',
            text: '🏖️ Retire now at 62',
            financialImpact: {
              income: -20000,
              savings: -30000,
            },
            outcome: 'Freedom! But Social Security is reduced 30% FOREVER. Your savings need to last 25+ years. Hope you saved enough... 😬',
            educationalNote: '⚠️ Early retirement = reduced benefits forever + longer time to make money last. Risky!',
            ageImpact: 1,
          },
          {
            id: 'retire-67',
            text: '💼 Wait until 67 (full retirement)',
            financialImpact: {
              income: 30000,
              savings: 100000,
            },
            outcome: 'You worked 5 more years. Full Social Security + $100K more saved. Your retirement is WAY more comfortable! 💰',
            educationalNote: '💡 Every year you wait = higher benefits + more savings. Worth it if you can!',
            ageImpact: 5,
          },
        ],
      },
      {
        id: 'senior-2-healthcare',
        title: '🏥 Healthcare Planning',
        prompt: 'Medicare doesn\'t cover everything. How prepared are you?',
        description: 'Healthcare in retirement = your biggest expense probably',
        minAge: 64,
        maxAge: 65,
        category: 'health',
        lifeStage: ['senior'],
        options: [
          {
            id: 'hsa-ready',
            text: '💰 You saved in HSA for 20 years',
            financialImpact: {
              savings: 150000,
            },
            outcome: 'You maxed HSA contributions for decades. $150K TAX-FREE for healthcare! You\'re SET! 🔥',
            educationalNote: '💡 HSA = triple tax advantage. The BEST retirement account nobody uses!',
            ageImpact: 1,
          },
          {
            id: 'hope-medicare',
            text: '🤞 Hope Medicare covers it all',
            financialImpact: {
              expenses: 800,
              savings: -30000,
            },
            outcome: 'Medicare has gaps. Premiums, copays, prescriptions = $800/month. Plus health emergency cost $30K. Oof. 💀',
            educationalNote: '⚠️ Medicare doesn\'t cover everything! Plan for $10K-15K/year in healthcare costs!',
            ageImpact: 1,
          },
        ],
      },
      {
        id: 'senior-3-downsize',
        title: '🏠 Downsize Your Home?',
        prompt: 'House is way too big now. Sell and move smaller?',
        description: 'Smaller home = less expenses + cash freed up',
        minAge: 68,
        maxAge: 70,
        category: 'housing',
        lifeStage: ['senior'],
        options: [
          {
            id: 'downsize',
            text: '✅ Sell, move to smaller place',
            financialImpact: {
              savings: 150000,
              expenses: -800,
            },
            outcome: 'Sold for $400K, bought condo for $250K. Pocketed $150K + your expenses dropped $800/month! Smart! 🧠',
            educationalNote: '💡 Downsizing = free up equity + lower expenses. Many wait too long to do this!',
            ageImpact: 2,
          },
          {
            id: 'stay-house',
            text: '🏠 Stay in family home',
            financialImpact: {},
            outcome: 'Kept the house. Full of memories! But the maintenance, taxes, utilities eating your retirement savings... 😅',
            educationalNote: '⚠️ Big house in retirement = higher costs you might not need. Consider trade-offs!',
            ageImpact: 2,
          },
        ],
      },
      {
        id: 'senior-4-legacy',
        title: '💎 Your Legacy',
        prompt: 'You have $500K saved. What\'s your plan?',
        description: 'Spend it all or leave inheritance? Your choice!',
        minAge: 75,
        maxAge: 80,
        category: 'investment',
        lifeStage: ['senior'],
        options: [
          {
            id: 'spend-enjoy',
            text: '🌍 Spend it enjoying life!',
            financialImpact: {
              savings: -400000,
              expenses: 3000,
            },
            outcome: 'You traveled, enjoyed hobbies, lived FULLY. Died with $100K left. "Die with zero" accomplished! 🎉',
            educationalNote: '💡 Some say spend it all - you earned it! Can\'t take it with you. Your call!',
            ageImpact: 5,
          },
          {
            id: 'leave-inheritance',
            text: '👨‍👩‍👧‍👦 Leave inheritance for family',
            financialImpact: {
              expenses: 2000,
            },
            outcome: 'You lived modestly and passed with $500K to family. Your kids bought homes, paid off debt. Your legacy lives on! 💙',
            educationalNote: '💡 Inheritances transform families. Even modest amounts can change kids\' financial lives!',
            ageImpact: 5,
          },
        ],
      },
    ],
  },
];

// Helper to get scenarios for a specific life stage
export const getScenariosForStage = (stage: LifeStage): LifeEvent[] => {
  const stageData = stageBasedScenarios.find(s => s.stage === stage);
  return stageData?.scenarios || [];
};

// Helper to get stage info
export const getStageInfo = (stage: LifeStage): StageScenarios | undefined => {
  return stageBasedScenarios.find(s => s.stage === stage);
};


