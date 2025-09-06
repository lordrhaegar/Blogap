/**
 * @fileoverview Loading spinner component with a testid for testing.
 * Displays an activity indicator with customizable size and color for loading states.
 * @module components/LoadingSpinner
 */
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors, Layout, Spacing } from '../styles/global';
import { LoadingSpinnerProps } from '../types';
/**
 * Reusable loading spinner component that displays an activity indicator.
 * Provides a reusable loading indicator to maintain consistency across the application with customizable
 * size and color options. 
 * Includes a test ID for unit testing with Jest and RTL.
 * 
 * @component
 * @param {LoadingSpinnerProps} props - Component props
 * @param {'small'|'large'} [props.size='large'] - Size of the activity indicator
 * @param {string} [props.color=Colors.primary] - Color of the activity indicator
 * @param {string} [props.testID='loading-spinner'] - Testid for testing 
 * @returns {React.ReactElement} The LoadingSpinner component
 * */
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
                accessible={true}
                accessibilityRole="progressbar"
                accessibilityLabel="Loading content"
                accessibilityHint="Please wait while the content loads"
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