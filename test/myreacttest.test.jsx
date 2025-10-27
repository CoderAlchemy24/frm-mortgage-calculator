import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('App', () => {
  it('renders', () => {
    render(<App />);

    expect(screen.queryByText('Mortgage Repayment Calculator')).toBeVisible();
    expect(screen.queryByText('Mortgage Amount')).toBeVisible();
  });
});