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

# or 

1. npm start

2. select i
```

**Android Emulator:**
```bash
npm run android

# or 

1. npm start

2. select a
```

## What You'll See

- List of blog posts with titles, previews, and authors
- Pull the list down to execute the Pull-toRefresh feature to refresh the list
- Initial loading screen and error states if fetching the blog post fails
- Retry button if fetching the blog post fails

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
├── components/     
├── constants/     
├── hooks/          
├── screens/        
├── services/       
├── styles/          
└── types/         
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
