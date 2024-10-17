import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from './client';
import type { CountryList } from './types';

type Variables = { id: string };
type Response = CountryList;

export const useCountryList = createQuery<Response, Variables, AxiosError>({
  queryKey: ['country-list'],
  fetcher: () => {
    return client
      //.get(`api/country-list/${variables.id}`)
      .get('api/country-list')
      .then((response) => response.data);
  },
});
/*
import { useCountry-List } from '@/api';


const { data, isPending, isError } = useCountry-List({
  //@ts-ignore
  variables: { id: local.id },
});


if (isPending) {
  return (
    <View className="flex-1 justify-center  p-3">
      <Stack.Screen options={{ title: 'Country-List', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <ActivityIndicator />
    </View>
  );
}
if (isError) {
  return (
    <View className="flex-1 justify-center p-3">
      <Stack.Screen options={{ title: 'Country-List', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <Text className="text-center">Error loading country-list</Text>
    </View>
  );
}

<Text className="text-xl">{data.title}</Text>
<Text>{data.body} </Text>
*/