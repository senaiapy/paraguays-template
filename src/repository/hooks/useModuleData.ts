/* eslint-disable unicorn/filename-case */

/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import { Env } from '@env';
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosPromise } from "axios"

import { useAuth } from '@/core';

import { type Datas } from '../interfaces/Datas';
import {type Module} from '../types';
import { URL} from '../utils';

const fetchData = async (/*repository: string, method: string*/): AxiosPromise<Module[]> => {
  const type = useAuth.use.type();
  let endpoint = Env.API_URL + '/api/' + 'module';
  console.log('endpoint', endpoint);
  // if(repository === 'module' || repository === 'countries') {
  //   endpoint = Env.API_URL + '/api/' + URL[repository];
  // } else {
  //   endpoint = Env.API_URL + '/api/' + type + URL[repository];
  // }
  // let response = null;
  // if(method === 'get') {
  //    response = await axios.get(endpoint);
  // } else if(method === 'post'){
  //   response = await axios.post(endpoint);
  // }
  const response = await axios.get(endpoint);
  console.log('response', response);
  return response ;
}

export function useModuleData(/*repository: string, method: string*/) {
  const query = useQuery({
    queryFn: fetchData, // call the function
    queryKey: ['module'], // name of the query
    // retry: 2, // max 2 retries
    // enabled: !!id, // enabled when id is not null
    // refetchInterval: 60 * 5 * 1000, //search every 5 minutes
  })

  return {
    ...query,
    data: query.data?.data
  }
}
/*
import { Module } from './interface/Datas';
import { useModuleData } from '@/repository/hooks/useModuleData';

const { data } = useModuleData();

{data?.map(Datass => 
  <Card
    price={Datass.price} 
    title={Datass.title} 
    image={Datass.image}
  />
)}
*/