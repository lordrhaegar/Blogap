import { useCallback, useEffect, useState } from 'react';
import { fetchPostsWithAuthors } from '../services/api';
import { PostWithAuthor, UsePostsState } from '../types';

/**
 * Customized usePosts hook that fetches and manages blog posts data and state
 * The usePosts hook handles loading states, error states, and provides a refetch feature
 */
export const usePosts = (): UsePostsState => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches posts data with retry feature and handles errors gracefully
   * Contains logic to add minimum loading delay to prevent flickering on fast connections
   * Displays error on failure to fetch posts
   */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [postsData] = await Promise.all([
        fetchPostsWithAuthors(),
        new Promise(resolve => setTimeout(resolve, 300)),
      ]);

      setPosts(postsData);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * This function reloads data when called
   */
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    posts,
    loading,
    error,
    refetch,
  };
};