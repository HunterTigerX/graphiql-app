import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import VariablesManager from './VariablesManager';
import { ILanguage } from '@/interfaces/interfaces';

const mockLanguageData: ILanguage = {
  variablesHeader: 'Variables',
  showVariables: 'Show Variables',
  hideVariables: 'Hide Variables',
  addVariable: 'Add Variable',
  variableKey: 'Variable Key',
  variableValue: 'Variable Value',
};

it('renders VariablesManager', () => {
  render(<VariablesManager variables={[]} setVariables={vi.fn()} languageData={mockLanguageData} />);

  expect(screen.getByText('Variables:')).toBeInTheDocument();
  expect(screen.getByText('Show Variables')).toBeInTheDocument();
  expect(screen.queryByLabelText('Variable Key')).not.toBeInTheDocument();
  expect(screen.queryByLabelText('Variable Value')).not.toBeInTheDocument();
  expect(screen.queryByText('Add Variable')).not.toBeInTheDocument();
});

it('toggles variables input visibility', () => {
  render(<VariablesManager variables={[]} setVariables={vi.fn()} languageData={mockLanguageData} />);

  fireEvent.click(screen.getByText('Show Variables'));
  expect(screen.getByLabelText('Variable Key')).toBeInTheDocument();
  expect(screen.getByLabelText('Variable Value')).toBeInTheDocument();
  expect(screen.getByText('Add Variable')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Hide Variables'));
  expect(screen.queryByLabelText('Variable Key')).not.toBeInTheDocument();
  expect(screen.queryByLabelText('Variable Value')).not.toBeInTheDocument();
  expect(screen.queryByText('Add Variable')).not.toBeInTheDocument();
});

it('adds a variable when Add Variable button is clicked', () => {
  const setVariables = vi.fn();
  render(<VariablesManager variables={[]} setVariables={setVariables} languageData={mockLanguageData} />);

  fireEvent.click(screen.getByText('Show Variables'));

  fireEvent.change(screen.getByLabelText('Variable Key'), { target: { value: 'key1' } });
  fireEvent.change(screen.getByLabelText('Variable Value'), { target: { value: 'value1' } });
  fireEvent.click(screen.getByText('Add Variable'));

  expect(setVariables).toHaveBeenCalledWith(expect.any(Function));
});

it('deletes a variable when Delete button is clicked', () => {
  const setVariables = vi.fn();
  const variables = [{ key: 'key1', value: 'value1' }];
  render(<VariablesManager variables={variables} setVariables={setVariables} languageData={mockLanguageData} />);

  fireEvent.click(screen.getByText('Show Variables'));

  fireEvent.click(screen.getByText('Delete'));

  expect(setVariables).toHaveBeenCalledWith(expect.any(Function));
});
