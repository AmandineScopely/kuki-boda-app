import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signUp: (token: TokenType) => void;
  signIn: (token: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

// Only manages states and saves user token in MMKV
const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  signUp: (token) => {
    setToken(token);
    set({ status: 'signIn', token });
  },
  signIn: (token) => {
    setToken(token);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signUp = (token: TokenType) => _useAuth.getState().signUp(token);
export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
export * from './firebase-service';
