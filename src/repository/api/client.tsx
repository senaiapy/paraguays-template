/* eslint-disable max-params */
import { Env } from '@env';
import axios from 'axios';

export const client = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

type ApiResultMapping = {
  "/ping": { content: string; else: boolean }[];
  "/pong": string;
  "/onlyget": { name: string; age: number };
};

type ApiParamsMapping = {
  "/ping": { id: string };
  "/pong": { message: string };
  "/onlyget": never;
};

export function request<T extends keyof ApiResultMapping>(
  url: T,
  method: "get" | "post",
  params?: ApiParamsMapping[T],
  token?: string
) {
  return axios.request<ApiResultMapping[T]>({
    url,
    method,
    params: method === "get" ? params : undefined,
    data: method === "post" ? params : undefined,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    timeout: 30000,
    baseURL: Env.API_URL
  });
}