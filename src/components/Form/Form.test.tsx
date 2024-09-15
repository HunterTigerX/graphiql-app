import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import { Form } from './Form';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const mockHandleClick = vi.fn();

const MockForm = () => {
  return (
    <Provider store={store}>
      <Form title={'Sing in'} handleClick={mockHandleClick} />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockForm />);
  });
});
