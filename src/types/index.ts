// Defining API Response Types Set Based on API structure from JSONPlaceholder Endpoint
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Custom Post Type with Author Name Inheriting Post Type
export interface PostWithAuthor extends Post {
  authorName: string;
}

// Type for API Service
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Types for the Presentation Component Props
export interface PostCardProps {
  post: PostWithAuthor;
  testID?: string;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  testID?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  testID?: string;
}

// Hook Types
export interface UsePostsState {
  posts: PostWithAuthor[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}