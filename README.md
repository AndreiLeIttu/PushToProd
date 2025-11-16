<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Finly: A Life Simulation Game

A React Native mobile app that teaches financial literacy through an interactive life simulation game.

## Features

- 🎮 Interactive life simulation from age 18 to 68
- 💰 Learn financial concepts: Budgeting, Saving, Investing, Credit, and Debt
- 📱 Cross-platform mobile app (iOS and Android)
- 🎯 Make financial decisions and see their impact
- 📊 Get personalized feedback and concept reviews

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For iOS: Xcode (Mac only)
- For Android: Android Studio

## Installation

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

### iOS Simulator (Mac only)
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

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
│   └── geminiService.ts
├── types.ts              # TypeScript type definitions
└── package.json

```

## Backend Integration

This app is now integrated with a FastAPI backend for generating questions and summaries.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../BackendPushToProd
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   
   The backend will run on `http://localhost:8000` by default.

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8000` by default. To change this:

1. Update the `API_BASE_URL` in `PushToProd/services/backendService.ts`
2. Or set the `REACT_APP_API_URL` environment variable (if using web build)

## Development

The app uses:
- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **react-native-svg** for icons
- **FastAPI Backend** for AI-powered question generation and summaries

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

Or use EAS Build (recommended):
```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

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
- The app connects to `http://localhost:8000` by default (update in `backendService.ts` for production)

## License

Private project
