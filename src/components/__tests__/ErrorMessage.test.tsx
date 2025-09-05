import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage Component', () => {
  const mockMessage = 'Something went wrong';

  it('should render error message', () => {
    const { getByTestId, getByText } = render(
      <ErrorMessage message={mockMessage} />
    );

    expect(getByTestId('error-message')).toBeTruthy();
    expect(getByTestId('error-message-icon')).toBeTruthy();
    expect(getByTestId('error-message-text')).toBeTruthy();
    expect(getByText(mockMessage)).toBeTruthy();
  });

  it('should render retry button when onRetry is provided', () => {
    const mockOnRetry = jest.fn();
    const { getByTestId, getByText } = render(
      <ErrorMessage message={mockMessage} onRetry={mockOnRetry} />
    );

    expect(getByTestId('error-message-retry-button')).toBeTruthy();
    expect(getByText('Try Again')).toBeTruthy();
  });

  it('should not render retry button when onRetry is not provided', () => {
    const { queryByTestId } = render(
      <ErrorMessage message={mockMessage} />
    );

    expect(queryByTestId('error-message-retry-button')).toBeNull();
  });

  it('should call onRetry when retry button is pressed', () => {
    const mockOnRetry = jest.fn();
    const { getByTestId } = render(
      <ErrorMessage message={mockMessage} onRetry={mockOnRetry} />
    );

    const retryButton = getByTestId('error-message-retry-button');
    fireEvent.press(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('should use custom testID when provided', () => {
    const customTestID = 'custom-error';
    const { getByTestId } = render(
      <ErrorMessage message={mockMessage} testID={customTestID} />
    );

    expect(getByTestId(customTestID)).toBeTruthy();
    expect(getByTestId(`${customTestID}-icon`)).toBeTruthy();
    expect(getByTestId(`${customTestID}-text`)).toBeTruthy();
  });
});