/**
 * @fileoverview This is the PostCard component that displays a preview of each blog post as a card.
 * The card shows the post title, a trncated post body, and the author's name.
 * @module components/PostCard
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing, TextStyles } from '../styles/global';
import { PostCardProps } from '../types';

/**
* Single post card component that displays a blog post with title, body preview, and author name.
* Intelligently truncates the post body if it exceeds the preview length, cutting off at the 
* last complete word before the limit and adding ellipses.
* 
* @component
* @param {PostCardProps} props - Component props
* @param {PostWithAuthor} props.post - The blog post data to display
* @param {string} [props.testID='post-card'] - Test id for testing
* @returns {React.ReactElement} The PostCard component
* */

export const PostCard: React.FC<PostCardProps> = (
    {
        post,
        testID = 'post-card'
    }) => {
/**
   * Truncates the post body text to a maximum of 150 characters while preserving word boundaries.
   * If the text is longer than 150 characters, it finds the last complete word before the limit
   * and adds ellipses. If the text is shorter, it returns the original text untruncated.
   * 
   * @param {string} body - The body of a blog post
   * @returns {string} Truncated body with conditional ellipses
   * */

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
/**
 * Stylesheet for the PostCard component.
 * @type {Object}
 */
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