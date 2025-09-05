import { renderHook, waitFor } from '@testing-library/react-native';
import { usePosts } from '../usePosts';
import { PostWithAuthor } from '../../types';

// Mock the API service
jest.mock('../../services/api', () => ({
  fetchPostsWithAuthors: jest.fn(),
}));

import { fetchPostsWithAuthors } from '../../services/api';
const mockedFetchPostsWithAuthors = fetchPostsWithAuthors as jest.MockedFunction<typeof fetchPostsWithAuthors>;

describe('usePosts Hook', () => {
  const mockPosts: PostWithAuthor[] = [
    {
      userId: 1,
      id: 1,
      title: 'Test Post 1',
      body: 'This is test post 1 body',
      authorName: 'John Doe',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch posts successfully', async () => {
    mockedFetchPostsWithAuthors.mockResolvedValue(mockPosts);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toEqual(mockPosts);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch errors', async () => {
    const error = new Error('API Error');
    mockedFetchPostsWithAuthors.mockRejectedValue(error);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBe('API Error');
  });
});