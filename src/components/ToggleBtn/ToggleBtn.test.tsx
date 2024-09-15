import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import ColorToggleButton from './ToggleBtn';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockColorToggleButton = () => {
  return (
    <Provider store={store}>
      <ColorToggleButton />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockColorToggleButton />);
  });
});
