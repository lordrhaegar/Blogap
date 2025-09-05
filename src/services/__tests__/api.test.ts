import { fetchPosts, fetchPostsWithAuthors } from '../api';
import { Post, User } from '../../types';

// Mock fetch globally
global.fetch = jest.fn();
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPosts', () => {
    const mockPosts: Post[] = [
      {
        userId: 1,
        id: 1,
        title: 'Test Post 1',
        body: 'This is test post 1 body',
      },
    ];

    it('should fetch posts successfully', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPosts,
      } as Response);

      const result = await fetchPosts();
      expect(result).toEqual(mockPosts);
    });

    it('should handle network errors', async () => {
      mockedFetch.mockRejectedValueOnce(new Error('Network error'));
      await expect(fetchPosts()).rejects.toThrow();
    });
  });

  describe('fetchPostsWithAuthors', () => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Post 1', body: 'Body 1' },
    ];

    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        address: {
          street: 'Main St',
          suite: '1',
          city: 'Anytown',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '123-456-7890',
        website: 'example.com',
        company: {
          name: 'Test Company',
          catchPhrase: 'Test phrase',
          bs: 'test bs',
        },
      },
    ];

    it('should fetch posts with authors successfully', async () => {
      mockedFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPosts,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockUsers,
        } as Response);

      const result = await fetchPostsWithAuthors();
      expect(result[0]?.authorName).toBe('John Doe');
    });
  });
});