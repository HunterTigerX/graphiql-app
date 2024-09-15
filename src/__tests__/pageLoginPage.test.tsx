import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import LoginPage from '../app/login/page';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react', () => ({
  useEffect: vi.fn(),
  useState: vi.fn(() => ''),
}));

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('@/firebase', () => ({
  auth: vi.fn(),
}));

const MockLoginPage = () => {
  return (
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockLoginPage />);
  });
});
