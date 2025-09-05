import {API_ENDPOINTS } from '../constants/api';
import { Post, PostWithAuthor, User } from '../types';

/**
 * A fetch wrapper with a timeout functionality that checks for and handles all error cases gracefully to prevent crashes
 * Runs a get request to fetch data from url
 * @param url the API Endpoint
 * @param options configuration object that tells the fetch() function HOW to make the HTTP request
 * @param timeout time after which the PI call will stop
 */
// 
async function fetchWithTimeout<T>(
  url: string,
  timeout = 10000
): Promise<T> {
    /**
     * Remote controller for the API request that cancels the request if 
     * It takes more than defined timeout.
     * If user pulls refresh while old request is still loading 
     */
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

// fetch request with signal that makes the method cancellable on meeting cancel criteria
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
 * Makes a get request to post API Endpoint
 * @returns a list with all blog posts
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
 * Makes a get request to user API Endpoint
 * @returns a list of all users
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
 * @param users list of users fetched from user API Endpoint
 * @returns a map having a key, value pair of user ID and user name
 */
function createUserLookup(users: User[]): Map<number, string> {
  return new Map(users.map(user => [user.id, user.name]));
}

/**
 * Combines posts with their corresponding author names
 * @param posts list of posts fetched from post API Endpoint
 * @param userLookup a key, value map of user ID and user name
 * @returns a list of posts with user names as authorName
 */
function mergePostsWithAuthors(posts: Post[], userLookup: Map<number, string>): PostWithAuthor[] {
  return posts.map(post => ({
    ...post,
    authorName: userLookup.get(post.userId) || 'Unknown Author',
  }));
}

/**
 * The main function used in the UI to fetch posts and users then combines them to include author names
 * @returns a list of posts with their authors
 */
export async function fetchPostsWithAuthors(): Promise<PostWithAuthor[]> {
  try {
    // Fetch posts and users concurrently for better performance
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

