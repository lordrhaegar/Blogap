import React from 'react';
import { render } from '@testing-library/react-native';
import { PostCard } from '../PostCard';
import { PostWithAuthor } from '../../types';

describe('PostCard Component', () => {
  const mockPost: PostWithAuthor = {
    userId: 1,
    id: 1,
    title: 'Test Post Title',
    body: 'This is a test post body that contains some content for testing purposes.',
    authorName: 'John Doe',
  };

  it('should render post information correctly', () => {
    const { getByText } = render(<PostCard post={mockPost} />);

    expect(getByText('Test Post Title')).toBeTruthy();
    expect(getByText(mockPost.body)).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('should truncate long post bodies', () => {
    const longPost: PostWithAuthor = {
      ...mockPost,
      body: 'Ante taciti nulla sit libero orci sed nam. Sagittis suspendisse gravida ornare iaculis cras nullam varius ac ullamcorper. Nu…dio platea aenean habitasse neque ad proin. Bibendum phasellus enim fames risus eget felis et sem fringilla etiam. Integer.',
    };

    const { getByTestId } = render(<PostCard post={longPost} />);
    
    const bodyElement = getByTestId('post-card-body');
    const bodyText = bodyElement.props.children;
    
    expect(bodyText).toContain('...');
    expect(bodyText.length).toBeLessThan(longPost.body.length);
  });

  it('should not truncate short post bodies', () => {
    const shortPost: PostWithAuthor = {
      ...mockPost,
      body: 'My name is Chukwunonso Ikemba',
    };

    const { getByTestId } = render(<PostCard post={shortPost} />);
    
    const bodyElement = getByTestId('post-card-body');
    const bodyText = bodyElement.props.children;
    
    expect(bodyText).toBe('My name is Chukwunonso Ikemba');
    expect(bodyText).not.toContain('...');
  });
});