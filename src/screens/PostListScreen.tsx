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
 * Main screen component that displays the list of blog posts
 * Handles loading, error, and empty states with pull-to-refresh functionality
 */
export const PostListScreen: React.FC = () => {
  const { posts, loading, error, refetch } = usePosts();

  /**
   * Returns the PostCard component which is used in the Flatlist to display a preview of posts as cards
   * Dynamically generates a unique testID for test reference using Jest and RTL
   */
  const renderPost = ({ item, index }: { item: PostWithAuthor; index: number }) => (
    <PostCard
      post={item}
      testID={`post-card-${index}`}
    />
  );

  /**
   * Returns a dynamically generated unique key for each post
   */
  const keyExtractor = (item: PostWithAuthor) => `post-${item.id}`;

  // This displays the LoadingSpinner component on the initial load (Testable as branch)
  if (loading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.container} testID="post-list-loading">
        <LoadingSpinner testID="initial-loading-spinner" />
      </SafeAreaView>
    );
  }

  // Displays the error message when there is no fetched data (Testable as branch)
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
   * Returns a FlatList of PostCards components to be rendered using the FlatList refresh feature to reload data from server
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
        />
      </View>
    </SafeAreaView>
  );
};

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