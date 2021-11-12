import { render, screen } from '@testing-library/react';
import App from './App';

test('Check if page renders contains Energy Australia', () => {
  render(<App />);
  const linkElement = screen.getByAltText(/Bunnings/i);
  expect(linkElement).toBeInTheDocument();
});
