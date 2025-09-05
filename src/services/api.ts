/**
 * @fileoverview API service module for fetching blog posts and user data.
 * Provides functions to interact with the JSONPlaceholder API with error handling and timeout support.
 * @module services/api
 */
import {API_ENDPOINTS } from '../constants/api';
import { Post, PostWithAuthor, User } from '../types';

/**
 * A fetch wrapper with timeout functionality that handles all error cases gracefully.
 * Performs a GET request to fetch data from the specified URL with cancellation support.
 * 
 * @template T - The expected return type of the API response
 * @param {string} url - The API endpoint URL to fetch from
 * @param {number} [timeout=10000] - Timeout duration in milliseconds (default: 10 seconds)
 * @returns {Promise<T>} Promise that resolves to the parsed JSON response
 * @throws {Error} Throws error for network failures, timeouts, or HTTP errors
 */ 
async function fetchWithTimeout<T>(
  url: string,
  timeout = 10000
): Promise<T> {
    
    /**
   * AbortController for the API request that cancels the request if 
   * it takes longer than the defined timeout.
   * Useful when user pulls to refresh while old request is still loading.
   */
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

// Fetch request with signal that makes the method cancellable on meeting cancel criteria
  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    // Cancel timer after request has finished
    clearTimeout(timeoutId);

    // Check success of the request
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
    }
    throw new Error('Unable to connect. Please check your internet connection.');

  }
}

/**
 * Fetches all blog posts from the JSONPlaceholder API.
 * 
 * @returns {Promise<Post[]>} Promise that resolves to an array of blog posts
 * @throws {Error} Throws error if the API request fails
 */
export async function fetchPosts(): Promise<Post[]> {
  try {
    const posts = await fetchWithTimeout<Post[]>(API_ENDPOINTS.POSTS);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

/**
 * Fetches all users from the JSONPlaceholder API.
 * 
 * @returns {Promise<User[]>} Promise that resolves to an array of users
 * @throws {Error} Throws error if the API request fails
 */
export async function fetchUsers(): Promise<User[]> {
  try {
    const users = await fetchWithTimeout<User[]>(API_ENDPOINTS.USERS);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

/**
 * Creates a lookup map from an array of users for efficient author name resolution.
 * 
 * @param {User[]} users - Array of users to create lookup map from
 * @returns {Map<number, string>} Map with user ID as key and user name as value
 */
function createUserLookup(users: User[]): Map<number, string> {
  return new Map(users.map(user => [user.id, user.name]));
}

/**
 * Combines blog posts with their corresponding author names using a user lookup map.
 * 
 * @param {Post[]} posts - Array of blog posts to enhance with author information
 * @param {Map<number, string>} userLookup - Map containing user ID to name mappings
 * @returns {PostWithAuthor[]} Array of posts enhanced with author names
 */
function mergePostsWithAuthors(posts: Post[], userLookup: Map<number, string>): PostWithAuthor[] {
  return posts.map(post => ({
    ...post,
    authorName: userLookup.get(post.userId) || 'Unknown Author',
  }));
}

/**
 * Main function used in the UI to fetch posts and users, then combines them to include author names.
 * Fetches posts and users concurrently for optimal performance, then merges the data.
 * 
 * @returns {Promise<PostWithAuthor[]>} Promise that resolves to an array of posts with author information
 * @throws {Error} Throws error if either the posts or users API request fails
 */
export async function fetchPostsWithAuthors(): Promise<PostWithAuthor[]> {
  try {
    const [posts, users] = await Promise.all([
      fetchPosts(),
      fetchUsers(),
    ]);

    // Create a lookup map/dictionary for user names
    const userLookup = createUserLookup(users);
    
    // Combine posts with author name
    const postsWithAuthors = mergePostsWithAuthors(posts, userLookup);

    return postsWithAuthors;
  } catch (error) {
    console.error('Error fetching posts with authors:', error);
    throw error;
  }
}

