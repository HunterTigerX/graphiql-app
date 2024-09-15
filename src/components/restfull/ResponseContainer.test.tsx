import { render, screen } from '@testing-library/react';
import ResponseContainer from './ResponseContainer';
import { ILanguage } from '@/interfaces/interfaces';

const mockLanguageData: ILanguage = {
  status: 'Status',
  bodyJson: 'Response Body',
};

it('renders ResponseContainer', () => {
  render(<ResponseContainer status={200} responseBody='{"key": "value"}' languageData={mockLanguageData} />);

  expect(screen.getByText('Status:')).toBeInTheDocument();
  expect(screen.getByText('200')).toBeInTheDocument();

  expect(screen.getByText('Response Body:')).toBeInTheDocument();
  expect(screen.getByText('{"key": "value"}')).toBeInTheDocument();
});
