import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import GqlQueryInput from './GqlQueryInput';
import { Store, UnknownAction } from 'redux';
import { Mock, vi } from 'vitest';

const mockStore = configureStore([]);

describe('GqlQueryInput', () => {
  let store: MockStoreEnhanced<unknown, object> | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      main: {
        queryInput: '',
        searchResults: { result: false },
        languageData: {
          queryHeader: 'GraphQL Query',
          prettify: 'Prettify',
          wrongGqlError: 'Invalid GraphQL query',
        },
        error: '',
        endpointUrlInput: 'http://example.com/graphql',
        headersKeys: '',
        variablesInput: '',
      },
    });
    store.dispatch = vi.fn();
    window.history.pushState = vi.fn();
  });

  test('renders correctly', () => {
    render(
      <Provider store={store}>
        <GqlQueryInput />
      </Provider>
    );

    expect(screen.getByText('GraphQL Query')).toBeInTheDocument();
    expect(screen.getByText('Prettify')).toBeInTheDocument();
  });

  test('dispatches updateQuery on input change', () => {
    render(
      <Provider store={store}>
        <GqlQueryInput />
      </Provider>
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'query { test }' } });
    expect(store.dispatch).toHaveBeenCalled();
    const calls = (store.dispatch as Mock).mock.calls;
    const lastCall = calls[calls.length - 1][0];
    expect(typeof lastCall).toBe('function');
  });

  test('shows alert message on prettify error', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <GqlQueryInput />
      </Provider>
    );

    const button = screen.getByText('Prettify');
    fireEvent.click(button);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  test('updates URL on blur', async () => {
    const originalPushState = window.history.pushState;
    const pushStateMock = vi.fn();
    window.history.pushState = pushStateMock;

    render(
      <Provider store={store}>
        <GqlQueryInput />
      </Provider>
    );

    const textarea = screen.getByRole('textbox');
    fireEvent.blur(textarea);

    expect(pushStateMock).toHaveBeenCalled();

    window.history.pushState = originalPushState;
  });
});
