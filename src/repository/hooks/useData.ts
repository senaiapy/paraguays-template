/* eslint-disable unicorn/filename-case */

/* eslint-disable unused-imports/no-unused-vars */
import { Env } from '@env';
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosPromise } from "axios"

import { useAuth } from '@/core';

import { type Datas } from '../interfaces/Datas';


const fetchData = async (): AxiosPromise<Datas[]> => {
  const type = useAuth.use.type();
  let endpoint = '';
  
  const response = await axios.get(Env.API_URL + '/api/' + type + '/module');
  return response;
}

export function useData(/*id */) {
  const query = useQuery({
    queryFn: fetchData, // call the function
    queryKey: ['datas'], // name of the query
    retry: 2, // max 2 retries
    // enabled: !!id, // enabled when id is not null
    // refetchInterval: 60 * 5 * 1000, //search every 5 minutes
  })

  return {
    ...query,
    data: query.data?.data
  }
}
/*
import { Datas } from './interface/Datas';
import { useData } from './hooks/useData';

const { data } = useData();

{data?.map(Datass => 
  <Card
    price={Datass.price} 
    title={Datass.title} 
    image={Datass.image}
  />
)}
*/