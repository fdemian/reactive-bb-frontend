import React from 'react';
import Loading from './LoadingIndicator';
import { render, screen } from '../TestHelpers/testing-utils-standalone';
import { test, expect } from 'vitest';

test('<LoadingIndicator /> > Renders correctly', () => {
  render(<Loading />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  expect(screen.getByText('Please wait.')).toBeInTheDocument();
});
