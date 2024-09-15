import { describe, it, vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import store from '@/reducers/root/rootReduces';
import { Provider } from 'react-redux';
import HistoryPage from '@/app/history/page';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('@/components/Loader/Loader', () => {
  return {
    default: () => <div>Loading...</div>,
  };
});

vi.mock('@/components/History/History', () => {
  return {
    default: () => <div>History Module</div>,
  };
});

vi.mock('@/components/History/NoHistory', () => {
  return {
    default: () => <div>No History</div>,
  };
});

describe('HistoryPage() HistoryPage method', () => {
  let mockRouterPush: Mock;

  beforeEach(() => {
    mockRouterPush = vi.fn();
    (useRouter as Mock).mockReturnValue({ push: mockRouterPush });
    (onAuthStateChanged as Mock).mockImplementation((auth, callback) => {
      callback(null);
      return vi.fn();
    });
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should render Loader initially', () => {
      render(
        <Provider store={store}>
          <HistoryPage />
        </Provider>
      );
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render NoHistory when user is logged in but no history data exists', () => {
      (onAuthStateChanged as Mock).mockImplementation((auth, callback) => {
        callback({ uid: 'user123' });
        return vi.fn();
      });

      render(
        <Provider store={store}>
          <HistoryPage />
        </Provider>
      );
      expect(screen.getByText('No History')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should redirect to home page when no user is logged in', () => {
      render(
        <Provider store={store}>
          <HistoryPage />
        </Provider>
      );
      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
  });
});
