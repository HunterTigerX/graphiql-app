import { render, screen, fireEvent } from '@testing-library/react';
import MethodSelect from './MethodSelect';
import { describe, it, expect, vi } from 'vitest';

describe('MethodSelect', () => {
  it('render', () => {
    const setMethod = vi.fn();
    render(<MethodSelect method="GET" setMethod={setMethod} />);

    expect(screen.getByDisplayValue('GET')).toBeInTheDocument();
  });

  it('calls setMethod when a new method is selected', () => {
    const setMethod = vi.fn();
    render(<MethodSelect method="GET" setMethod={setMethod} />);

    fireEvent.mouseDown(screen.getByRole('combobox'));

    fireEvent.click(screen.getByText('POST'));

    expect(setMethod).toHaveBeenCalledWith('POST');
  });
});
