import { Env } from '@env';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: Env.API_URL, //'http://localhost:3333/api/v0/senaia',
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 60000,
});

async function findAll<T>(directions: string) {
  const response = await apiClient.get<T[]>('/' + directions);
  return response.data;
}

async function findById<T>(direction: string, id: any) {
  const response = await apiClient.get<T>(`/${direction}/${id}`);
  return response.data;
}

async function findByTitle<T>(direction: string, title: string) {
  const response = await apiClient.get<T[]>(`/${direction}?title=${title}`);
  return response.data;
}

async function create<T>(direction: string, item: T) {
  const response = await apiClient.post<any>('/' + direction, {
    item,
  });
  return response.data;
}

async function update<T>(direction: string, id: any, item: T) {
  const response = await apiClient.put<any>(`/${direction}/${id}`, {
    item,
  });
  return response.data;
}

async function deleteById(direction: string, id: any) {
  const response = await apiClient.delete<any>(`/${direction}/${id}`);
  return response.data;
}

async function deleteAll(directions: string) {
  const response = await apiClient.delete<any>('/' + directions);
  return response.data;
}

const crudAxios = {
  findAll,
  findById,
  findByTitle,
  create,
  update,
  deleteById,
  deleteAll,
};

export default crudAxios;
