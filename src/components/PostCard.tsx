import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing, TextStyles } from '../styles/global';
import { PostCardProps } from '../types';

    /**
     * Single post card component for blog post with title, body preview and author name
     * Cuts off the post body if greater than the preview length with ellipses
     * Cuts off at the last completed word before the preview length
     */

    export const PostCard: React.FC<PostCardProps> = (
    {
        post,
        testID = 'post-card'
    }) => {

    const getTruncatedBody = (body: string): string => {
        if (body.length <= 150) {
            return body;
        }

        const truncated = body.substring(0, 150);
        const lastSpaceIndex = truncated.lastIndexOf(' ');

        if (lastSpaceIndex > 0) {
            return `${truncated.substring(0, lastSpaceIndex)}...`;
        }

        return `${truncated}...`;
    };

    return (
        <View
            style={styles.container}
            testID={testID}
        >
            <Text
                style={styles.title}
                testID={`${testID}-title`}
                numberOfLines={2}
            >
                {post.title}
            </Text>

            <Text
                style={styles.body}
                testID={`${testID}-body`}
            >
                {getTruncatedBody(post.body)}
            </Text>

            <View style={styles.authorContainer}>
                <Text
                    style={styles.authorLabel}
                    testID={`${testID}-author-label`}
                >
                    By{' '}
                </Text>
                <Text
                    style={styles.authorName}
                    testID={`${testID}-author-name`}
                >
                    {post.authorName}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginHorizontal: Spacing.lg,
        marginVertical: Spacing.sm,
        ...Shadows.medium,
    },
    title: {
        ...TextStyles.heading3,
        marginBottom: Spacing.md,
    },
    body: {
        ...TextStyles.body,
        color: Colors.textSecondary,
        marginBottom: Spacing.lg,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorLabel: {
        ...TextStyles.bodySmall,
        color: Colors.textMuted,
    },
    authorName: {
        ...TextStyles.bodySmall,
        color: Colors.primary,
        fontWeight: '600',
    },
});