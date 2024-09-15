import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import Alerts from './Alert';
import { legacy_createStore as createStore } from 'redux';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockAlerts = () => {
  return (
    <Provider store={store}>
      <Alerts />
    </Provider>
  );
};

const mockStore = (initialState: unknown) => {
  return createStore((state = initialState) => state);
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockAlerts />);
  });

  test('should render error alert when error message is not empty', () => {
    const initialState = { main: { error: 'This is an error message' } };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Alerts />
      </Provider>
    );

    const alertElement = screen.getByText(/This is an error message/i);
    expect(alertElement).toBeInTheDocument();
  });

  test('should not render alert when error message is empty', () => {
    const initialState = { main: { error: '' } };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Alerts />
      </Provider>
    );

    const alertElement = screen.queryByText(/This is an error message/i);
    expect(alertElement).not.toBeInTheDocument();
  });

  test('should handle different error messages', () => {
    const errorMessages = ['Error 1', 'Error 2', 'Error 3'];

    errorMessages.forEach((errorMessage) => {
      const initialState = { main: { error: errorMessage } };
      const store = mockStore(initialState);

      render(
        <Provider store={store}>
          <Alerts />
        </Provider>
      );

      const alertElement = screen.getByText(new RegExp(errorMessage, 'i'));
      expect(alertElement).toBeInTheDocument();
    });
  });
});
