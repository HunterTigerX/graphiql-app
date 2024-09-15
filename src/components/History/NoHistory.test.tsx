import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import NoHistory from './NoHistory';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockNoHistory = () => {
  return (
    <Provider store={store}>
      <NoHistory />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockNoHistory />);
  });
});
