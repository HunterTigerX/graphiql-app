import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Login } from './Login';
import store from '@/reducers/root/rootReduces';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react', async () => {
  const actualReact = await import('react');
  return {
    ...actualReact,
    useEffect: vi.fn(),
    useState: vi.fn(() => ''),
  };
});
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('@/firebase', () => ({
  auth: vi.fn(),
}));

describe('Login Component', () => {
  test('renders Login component', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });
});
