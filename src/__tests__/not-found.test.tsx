import { describe, it, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import { deleteCookie, setCookie } from 'cookies-next';
import NotFound from '@/app/not-found';

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: vi.fn(),
    };
  },
}));

const MockNotFound = () => {
  return (
    <Provider store={store}>
      <NotFound />
    </Provider>
  );
};

describe('Search Component', () => {
  beforeEach(() => {
    setCookie('loginStatus', 'true', { maxAge: 86400 });
  });

  afterEach(() => {
    deleteCookie('loginStatus');
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(<MockNotFound />);
    });
  });
});
