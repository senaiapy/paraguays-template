/**
 // ########################################
// #  www.pydoundation.org
// #  Eng Marcelo Anjos
// #  marcelu.phd@gmail.com
// #  2022-02-10
// ########################################
 * @ Create Time: 2022-04-16 20:57:35
 * @ Modified by: Your name
 * @ Modified time: 2022-04-17 11:08:53
 * @ Description:
 */

import { Env } from '@env';
import axios from 'axios';

export const ApiClient = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

/*----------------------------------------------------------------

//---------------------- Query Rest ------------------------------
import {User} from 'services/crudQuery/objs/types';

import {
  useCreateObj,
  useDeleteObj,
  useModifyObj,
  useObj,
  useObjId,
  useObjs,
} from 'services/crudQuery/objs/useObj';
import {getObjs} from 'services/crudQuery/objs/objs';
//---------------------- Query Rest ------------------------------

// ---------------------QUERY CRUD-------------------------
  const endpoint: string = 'users';
  const endpoints: string = 'users';
  const [datas, setDatas] = useState<User | undefined>();
  const [objId, setObjId] = useState<any>(0);
  const {mutate: createObj} = useCreateObj<User | undefined>(endpoint, datas);
  const {mutate: modifyObj} = useModifyObj<User | undefined>(
    endpoint,
    objId,
    datas,
  );

  const {mutate: deleteObj} = useDeleteObj<User | undefined>(endpoint, datas);

  const {
    isLoading: objsLoading,
    data: objsData,
    refetch: geObjs,
  } = useObjs<User>(endpoints);

  const {isLoading, data: getObj} = useObj<User | undefined>(endpoint, {
    objId: objId,
  });

  const onGotoUserDetails = useCallback(
    (userId: any) => {
      navigation.navigate('UserDetails', {
        userId,
      });
    },
    [navigation],
  );
  // ---------------------QUERY CRUD-------------------------


      <Button
        title="List User"
        onPress={() => {
          list(endpoint, 1);
        }}
      />

      <Button
        title="List UserS"
        onPress={() => {
          lists(endpoints);
        }}
      />

      <Button
        title="List UserPage"
        onPress={() => {
          listsPage(endpoint);
        }}
      />

      <Button
        title="Create Obj"
        onPress={() =>
          creates(endpoint, {
            name: 'Jil',
            job: 'some-title-edited',
          })
        }
      />

      <Button
        title="Update Obj"
        onPress={() =>
          updates(endpoint, 555, {name: 'Jilo', job: 'some-title-editeds'})
        }
      />

      <Button title="Del User" onPress={() => deletes(endpoint, 147)} />
 <Image
          style={{alignItems: 'center', width: 100, height: 100}}
          source={{uri: getObj?.data?.avatar}}
        />
        <Text>{`${getObj?.data?.first_name} ${getObj?.data?.last_name}`}</Text>
        <Text>{getObj?.data?.email}</Text>

*/
