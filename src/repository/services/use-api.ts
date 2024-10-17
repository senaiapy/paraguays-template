import { Env } from '@env';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from './client';
import {Endpoints} from './endpoints';
import type { Api } from './types';

type Variables = { 
  token: string,
  endpoint: string,
  userType: string, 
};
type Response = Api;
let baseURL = Env.API_URL; //"http://localhost:3000/";

const buildEndpoint = (callFor: string, types: string) => {
  let returnOut = "";
  if(types === '' || types === null || types === undefined){
    types = 'user';
  }
  if(callFor === 'module' || callFor === 'country-list') {
    returnOut = `${baseURL}api$/{Endpoints[callFor]}`;
  }
  else{
    returnOut = `${baseURL}api/${types}${Endpoints[callFor]}`;
  }
  // console.log('buildEndpoint', returnOut);
  return returnOut;
};

export const useApi = createQuery<Response, Variables, AxiosError>({
  queryKey: ['Api'],
  fetcher: async (variables: Variables) => {
    const response = await client.get(buildEndpoint(variables.endpoint, variables.userType),
      {
        headers: {
          'Authorization': `Bearer ${variables.token}`
      }}
    );
    // console.log('TOKEN',variables.token);
    return response.data;
  },
});
/*
import { useApi } from '@/repository/services';
import type { Api } from '@/repository/types';


const { data, isPending, isError } = useApi({
  //@ts-ignore
  variables: { id: local.id },
});


if (isPending) {
  return (
    <View className="flex-1 justify-center  p-3">
      <Stack.Screen options={{ title: 'Api', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <ActivityIndicator />
    </View>
  );
}
if (isError) {
  return (
    <View className="flex-1 justify-center p-3">
      <Stack.Screen options={{ title: 'Api', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <Text className="text-center">Error loading module</Text>
    </View>
  );
}

<Text className="text-xl">{data.title}</Text>
<Text>{data.body} </Text>
*/