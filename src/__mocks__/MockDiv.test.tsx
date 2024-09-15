import { render, screen } from '@testing-library/react';
import { MockDiv } from './MockDiv';
import { describe, it, expect } from 'vitest';
describe('Search Component', () => {
  it('renders without crashing', async () => {
    render(<MockDiv />);
    expect(screen.getByText(/Mocked Child Component/)).toBeInTheDocument();
  });
});
