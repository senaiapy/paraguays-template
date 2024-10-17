import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from './client';
import type { Module } from './types';

type Variables = { id: string };
type Response = Module[];

export const useModule = createQuery<Response, Variables, AxiosError>({
  queryKey: ['module'],
  fetcher: () => {
    return client
      //.get(`api/module/${variables.id}`)
      .get('api/module')
      .then((response) => response.data);
  },
});
/*
import { useModule } from '@/repository/services';
import type { Module } from '@/repository/types';


const { data, isPending, isError } = useModule({
  //@ts-ignore
  variables: { id: local.id },
});


if (isPending) {
  return (
    <View className="flex-1 justify-center  p-3">
      <Stack.Screen options={{ title: 'Module', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <ActivityIndicator />
    </View>
  );
}
if (isError) {
  return (
    <View className="flex-1 justify-center p-3">
      <Stack.Screen options={{ title: 'Module', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <Text className="text-center">Error loading module</Text>
    </View>
  );
}

<Text className="text-xl">{data.title}</Text>
<Text>{data.body} </Text>
*/