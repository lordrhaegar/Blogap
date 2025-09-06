/**
 * @fileoverview App Homescreen component that display a list of blog posts using Flatlist.
 * Allows users to pull to refresh list, handles loading state and error during fetch.
 * @module screens/PostListScreen
 */
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PostCard } from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';
import { Colors, Layout, Spacing } from '../styles/global';
import { PostWithAuthor } from '../types';

/**
 * Main screen component that displays a list of blog posts in a FlatList.
 * Handles loading states, error states, and provides pull-to-refresh feature.
 * Shows different UI depending on data fetched and loading states
 * 
 * @component
 * @returns {React.FC} The PostListScreen functional component
 */
export const PostListScreen: React.FC = () => {
  const { posts, loading, error, refetch } = usePosts();

  /**
   * the PostCard component which is used in the Flatlist to display a preview of posts as cards.
   * Dynamically generates a unique testID for test reference using Jest and RTL.
   * 
   * @param {Object} params - Render item parameters from FlatList
   * @param {PostWithAuthor} params.item - The blog post data populating a PostCard
   * @param {number} params.index - The index of the item in the list
   * @returns {React.ReactElement} PostCard component with the post data
   */
  const renderPost = ({ item, index }: { item: PostWithAuthor; index: number }) => (
    <PostCard
      post={item}
      testID={`post-card-${index}`}
    />
  );

  /**
   * Extracts a dynamically generated unique key for each post.
   * Uses the post ID to ensure list performs properly and to track the rendered PostCard.
   * 
   * @param {PostWithAuthor} item - The post item to extract key from
   * @returns {string} Unique key string for the post
   */
  const keyExtractor = (item: PostWithAuthor) => `post-${item.id}`;

  // This displays the LoadingSpinner component on the initial load
  if (loading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.container} testID="post-list-loading">
        <LoadingSpinner testID="initial-loading-spinner" />
      </SafeAreaView>
    );
  }

  // Displays the error message when there is no fetched data
  if (error && posts.length === 0) {
    return (
      <SafeAreaView style={styles.container} testID="post-list-error">
        <ErrorMessage
          message={error}
          onRetry={refetch}
          testID="error-message"
        />
      </SafeAreaView>
    );
  }

  /**
   * Main render method that displays a FlatList of PostCards components to be rendered using the FlatList refresh feature to reload data from server.
   */
  return (
    <SafeAreaView style={styles.container} testID="post-list-screen">
      <View style={styles.listWrapper}>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
          testID="posts-flatlist"
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refetch}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
              testID="refresh-control"
            />
          }
          accessible={true}
          accessibilityRole="list"
          accessibilityLabel="Blog posts list"
          accessibilityHint="Swipe up and down to browse posts, pull down to refresh"
        />
      </View>
    </SafeAreaView>
  );
};
/**
 * Stylesheet for the PostListScreen component.
 * @type {Object}
 */
const styles = StyleSheet.create({
  container: {
    ...Layout.container,
    backgroundColor: Colors.surface,
  },
  listWrapper: {
    flex: 1,
    width: '100%',
  },
  flatList: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: Spacing.xl,
    flexGrow: 1,
  },
  separator: {
    height: Spacing.xs,
  },
});