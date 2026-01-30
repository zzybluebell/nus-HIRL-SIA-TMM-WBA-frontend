import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import the matchers
import Privacy from './Privacy';

describe('Privacy Component', () => {
  test('renders Privacy component without crashing', () => {
    const { container } = render(<Privacy />);
    expect(container).toBeInTheDocument();
  });
});
