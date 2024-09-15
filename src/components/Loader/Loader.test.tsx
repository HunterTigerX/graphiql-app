import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import Loader from './Loader';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockLoader = () => {
  return (
    <Provider store={store}>
      <Loader />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockLoader />);
  });
});
