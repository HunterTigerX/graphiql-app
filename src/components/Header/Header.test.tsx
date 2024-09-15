import { describe, it, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import { Header } from './Header';

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

const MockHeader = () => {
  return (
    <Provider store={store}>
      <Header isScrolled={false} />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<MockHeader />);
    });
  });
});
