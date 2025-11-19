<img width="256" height="256" alt="Finly logo" src="https://github.com/user-attachments/assets/b62b61ff-eada-439a-9c85-c5e5cc7ae694" />

# Finly: AI-Powered Financial Life Simulator

Finly is a gamified, AI-driven financial literacy app that guides players through life-like scenarios, helping them learn budgeting, saving, investing, credit, debt, and more — all through fun, interactive decision-making.

## Features

- 🎮 **Interactive life simulation** (ages 13–68) with dynamic, AI-generated scenarios  
- 💡 **Learn financial concepts**: Budgeting, Saving, Investing, Credit, Debt & more  
- 🤖 **Personalized learning** based on age, knowledge & financial behavior  
- 📈 **AI-powered feedback** after every decision  
- 📊 **End-of-game summary** with weak points & personalized grade  
- 📱 **Cross-platform** (Web, iOS, Android via Expo)

## 🌐 Live Demo

🔗 **Play the game here:** https://finly-ai.vercel.app/

## 🧠 How Finly Works

Finly adapts to each player using:
- **FSK financial knowledge scale**
- **Behavior-based scoring categories**
- **Custom scenario generation using AI**
- **Adaptive hints & tailored explanations**

Every decision shapes your financial journey, affects your balance, knowledge, and traits, and leads to a unique end-game report.

---

# ⚙️ Installation & Setup

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For iOS: Xcode (Mac only)
- For Android: Android Studio

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

   This will open the Expo DevTools in your browser.

## Running on Devices

### Physical Device

1. Install the **Expo Go** app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code shown in the terminal or browser with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Web Browser
```bash
npm run web
```

## Project Structure

```
├── App.tsx                 # Main app component
├── App.js                  # Expo entry point
├── components/             # React Native components
│   ├── StartScreen.tsx
│   ├── GameScreen.tsx
│   ├── EndScreen.tsx
│   ├── LoadingSpinner.tsx
│   └── icons/             # SVG icons
├── services/              # Game logic and API services
│   └── backendService.ts
├── types.ts              # TypeScript type definitions
└── package.json

```

## Development

The app uses:
- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **react-native-svg** for icons
- **FastAPI Backend** for AI-powered question generation and summaries with **OpenAI SDK**

## API Endpoints

The backend provides the following endpoints:
- `POST /questionnaire` - Initialize user profile with age and literacy level
- `POST /start_life` - Start the game simulation
- `GET /next_question` - Get the next financial scenario/question
- `POST /answer_question` - Submit an answer and update game state
- `GET /summary` - Get personalized summary with weak points
- `GET /profile` - Get current user profile

## Notes

- The backend requires an OpenAI API key for question generation
- Make sure the backend is running before starting the frontend
