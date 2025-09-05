/**
 * @fileoverview API configuration constants for the blog application.
 * Contains base URLs and endpoint definitions for the JSONPlaceholder API.
 * @module constants/api
 */

/**
 * Base URL for the JSONPlaceholder API used for blog data.
 * @type {string}
 * @constant
 * @default
 */
export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
/**
 * API endpoint configuration object containing all available endpoints.
 * @namespace API_ENDPOINTS
 * @type {Object}
 * @property {string} POSTS - Endpoint for blog posts data
 * @property {string} USERS - Endpoint for user data
 */
export const API_ENDPOINTS = {
  /** @type {string} Endpoint for fetching blog posts */
  POSTS: `${API_BASE_URL}/posts`,
  /** @type {string} Endpoint for fetching user data */
  USERS: `${API_BASE_URL}/users`,
} as const;

