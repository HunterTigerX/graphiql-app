import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { MockDiv } from '@/__mocks__/MockDiv';

const ComponentWithError = () => {
  throw new Error('Mock Error');
};

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('ErrorBoundary tests', () => {
  const originalConsoleError = console.error;

  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <MockDiv />
      </ErrorBoundary>
    );
    expect(screen.getByText('Mocked Child Component')).toBeInTheDocument();
  });

  test('renders fallback UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
