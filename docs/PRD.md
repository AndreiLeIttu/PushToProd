# Product Requirements Document (PRD)
# Financial Literacy Learning App - React Native

**Version**: 2.0  
**Last Updated**: November 15, 2024  
**Platform**: React Native (iOS, Android, Web)  
**Status**: Foundation Complete → Building Core Features

---

## 📱 Product Vision

A mobile-first financial literacy app that teaches personal finance through **interactive life simulations**. Users make real financial decisions in simulated scenarios, learn from outcomes, and build practical money management skills.

---

## 🎯 Core Value Proposition

**"Learn personal finance by living it, not just reading about it"**

- **Interactive**: Make decisions, see consequences immediately
- **Practical**: Real-world scenarios users will actually face
- **Guided**: AI-powered advice when you need it
- **Mobile**: Learn anywhere, anytime

---

## 📊 Current State

### ✅ What's Built (Foundation)

**Tech Stack**:
- React Native with Expo
- TypeScript
- React Native Paper (UI)
- React Navigation (Bottom Tabs + Stack)
- Supabase client configured (not connected yet)

**Screens Implemented**:
1. **Dashboard** - Progress overview and quick actions
2. **Simulation** - Life simulation launcher
3. **Concepts** - Financial topics library
4. **Profile** - User settings

**What Works**:
- ✅ Full navigation structure
- ✅ Bottom tab navigation
- ✅ Clean UI with Material Design
- ✅ Runs on iOS, Android, and Web
- ✅ Development environment setup

**What's NOT Working**:
- ❌ No actual simulations yet (just placeholder)
- ❌ No real concepts/content
- ❌ No database connection
- ❌ No AI integration
- ❌ No user data persistence

---

## 🚀 Development Roadmap

### **PHASE 1: Core Simulation Engine** ⏳ NEXT
**Goal**: Build the simulation system that makes the app useful

#### Step 1.1: Design Simulation Data Structure
```typescript
type Simulation = {
  id: string;
  title: string;
  currentAge: number;
  currentSavings: number;
  currentIncome: number;
  currentExpenses: number;
  decisions: Decision[];
  stage: 'student' | 'early-career' | 'mid-career' | 'retirement';
  status: 'active' | 'completed';
}

type Decision = {
  id: string;
  prompt: string;
  options: Option[];
  timestamp: Date;
  chosen: Option | null;
}

type Option = {
  id: string;
  text: string;
  financialImpact: {
    savings?: number;
    income?: number;
    expenses?: number;
  };
  outcome: string;
}
```

**Files to Create**:
- `src/types/simulation.ts` - Type definitions
- `src/hooks/useSimulation.ts` - Simulation state management
- `src/data/scenarios.ts` - Pre-built scenarios

**Deliverable**: Data structures defined and tested

---

#### Step 1.2: Build Simulation State Management
**What to Build**:
- React Context for simulation state
- Functions to progress simulation
- Decision tracking
- Financial calculations

**Files to Create**:
- `src/contexts/SimulationContext.tsx`
- `src/utils/financialCalculations.ts`

**Deliverable**: Working simulation state that can track decisions and calculate outcomes

---

#### Step 1.3: Create Simulation Flow UI
**What to Build**:
- Start simulation screen
- Decision prompt screen
- Outcome display screen
- Financial dashboard widget
- Progress indicator

**Files to Create**:
- `src/screens/SimulationFlowScreen.tsx`
- `src/screens/SimulationResultScreen.tsx`
- `src/components/DecisionCard.tsx`
- `src/components/FinancialDashboard.tsx`

**Navigation Updates**:
- Add simulation flow to navigation stack
- Handle simulation completion flow

**Deliverable**: User can start simulation, make decisions, see outcomes

---

#### Step 1.4: Add Sample Scenarios
**What to Build**:
- 3-5 pre-built scenarios:
  1. **First Job** - budgeting, savings, lifestyle choices
  2. **Emergency Fund** - unexpected expenses, insurance
  3. **Debt Management** - student loans, credit cards
  4. **First Investment** - stocks, 401k, compound interest
  5. **Big Purchase** - house, car, rent vs buy

**Files to Update**:
- `src/data/scenarios.ts` - Add complete scenarios with decisions

**Deliverable**: Users can play through complete financial simulations

---

#### Step 1.5: Local Data Persistence
**What to Build**:
- Save simulations to AsyncStorage
- Load previous simulations
- Track completion history

**Packages to Install**:
```bash
# Already installed: @react-native-async-storage/async-storage
```

**Files to Create**:
- `src/lib/storage.ts` - Storage utilities

**Deliverable**: Simulations persist between app restarts

---

### **PHASE 2: Content Library** 
**Goal**: Add educational content users can learn from

#### Step 2.1: Concept Data Structure
```typescript
type Concept = {
  id: string;
  title: string;
  category: 'budgeting' | 'saving' | 'credit' | 'investing' | 'debt';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: {
    summary: string;
    explanation: string;
    examples: string[];
    keyTakeaways: string[];
  };
  quiz: QuizQuestion[];
}
```

**Deliverable**: Concept type definitions

---

#### Step 2.2: Build Concept Library
**What to Build**:
- 15-20 financial concepts with full content
- Organized by category
- Difficulty progression

**Files to Create**:
- `src/data/concepts.ts` - All concept content

**Topics to Cover**:
- **Budgeting**: 50/30/20 rule, zero-based budget
- **Saving**: Emergency fund, savings goals
- **Credit**: Credit scores, credit cards
- **Debt**: Good vs bad debt, payoff strategies
- **Investing**: Compound interest, diversification
- **Insurance**: Types, when you need it
- **Taxes**: Tax brackets, deductions

**Deliverable**: Complete concept library

---

#### Step 2.3: Concept Learning UI
**What to Build**:
- Concept detail screen
- Reading progress tracker
- Quiz interface
- Results feedback

**Files to Create**:
- `src/screens/ConceptDetailScreen.tsx`
- `src/screens/ConceptQuizScreen.tsx`
- `src/components/QuizQuestion.tsx`

**Deliverable**: Users can read concepts and take quizzes

---

### **PHASE 3: AI Integration** 
**Goal**: Add intelligent guidance using LLM

#### Step 3.1: Featherless AI Setup
**What to Build**:
- API client for Featherless
- Streaming response handler
- Context management

**Files to Create**:
- `src/lib/ai.ts` - AI API client
- `src/hooks/useAI.ts` - AI hook

**API Configuration**:
```typescript
const AI_CONFIG = {
  baseURL: 'https://api.featherless.ai/v1',
  model: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
  apiKey: process.env.FEATHERLESS_API_KEY,
};
```

**Deliverable**: Working AI client that can generate responses

---

#### Step 3.2: AI-Powered Simulation Advice
**What to Build**:
- "Ask AI" button during simulations
- Context-aware advice based on:
  - Current financial situation
  - Decision being made
  - Previous choices
- Natural language explanations

**Files to Update**:
- `src/screens/SimulationFlowScreen.tsx`
- `src/components/AIAdvisor.tsx` (new)

**Deliverable**: Users can get AI advice during simulations

---

#### Step 3.3: AI Chat Interface
**What to Build**:
- General financial Q&A chat
- Conversation history
- Quick prompts/suggestions

**Files to Create**:
- `src/screens/ChatScreen.tsx`
- `src/components/ChatMessage.tsx`
- `src/components/ChatInput.tsx`

**Add to Navigation**:
- New tab: "Chat" with chat icon

**Deliverable**: Full chat interface for financial questions

---

### **PHASE 4: Backend & Data** 
**Goal**: Add cloud database and user accounts

#### Step 4.1: Supabase Database Setup
**Database Schema**:
```sql
-- Users table (Supabase Auth handles this)

-- Simulations
CREATE TABLE simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Concept Progress
CREATE TABLE concept_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  concept_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  quiz_score INTEGER,
  last_accessed TIMESTAMPTZ,
  UNIQUE(user_id, concept_id)
);

-- Chat History
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Tasks**:
1. Create Supabase project
2. Run migrations
3. Set up Row Level Security

**Deliverable**: Database ready for app

---

#### Step 4.2: Connect App to Supabase
**What to Update**:
- Replace AsyncStorage with Supabase
- Sync simulations to cloud
- Save concept progress
- Store chat history

**Files to Update**:
- `src/lib/supabase.ts` - Add CRUD functions
- `src/contexts/SimulationContext.tsx` - Use Supabase
- `src/hooks/useAI.ts` - Save chat history

**Deliverable**: All data syncs to cloud

---

#### Step 4.3: Add Authentication (Optional)
**What to Build**:
- Email/password auth
- Anonymous/guest mode
- Simple login/register screens

**Files to Create**:
- `src/screens/AuthScreen.tsx`
- `src/contexts/AuthContext.tsx`

**Deliverable**: Users can create accounts (but guest mode still works)

---

### **PHASE 5: Polish & Launch** 
**Goal**: Make it production-ready

#### Step 5.1: Enhance UI/UX
- Add animations and transitions
- Improve loading states
- Add empty states
- Better error handling
- Accessibility improvements

#### Step 5.2: Testing
- Test all simulation scenarios
- Test on iOS and Android devices
- Performance optimization
- Bug fixes

#### Step 5.3: App Store Preparation
- Create app icon
- Design splash screen
- Write app descriptions
- Take screenshots
- Create privacy policy

#### Step 5.4: Launch
- Submit to Apple App Store
- Submit to Google Play Store
- Create landing page
- Announce launch

---

## 🎯 Success Metrics

### Phase 1 Success Criteria:
- Users can complete a full simulation
- Decisions impact financial outcomes
- Results are clear and educational

### Phase 2 Success Criteria:
- 15+ concepts available
- Users can read and quiz themselves
- Progression feels natural

### Phase 3 Success Criteria:
- AI provides helpful advice
- Response time < 3 seconds
- Advice is contextually relevant

### Overall Launch Goals:
- 1000+ downloads in first month
- 4+ star rating
- 50%+ completion rate on first simulation

---

## 📐 Technical Architecture

```
App Structure:
├── src/
│   ├── screens/          # All app screens
│   ├── components/       # Reusable UI components
│   ├── navigation/       # Navigation config
│   ├── contexts/         # State management
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities (API, storage, etc)
│   ├── types/            # TypeScript types
│   └── data/             # Static content (scenarios, concepts)
```

**Data Flow**:
1. User opens app → Loads from AsyncStorage/Supabase
2. Starts simulation → SimulationContext manages state
3. Makes decisions → Calculations update finances
4. Needs help → AI generates contextual advice
5. Completes → Results saved locally + cloud

---

## 🚦 Development Priority

**NOW (Phase 1)**: Focus 100% on simulation engine
- This is the core value proposition
- Everything else builds on this
- Must be fun and educational

**NEXT (Phase 2)**: Add concepts
- Complements simulations
- Users can learn deeper

**THEN (Phase 3)**: Add AI
- Makes experience personalized
- Premium feature

**FINALLY (Phase 4-5)**: Backend & polish
- Needed for long-term
- Not critical for MVP

---

## 💡 Key Design Principles

1. **Mobile-First**: Every feature designed for phone use
2. **Instant Gratification**: See results immediately
3. **No Reading Walls**: Keep content bite-sized
4. **Safe to Fail**: Simulations are practice, not judgment
5. **Progressive Complexity**: Start simple, get deeper

---

## 🛠️ Development Guidelines

### Before Starting Each Phase:
1. Read this PRD section
2. Create detailed task list
3. Estimate time (be realistic)
4. Test on real device

### During Development:
1. Commit often with clear messages
2. Test on iOS and Android
3. Keep performance in mind
4. Document complex logic

### After Completing Phase:
1. Full testing pass
2. Get feedback from users
3. Update this PRD
4. Plan next phase

---

## 📞 Getting Started with Phase 1

### Immediate Next Steps:

1. **Create type definitions** (`src/types/simulation.ts`)
2. **Build context** (`src/contexts/SimulationContext.tsx`)
3. **Create first scenario** (First Job scenario)
4. **Build decision UI** (Simple but functional)
5. **Test complete flow** (Start → Decisions → Results)

### Estimated Timeline:
- **Phase 1**: 1-2 weeks
- **Phase 2**: 1 week
- **Phase 3**: 1 week
- **Phase 4**: 1 week
- **Phase 5**: 1 week

**Total to MVP**: ~5-6 weeks of focused development

---

## 🎓 Example Simulation Flow

**Scenario: First Job**

1. **Start Screen**:
   - "You just graduated college and got your first job!"
   - Starting salary: $50,000/year
   - Savings: $1,000
   - Student loans: $25,000

2. **Decision 1 - Housing**:
   - Rent cheap apartment ($800/mo) → Save more money
   - Rent nice apartment ($1,200/mo) → Better lifestyle, less savings
   - Live with roommates ($500/mo) → Maximum savings

3. **Outcome**:
   - Show monthly budget breakdown
   - Explain impact of choice
   - Show running totals

4. **Decision 2 - Savings**:
   - Save 20% of income → Build emergency fund
   - Save 10% of income → Balanced approach
   - Save nothing → Live paycheck to paycheck

5. **Random Event**:
   - Car breaks down ($1,000 repair)
   - Do you have emergency fund? Consequences differ

6. **Final Results**:
   - After 12 months: Show net worth change
   - Lessons learned
   - Recommended concepts to study

---

## 📚 Appendix

### Useful Resources:
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [Featherless AI Docs](https://featherless.ai/docs)

### Financial Content Sources:
- r/personalfinance wiki
- NerdWallet articles
- Investopedia
- The Balance

---

**Ready to build?** Start with Phase 1, Step 1.1 → Create simulation types! 🚀
