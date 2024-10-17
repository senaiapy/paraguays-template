/**
 // ########################################
// #  www.pydoundation.org
// #  Eng Marcelo Anjos
// #  marcelu.phd@gmail.com
// #  2022-02-10
// ########################################
 * @ Create Time: 2022-04-16 20:57:35
 * @ Modified by: Your name
 * @ Modified time: 2022-04-17 11:08:43
 * @ Description:
 */
import { Env } from '@env';

import ApiClient from '../index';
export async function getObjsNoPages<T>(endpoints: string) {
  try {
    const response = await ApiClient.get<T>(`${Env.API_URL}/${endpoints}`);
    return response.data;
  } catch (error) {
    console.error('getObjs - Error: ', error);
    //throw error;
  }
}

export async function getObjs<T>(endpoints: string, {pageParam, per_page}: any) {
  try {
    const response = await ApiClient.get<T>(`${Env.API_URL}/${endpoints}`, {
      params: {
        ...(pageParam && {
          page: pageParam,
        }),
        ...(per_page && {
          per_page,
        }),
      },
    });
    return response.data;
  } catch (error) {
    console.error('getObjs - Error: ', error);
    //throw error;
  }
}

export async function getObjDetails<T>(endpoint: string, objId: any): Promise<T | undefined> {
  try {
    const url = `${Env.API_URL}/${endpoint}/${objId}`;
    const response = await ApiClient.get<T>(url);
    return response.data;
  } catch (error) {
    console.error('getObjDetails - Error: ', error);
    //throw error;
  }
}

export async function createObj<T>(
  endpoint: string,
  //{name, job}: CreateObjRequestPayload,
  data: T,
) {
  try {
    const response = await ApiClient.post<T>(
      `${Env.API_URL}/${endpoint}`,
      data,
      /*
      {
        params: {
          name,
          job,
        },
      },
      */
    );
    return response.data;
  } catch (error) {
    console.error('createObj - Error: ', error);
    //throw error;
  }
}

export async function modifyObj<T>(
  endpoint: string,
  objId: any,
  // {objId, name, job}: ModifyObjRequestPayload,
  data: T,
) {
  try {
    // You can use also patch
    const response = await ApiClient.put<T>(
      `${Env.API_URL}/${endpoint}/${objId}`,
      data,
      /*
      {
        params: {
          name,
          job,
        },
      },
      */
    );
    return response.data;
  } catch (error) {
    console.error('modifyObj - Error: ', error);
    //throw error;
  }
}

export async function deleteObj<T>(endpoint: string, objId: any) {
  try {
    const response = await ApiClient.delete<T>(`${Env.API_URL}/${endpoint}/${objId}`);
    return response.data;
  } catch (error) {
    console.error('deleteObj - Error: ', error);
    //throw error;
  }
}
