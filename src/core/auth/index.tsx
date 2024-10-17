import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import type { UserType } from './utils';
import { getToken, removeToken, setToken } from './utils';
import { getUser, removeUser, setUser } from './utils';

interface AuthState {
  user: UserType | null;
  name: string | '';
  email: string | '';
  phone: string | '';
  password: string | '';
  terms: string | '';
  type: string | '';
  pin: string | '';
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  registerIn: (data: UserType) => void;
  registerOut: () => void;
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  user: null,
  name: '',
  email: '',
  phone: '',
  password: '',
  terms: '',
  type: '',
  pin: '',
  signIn: (token) => {
    setToken(token);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },

  registerIn: (user) => {
    setUser(user);
    set({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      terms: user.terms,
      type: user.type,
      pin: user.pin,
    });
  },
  registerOut: () => {
    removeUser();
    set({
      name: '',
      mail: '',
      phone: '',
      password: '',
      terms: '',
      type: '',
      pin: '',
    });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
      const userUser = getUser();
      if (userUser !== null) {
        get().registerIn(userUser);
      } else {
        get().registerOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const registerOut = () => _useAuth.getState().registerOut();
export const registerIn = (user: UserType) => _useAuth.getState().registerIn(user);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
