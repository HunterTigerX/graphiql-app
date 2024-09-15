import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import HeadersBlock from './HeadersBlock';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockHeadersBlock = () => {
  return (
    <Provider store={store}>
      <HeadersBlock />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockHeadersBlock />);
  });

  test('renders the component and shows header input fields', () => {
    render(
      <Provider store={store}>
        <HeadersBlock />
      </Provider>
    );
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });
});
