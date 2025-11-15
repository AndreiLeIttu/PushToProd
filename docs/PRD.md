# Product Requirements Document (PRD)
# Financial Literacy Learning App - React Native

## 1. Product Overview

### 1.1 Product Vision
A mobile-first financial literacy learning application that helps users master personal finance concepts through interactive life simulations, AI-powered guidance, and adaptive learning paths.

### 1.2 Target Audience
- Young adults (18-35) starting their financial journey
- Students entering the workforce
- Anyone seeking to improve financial literacy
- Users who prefer mobile, on-the-go learning

### 1.3 Key Features
- **Interactive Life Simulations** - Experience real financial decisions in simulated scenarios
- **AI-Powered Chat Interface** - Get personalized guidance using LLM technology
- **Concept Library** - Learn essential financial topics with quizzes
- **Progress Tracking** - Monitor learning journey and achievements
- **Mobile-First Design** - Native iOS and Android experience

## 2. Technology Stack

### 2.1 Frontend
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Library**: React Native Paper (Material Design)
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: React Context API

### 2.2 Backend
- **Database & Auth**: Supabase
- **LLM Provider**: Featherless AI API
- **Storage**: Supabase Storage (for user data)

### 2.3 Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Testing**: Expo Go (development)
- **Build**: Expo EAS Build (production)

## 3. Feature Specifications

### Phase 1: Foundation (COMPLETED ✅)
**Status**: Delivered

**Completed Features**:
- ✅ React Native project setup with Expo
- ✅ TypeScript configuration
- ✅ React Native Paper UI integration
- ✅ Navigation structure (Stack + Tabs)
- ✅ Authentication screens (Welcome, Login, Register)
- ✅ Main app screens (Dashboard, Simulation, Concepts, Profile)
- ✅ Mock authentication system with Context API
- ✅ Basic layout and styling

**Screens Implemented**:
1. **Welcome Screen** - Landing page with Get Started/Sign In
2. **Login Screen** - Email/password authentication
3. **Register Screen** - New user signup
4. **Dashboard** - Progress overview and quick actions
5. **Simulation** - Life simulation introduction
6. **Concepts** - Financial concepts library
7. **Profile** - User info and settings

### Phase 2: Backend Integration (PENDING)
**Objective**: Connect to Supabase and implement real authentication

**Tasks**:
1. Set up Supabase Cloud project
2. Create database schema:
   - `users` table (id, email, name, created_at, updated_at)
   - `user_profiles` table (user_id, progress, preferences)
   - `simulations` table (id, user_id, scenario, state, decisions, created_at)
   - `concepts` table (id, title, description, category, difficulty, content)
   - `user_progress` table (user_id, concept_id, status, quiz_score, last_accessed)
   - `chat_messages` table (id, user_id, simulation_id, role, content, timestamp)

3. Implement Supabase authentication:
   - Replace mock auth with real Supabase auth
   - Add email verification
   - Implement password reset
   - Add session management
   - Secure route protection

4. Create Supabase Edge Functions:
   - User onboarding
   - Progress calculation
   - Recommendation engine

### Phase 3: Simulation Engine (PENDING)
**Objective**: Build interactive life simulation system

**Features**:
1. **Simulation Flow**:
   - Life stage progression (student → employee → retirement)
   - Random life events (job offer, emergency, etc.)
   - Financial decision points
   - Consequence visualization
   - Real-time budget tracking

2. **Decision Types**:
   - Income decisions (job selection, side hustle)
   - Expense decisions (housing, transportation, lifestyle)
   - Savings decisions (emergency fund, investments)
   - Debt decisions (loans, credit cards, payoff strategy)

3. **AI Integration**:
   - LLM-powered scenario generation
   - Context-aware financial advice
   - Decision consequence explanation
   - Personalized guidance

4. **Simulation State Management**:
   - Save/resume simulations
   - Track decision history
   - Calculate financial outcomes
   - Generate learning insights

### Phase 4: Concept Learning System (PENDING)
**Objective**: Create structured learning modules

**Features**:
1. **Concept Categories**:
   - Budgeting & Saving
   - Credit & Debt
   - Investing & Retirement
   - Insurance & Risk Management
   - Taxes & Financial Planning

2. **Learning Content**:
   - Clear explanations
   - Real-world examples
   - Visual diagrams
   - Interactive quizzes
   - Progress tracking

3. **Adaptive Learning**:
   - Personalized recommendations based on simulation performance
   - Difficulty adjustment
   - Spaced repetition
   - Achievement system

### Phase 5: AI Chat Interface (PENDING)
**Objective**: Implement conversational learning assistant

**Features**:
1. **Chat Functionality**:
   - Real-time messaging with LLM
   - Context-aware responses
   - Simulation-specific guidance
   - Concept clarification

2. **LLM Integration** (Featherless AI):
   - Model: Meta-Llama-3.1-70B-Instruct
   - Streaming responses
   - Context window management
   - Rate limiting

3. **Chat Features**:
   - Message history
   - Code highlighting for examples
   - Save important conversations
   - Export chat transcripts

### Phase 6: Progress & Analytics (PENDING)
**Objective**: Track user learning journey

**Features**:
1. **Dashboard Metrics**:
   - Simulations completed
   - Concepts mastered
   - Time spent learning
   - Quiz scores
   - Achievements earned

2. **Progress Visualization**:
   - Learning path progress bars
   - Category completion charts
   - Skill level indicators
   - Streak tracking

3. **Achievements**:
   - Complete first simulation
   - Master all beginner concepts
   - Make 100 financial decisions
   - 7-day learning streak
   - Perfect quiz score

### Phase 7: Polish & Launch (PENDING)
**Objective**: Prepare for production release

**Tasks**:
1. **Performance Optimization**:
   - Image optimization
   - Code splitting
   - Caching strategy
   - Bundle size reduction

2. **Testing**:
   - Unit tests
   - Integration tests
   - E2E tests with Detox
   - User acceptance testing

3. **App Store Preparation**:
   - App icons and splash screens
   - Screenshots and previews
   - App Store descriptions
   - Privacy policy
   - Terms of service

4. **Launch**:
   - Submit to Apple App Store
   - Submit to Google Play Store
   - Marketing materials
   - User documentation

## 4. User Flows

### 4.1 First-Time User Flow
1. Open app → Welcome Screen
2. Tap "Get Started" → Register Screen
3. Enter name, email, password → Create account
4. Auto-login → Dashboard
5. See onboarding tooltip → Explore features
6. Tap "Start Simulation" → Begin first simulation

### 4.2 Simulation Flow
1. Dashboard → Tap "Start New Simulation"
2. Choose simulation type (or random)
3. Set initial parameters (age, income, etc.)
4. Progress through life stages
5. Make financial decisions at key moments
6. See consequences of choices
7. Get AI guidance when stuck
8. Complete simulation → See results
9. Receive concept recommendations
10. Save simulation for later review

### 4.3 Learning Flow
1. Dashboard → Tap "Browse Concepts"
2. Select category or difficulty
3. Choose concept to learn
4. Read explanation and examples
5. Take quiz to test understanding
6. See results and explanations
7. Mark concept as complete
8. Unlock next concept
9. Track progress on dashboard

## 5. Design Guidelines

### 5.1 UI/UX Principles
- **Mobile-First**: Optimized for thumb-friendly navigation
- **Material Design**: Following React Native Paper guidelines
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Smooth 60fps animations
- **Offline Support**: Core features work without internet

### 5.2 Color Palette
- **Primary**: `#6200ee` (Purple)
- **Secondary**: `#03dac6` (Teal)
- **Error**: `#b00020` (Red)
- **Background**: `#ffffff` (White)
- **Surface**: `#f5f5f5` (Light Gray)

### 5.3 Typography
- **Headlines**: 24-32px, Bold
- **Body**: 16px, Regular
- **Captions**: 12-14px, Regular
- **Font Family**: System default (SF Pro on iOS, Roboto on Android)

## 6. API Specifications

### 6.1 Supabase Schema

```sql
-- Users (handled by Supabase Auth)

-- User Profiles
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Simulations
CREATE TABLE simulations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scenario_type TEXT NOT NULL,
  state JSONB NOT NULL,
  decisions JSONB DEFAULT '[]',
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Concepts
CREATE TABLE concepts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  content JSONB NOT NULL,
  quiz_questions JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  concept_id UUID REFERENCES concepts(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
  quiz_score INTEGER,
  last_accessed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, concept_id)
);

-- Chat Messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  simulation_id UUID REFERENCES simulations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6.2 Featherless AI Integration

```typescript
// Example LLM call
const response = await fetch('https://api.featherless.ai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${FEATHERLESS_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
    messages: [
      { role: 'system', content: 'You are a financial literacy coach...' },
      { role: 'user', content: userMessage }
    ],
    stream: true,
    max_tokens: 1000,
    temperature: 0.7,
  }),
});
```

## 7. Security & Privacy

### 7.1 Authentication
- Supabase Auth with JWT tokens
- Secure password hashing (bcrypt)
- Email verification required
- Session timeout after 7 days
- Secure token storage (AsyncStorage with encryption)

### 7.2 Data Protection
- All API calls over HTTPS
- Row-level security in Supabase
- No sensitive data in logs
- GDPR compliance
- Data export functionality
- Account deletion option

### 7.3 API Security
- Rate limiting on endpoints
- API key rotation
- No hardcoded secrets
- Environment variable management

## 8. Success Metrics

### 8.1 Key Performance Indicators (KPIs)
- **User Engagement**:
  - Daily Active Users (DAU)
  - Weekly Active Users (WAU)
  - Average session duration
  - Sessions per user per day

- **Learning Metrics**:
  - Simulations completed per user
  - Concepts mastered per user
  - Quiz completion rate
  - Average quiz score

- **Retention**:
  - Day 1, 7, 30 retention rates
  - Churn rate
  - Return user rate

### 8.2 Success Criteria
- 70%+ Day 1 retention
- 40%+ Day 7 retention
- Average 3+ simulations completed per user
- 80%+ quiz pass rate
- 4.5+ star rating on app stores

## 9. Future Enhancements

### 9.1 Social Features
- Share simulation results
- Compete with friends
- Community challenges
- Discussion forums

### 9.2 Advanced Features
- AR/VR simulations
- Voice-based interactions
- Multi-language support
- Parental controls for younger users

### 9.3 Monetization (Future)
- Freemium model
- Premium simulations
- Advanced analytics
- 1-on-1 coaching

## 10. Timeline & Milestones

### Current Status: Phase 1 Complete ✅

**Next 30 Days**:
- Week 1-2: Phase 2 (Supabase integration)
- Week 3-4: Phase 3 (Basic simulation engine)

**Next 60 Days**:
- Week 5-6: Phase 4 (Concept library)
- Week 7-8: Phase 5 (AI chat interface)

**Next 90 Days**:
- Week 9-10: Phase 6 (Progress tracking)
- Week 11-12: Phase 7 (Polish & testing)
- Week 13: Launch preparation
- Week 14: App Store submission

## 11. Appendix

### 11.1 Glossary
- **Simulation**: Interactive scenario where users make financial decisions
- **Concept**: Educational content about a financial topic
- **Life Stage**: Phase in the simulation (student, employee, retiree)
- **Decision Point**: Moment in simulation requiring user choice
- **Consequence**: Result of a user's decision

### 11.2 References
- React Native Documentation
- Expo Documentation
- Supabase Documentation
- Featherless AI API Documentation
- React Navigation Documentation

---

**Document Version**: 2.0  
**Last Updated**: November 15, 2024  
**Status**: Phase 1 Complete, Phase 2 In Progress  
**Platform**: React Native (iOS, Android, Web)
