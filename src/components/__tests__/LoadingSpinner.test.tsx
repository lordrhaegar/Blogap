import { render } from '@testing-library/react-native';
import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('should render with default props', () => {
    const { getByTestId } = render(<LoadingSpinner />);

    expect(getByTestId('loading-spinner')).toBeTruthy();
    expect(getByTestId('loading-spinner-indicator')).toBeTruthy();
  });

  it('should render with custom testID', () => {
    const customTestID = 'custom-spinner';
    const { getByTestId } = render(<LoadingSpinner testID={customTestID} />);

    expect(getByTestId(customTestID)).toBeTruthy();
    expect(getByTestId(`${customTestID}-indicator`)).toBeTruthy();
  });

  it('should pass size prop to ActivityIndicator', () => {
    const { getByTestId } = render(<LoadingSpinner size="small" />);
    
    const indicator = getByTestId('loading-spinner-indicator');
    expect(indicator.props.size).toBe('small');
  });

  it('should pass color prop to ActivityIndicator', () => {
    const customColor = '#FF0000';
    const { getByTestId } = render(<LoadingSpinner color={customColor} />);
    
    const indicator = getByTestId('loading-spinner-indicator');
    expect(indicator.props.color).toBe(customColor);
  });
});