import React from 'react';
import { render } from '@testing-library/react';
import WelcomeScreen from './WelcomeScreen'; // Adjust the import path as needed

describe('WelcomeScreen', () => {
  it('displays the Start button', () => {
    const { getByText } = render(<WelcomeScreen />);
    const startButton = getByText('Start');
    expect(startButton).toBeInTheDocument();
  });
});
