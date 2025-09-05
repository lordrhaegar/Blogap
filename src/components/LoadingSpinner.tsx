import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors, Layout, Spacing } from '../styles/global';
import { LoadingSpinnerProps } from '../types';

/**
 * Reusable loading spinner component with accessibility support that 
 * displays an activity indicator with test-id for running unit tests with Jest and RTL
 */
 
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = Colors.primary,
  testID = 'loading-spinner',
}) => {
  return (
    <View 
      style={styles.container}
      testID={testID}
    >
      <ActivityIndicator 
        size={size} 
        color={color}
        testID={`${testID}-indicator`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.centerContent,
    padding: Spacing.xl,
  },
});