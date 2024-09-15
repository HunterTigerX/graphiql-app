import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import VariablesBlock from './VariablesGQL';
import { screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import mainReducer from '@/reducers/reducers/mainReducer';
import userReducer from '@/reducers/reducers/userSlice';
import restfullReducer from '@/reducers/reducers/restfullReducer';
import { urlConverter, makeNewUrl } from '@/methods/graphql/urlConverter';
import { expect } from 'vitest';

vi.mock('@/methods/graphql/urlConverter', () => ({
  urlConverter: vi.fn(),
  makeNewUrl: vi.fn(),
}));

const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  restFull: restfullReducer,
});

const testStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

describe('VariablesBlock', () => {
  test('changeUrlOnBlur updates the URL', async () => {
    const mockUrlConverter = vi.mocked(urlConverter);
    const mockMakeNewUrl = vi.mocked(makeNewUrl);
    const originalPushState = window.history.pushState;
    window.history.pushState = vi.fn();

    mockUrlConverter.mockReturnValue('converted-url');
    mockMakeNewUrl.mockReturnValue('http://example.com/converted-url');

    render(
      <Provider store={testStore}>
        <VariablesBlock />
      </Provider>
    );

    fireEvent.blur(screen.getByRole('textbox'));

    expect(window.history.pushState).toHaveBeenCalledWith({}, '', 'http://example.com/converted-url');

    window.history.pushState = originalPushState;
  });
});

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockVariablesBlock = () => {
  return (
    <Provider store={store}>
      <VariablesBlock />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockVariablesBlock />);
  });
});
