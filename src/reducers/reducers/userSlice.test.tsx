import { vi } from 'vitest';
import userReducer, { setUser, removeUser, setLoadingUser } from './userSlice';
import { setCookie, deleteCookie } from 'cookies-next';

vi.mock('cookies-next', () => ({
  setCookie: vi.fn(),
  deleteCookie: vi.fn(),
}));

describe('userSlice', () => {
  const initialState = {
    userName: null,
    email: null,
    id: null,
    token: null,
    loading: false,
    isAuthenticated: false,
  };

  describe('setUser', () => {
    test('should set user data and update authentication status', () => {
      const userData = {
        userName: 'JohnDoe',
        email: 'john@example.com',
        token: 'abcd1234',
        id: '1',
      };
      const action = setUser(userData);
      const expectedState = {
        ...initialState,
        userName: 'JohnDoe',
        email: 'john@example.com',
        token: 'abcd1234',
        id: '1',
        loading: false,
        isAuthenticated: true,
      };

      const newState = userReducer(initialState, action);
      expect(newState).toEqual(expectedState);
      expect(setCookie).toHaveBeenCalledWith('loginStatus', 'true', { maxAge: 86400 });
    });
  });

  describe('removeUser', () => {
    test('should clear user data and update authentication status', () => {
      const action = removeUser();
      const populatedState = {
        userName: null,
        email: null,
        id: null,
        token: null,
        loading: false,
        isAuthenticated: true,
      };

      const newState = userReducer(populatedState, action);
      expect(newState).toEqual(initialState);
      expect(deleteCookie).toHaveBeenCalledWith('loginStatus');
    });
  });

  describe('setLoadingUser', () => {
    test('should set loading state to true', () => {
      const action = setLoadingUser(true);
      const newState = userReducer(initialState, action);
      expect(newState.loading).toBe(true);
    });

    test('should set loading state to false', () => {
      const action = setLoadingUser(false);
      const newState = userReducer(initialState, action);
      expect(newState.loading).toBe(false);
    });
  });
});
