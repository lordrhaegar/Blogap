/**
 * @fileoverview A customized hook that takes care of fetching and managing blog posts data.
 * Provides stage management respurce for posts and that handles loading states,hadling failed API calls and errors and a functionality that allows refetching
 * @module hooks/usePosts
 */
import { useCallback, useEffect, useState } from 'react';
import { fetchPostsWithAuthors } from '../services/api';
import { PostWithAuthor, UsePostsState } from '../types';

/**
 * Custom React hook that fetches and manages blog posts data with loading and error states.
 * Provides automatic data fetching on mount, error handling, and manual refetch option.
 * Includes a minimum loading delay to prevent UI flickering on fast connections.
 * 
 * @returns {UsePostsState} Object containing posts data, loading state, error state, and refetch function
 * @returns {PostWithAuthor[]} Array of blog posts with author name
 * @returns {boolean} Loading state monitor value
 * @returns {string|null} Error message or null if no error occurred
 * @returns {Function} Function to refetch the posts data
 */
export const usePosts = (): UsePostsState => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches posts data with retry feature and handles errors gracefully
   * Displays error on failure to fetch posts
   */
  /**
   * Fetches posts data with error handling and minimum loading delay.
   * Includes a 300ms minimum loading delay to prevent UI flickering on fast connections.
   * Resets error state before each fetch attempt and handles both network and parsing errors.
   * 
   * @async
   * @function fetchData
   * @returns {Promise<void>} Promise that resolves when the data has been fetched successfully
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
   * This function reloads data when called by calling the fetchData function.
   * Serves both the for manual refresh and the retry button.
   * 
   * @function refetch
   * @returns {void}
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