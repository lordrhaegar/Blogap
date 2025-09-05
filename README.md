# Simple Blog App

A simple React Native app that displays blog posts from JSONPlaceholder API. Built with TypeScript and Expo.

## Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g @expo/cli`

### Installation & Running

```bash
# Clone and install
git clone https://github.com/lordrhaegar/Blogap.git
cd Blogap
npm install

# Start the app
npm start
```

### Run on Device/Simulator

**Physical Device (Easiest):**
1. Install **Expo Go** app from App Store/Google Play
2. Scan the QR code from your terminal

**iOS Simulator (Mac only):**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

## What You'll See

- List of blog posts with titles, previews, and authors
- Pull-to-refresh functionality
- Loading and error states

## Development

```bash
# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## Project Structure

```
src/
├── components/     # UI components (PostCard, LoadingSpinner, etc.)
├── hooks/          # Custom hooks (usePosts)
├── screens/        # App screens (PostListScreen)
├── services/       # API calls (JSONPlaceholder)
├── types/          # TypeScript types
└── styles/         # Shared styling
```

## Technologies Used

- React Native with Expo SDK 51
- TypeScript
- JSONPlaceholder API
- Jest for testing

## Troubleshooting

**Metro bundler won't start:**
```bash
npx expo start --clear
```

**Android emulator not detected:**
- Make sure Android Studio emulator is running
- Run `adb devices` to verify

**iOS simulator issues:**
- Ensure Xcode is installed
- Try restarting the simulator

## API

Fetches data from:
- Posts: `https://jsonplaceholder.typicode.com/posts`
- Users: `https://jsonplaceholder.typicode.com/users`

---