import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import MainInform from './MainInform';
import store from '@/reducers/root/rootReduces';

test('renders project information', () => {
  render(
    <Provider store={store}>
      <MainInform />
    </Provider>
  );

  expect(screen.getByText(/About the Project/i)).toBeInTheDocument();
});
