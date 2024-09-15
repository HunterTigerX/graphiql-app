import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import SDLUrlInput from './SdlUrl';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockSDLUrlInput = () => {
  return (
    <Provider store={store}>
      <SDLUrlInput />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockSDLUrlInput />);
  });
});
