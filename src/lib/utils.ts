import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const storage = {
  getToken: () => JSON.parse(window.localStorage.getItem('token') || 'null'),
  setToken: (token: string) =>
    window.localStorage.setItem('token', JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem('token'),
};
