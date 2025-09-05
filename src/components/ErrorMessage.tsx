import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BorderRadius, Colors, Spacing, TextStyles, Typography } from '../styles/global';
import { ErrorMessageProps } from '../types';

/**
 * Component for Error message with a retry feature in the case of network failure
 */
 
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  testID = 'error-message',
}) => {
  return (
    <View 
      style={styles.container}
      testID={testID}
    >
      <Text 
        style={styles.icon}
        testID={`${testID}-icon`}
      >
        ⚠️
      </Text>
      
      <Text 
        style={styles.message}
        testID={`${testID}-text`}
      >
        {message}
      </Text>
      
      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          testID={`${testID}-retry-button`}
          accessibilityLabel="Try again"
          activeOpacity={0.7}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  icon: {
    fontSize: Typography['3xl'],
    marginBottom: Spacing.lg,
  },
  message: {
    ...TextStyles.body,
    textAlign: 'center',
    color: Colors.error,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    minWidth: 120,
    minHeight: 44, 
  },
  retryButtonText: {
    ...TextStyles.body,
    color: Colors.white,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
  },
});