import JsonViewer, { cleanObject, formatJson } from './jsonViewer';
import store from '@/reducers/root/rootReduces';
import { Provider } from 'react-redux';
import { mockedResponsePoke } from '@/__mocks__/graphQlMocks';
import { render, screen } from '@testing-library/react';

describe('cartReducer', () => {
  it('should handle cleanObject correctly', () => {
    const NewState = JsonViewer(mockedResponsePoke);
    const MyComponent: React.FC = () => {
      return <div>{NewState}</div>;
    };
    render(
      <Provider store={store}>
        <MyComponent />
      </Provider>
    );
  });

  it('should render null for null input', () => {
    const { getByText } = render(<JsonViewer dirtyData={null} />);
    expect(getByText(/dirtyData/)).toBeInTheDocument();
  });

  it('should render empty object correctly', () => {
    const { getByText } = render(<JsonViewer dirtyData={{}} />);
    expect(getByText(/dirtyData/)).toBeInTheDocument();
  });

  it('should render a simple object', () => {
    const { getByText } = render(<JsonViewer dirtyData={{ a: 1, b: 'text' }} />);
    expect(getByText(/dirtyData/)).toBeInTheDocument();
  });

  it('should handle nested objects', () => {
    const { getByText } = render(<JsonViewer dirtyData={{ a: { b: 2 }, c: 3 }} />);
    expect(getByText(/b:/)).toBeInTheDocument();
    expect(getByText(/2/)).toBeInTheDocument();
    expect(getByText(/c:/)).toBeInTheDocument();
    expect(getByText(/3/)).toBeInTheDocument();
  });

  it('should handle arrays correctly', () => {
    const { getByText } = render(<JsonViewer dirtyData={{ items: [1, 2, 3] }} />);
    expect(getByText(/items:/)).toBeInTheDocument();
    expect(getByText(/dirtyData/)).toBeInTheDocument();
    expect(getByText(/items/)).toBeInTheDocument();
  });

  it('should handle empty object', () => {
    render(<div>{formatJson({})}</div>);
    expect(screen.queryByText('dirtyData')).not.toBeInTheDocument();
  });

  it('should format a simple object', () => {
    const obj = { a: 1, b: 'text' };
    const { getByText } = render(<div>{formatJson(obj)}</div>);
    expect(getByText(/a:/)).toBeInTheDocument();
    expect(getByText(/1/)).toBeInTheDocument();
    expect(getByText(/b:/)).toBeInTheDocument();
    expect(getByText(/"text"/)).toBeInTheDocument();
  });

  it('should format an array of objects', () => {
    const obj = { items: [{ a: 1 }, { b: 2 }] };
    const { getByText } = render(<div>{formatJson(obj)}</div>);
    expect(getByText(/items:/)).toBeInTheDocument();
    expect(getByText(/a:/)).toBeInTheDocument();
    expect(getByText(/b:/)).toBeInTheDocument();
  });

  it('should skip keys that start with "__"', () => {
    const obj = { a: 1, __b: 2 };
    const { container } = render(<div>{formatJson(obj)}</div>);
    expect(container).not.toHaveTextContent('__b');
  });
  it('should return null for null input', () => {
    expect(cleanObject(null)).toBeNull();
  });

  it('should return undefined for undefined input', () => {
    expect(cleanObject(undefined)).toBeUndefined();
  });

  it('should return the same number input', () => {
    expect(cleanObject(42)).toBe(42);
  });

  it('should return the same string input', () => {
    expect(cleanObject('Hello')).toBe('Hello');
  });

  it('should clean an object and remove keys starting with "__"', () => {
    const input = { a: 1, b: 2, __c: 3 };
    const expected = { a: 1, b: 2 };
    expect(cleanObject(input)).toEqual(expected);
  });

  it('should handle nested objects correctly', () => {
    const input = { a: { b: 2, __c: 3 }, d: 4 };
    const expected = { a: { b: 2 }, d: 4 };
    expect(cleanObject(input)).toEqual(expected);
  });

  it('should handle arrays correctly', () => {
    const input = [1, 2, { __c: 3, d: 4 }];
    const expected = [1, 2, { d: 4 }];
    expect(cleanObject(input)).toEqual(expected);
  });
});
