import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import HistoryModule from './History';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockHistoryModule = () => {
  return (
    <Provider store={store}>
      <HistoryModule />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockHistoryModule />);
  });
});
