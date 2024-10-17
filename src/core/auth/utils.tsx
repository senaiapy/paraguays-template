import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'token';
const USER = 'user';

export type TokenType = {
  access: string;
  refresh: string;
};

export type UserType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  terms?: string;
  type: string;
  pin?: string;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

export const getUser = () => getItem<UserType>(USER);
export const removeUser = () => removeItem(USER);
export const setUser = (value: UserType) => setItem<UserType>(USER, value);