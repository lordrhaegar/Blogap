import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PostListScreen } from './src/screens/PostListScreen';

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <PostListScreen />
    </>
  );
}