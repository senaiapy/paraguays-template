/* eslint-disable unicorn/filename-case */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 // ########################################
// #  www.pydoundation.org
// #  Eng Marcelo Anjos
// #  marcelu.phd@gmail.com
// #  2022-02-10
// ########################################
 * @ Create Time: 2022-04-16 20:57:35
 * @ Modified by: Your name
 * @ Modified time: 2022-04-17 10:41:50
 * @ Description:
 */

import {useMutation, useQuery} from 'react-query';

import {createObj, deleteObj, getObjDetails, getObjsNoPages, modifyObj} from './objs';

function useObj<T>(endpoint: string, objId: any) {
  return useQuery([`${endpoint}-${objId}`, {objId}], () => getObjDetails<T>(endpoint, objId), {
    // @ts-ignore
    enabled: !!{objId},
  });
}

function useObjs<T>(endpoints: string) {
  return useQuery(`${endpoints}`, () => getObjsNoPages<T>(endpoints));
}

async function useObjId<T>(endpoint: string, objId: any) {
  return await getObjDetails(endpoint, objId);
}

function useCreateObj<T>(endpoint: string, datas: T) {
  return useMutation(`new-${endpoint}`, () => createObj<T>(endpoint, datas), {
    onSuccess: data => console.log('useCreateObj onSuccess>>> ', data),
  });
}

function useModifyObj<T>(endpoint: string, objId: any, datas: T) {
  return useMutation(`modify-${endpoint}`, () => modifyObj<T>(endpoint, objId, datas), {
    onSuccess: data => console.log('useModifyObj onSuccess>>> ', data),
  });
}

function useDeleteObj<T>(endpoint: string, objId: any) {
  return useMutation(`delete-${endpoint}`, () => deleteObj<T>(endpoint, objId));
}

export {useCreateObj, useDeleteObj,useModifyObj, useObj, useObjId, useObjs};
