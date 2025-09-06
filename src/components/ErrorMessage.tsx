/**
 * @fileoverview Error message component with retry button.
 * Displays friendly error messages and a button to retry fetching data.
 * @module components/ErrorMessage
 */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BorderRadius, Colors, Spacing, TextStyles, Typography } from '../styles/global';
import { ErrorMessageProps } from '../types';

/**
 * Reusable error message component that displays error information with optional retry functionality.
 * Shows an error icon, message text, and conditionally renders a retry button.
 * Designed for network failures and other recoverable errors.
 * 
 * @component
 * @param {ErrorMessageProps} props - Component props
 * @param {string} props.message - The error message to display on screen
 * @param {Function} [props.onRetry] - Optional callback function for retry functionality
 * @param {string} [props.testID='error-message'] - Testid for testing 
 * @returns {React.ReactElement} The ErrorMessage component
 * */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  testID = 'error-message',
}) => {
  return (
    <View 
      style={styles.container}
      testID={testID}
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel={`Error: ${message}`}
    >
      <Text 
        style={styles.icon}
        testID={`${testID}-icon`}
        accessibilityLabel="Error icon"
      >
        ⚠️
      </Text>
      
      <Text 
        style={styles.message}
        testID={`${testID}-text`}
        accessible={true}
        accessibilityRole="text"
      >
        {message}
      </Text>
      
      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          testID={`${testID}-retry-button`}
          accessibilityLabel="Try again"
          accessible={true}
          accessibilityRole="button"
          accessibilityHint="Double tap to try loading the content again"
          activeOpacity={0.7}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
/**
 * Stylesheet for the ErrorMessage component.
 * @type {Object}
 */

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