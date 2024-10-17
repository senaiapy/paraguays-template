import { Env } from '@env';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from './client';
import { Endpoints } from './endpoints';
import type { SignUp } from './types';
type Response = SignUp;

type Variables = {
  method: string,
  token: string,
  endpoint: string,
  userType: string,
  data: {
    name: string,
    email: string,
    dial_code: string,
    phone: string,
    password: string,
    password_confirmation: string,
    country: string,
    address: string,
  },
};
let baseURL = Env.API_URL; //"http://localhost:3000/";

const buildEndpoint = (callFor: string, types: string) => {
  let returnOut = "";
  if(types === '' || types === null || types === undefined){
    types = 'user';
  }
  if (callFor === 'module' || callFor === 'country-list') {
    returnOut = `${baseURL}api$/{Endpoints[callFor]}`;
  }
  else {
    returnOut = `${baseURL}api/${types}${Endpoints[callFor]}`;
  }
  // console.log('buildEndpoint', returnOut);
  return returnOut;
};

export const useAddSignUp = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables: Variables) =>
    client({
      url: buildEndpoint(variables.endpoint, variables.userType),//variables.endpoint, //`${baseURL}api/user/login`,//buildEndpoint(variables.endpoint, variables.userType),
      method: variables.method,
      data: variables.data, // {},//{email: variables.email, password: variables.password},
    }).then((response) => response.data),
});

/*
import { useAuth } from '@/core';
import { useAddSignIn } from '@/repository/services/use-add-signin';
import { ActivityIndicator, FocusAwareStatusBar } from '@/ui';
import { showErrorMessage } from '@/ui';

const types = useAuth.use.type();
const { mutate: addSignIn, isPending } = useAddSignIn();
const data = {
  email: 'user@gmail.com', password: '123456',
}
const returno = addSignIn(
  {
    data,
    token: '',
    method: 'POST',
    endpoint: 'signIn',
    userType: types,
  },
  {
    onSuccess: (data) => {
      showMessage({
        message: 'Post added successfully',
        type: 'success',
      });
      // here you can navigate to the post list and refresh the list data
      //queryClient.invalidateQueries(usePosts.getKey());
      const token = data.response?.token;
      const user =data.response?.user;
    },
    onError: () => {
      showErrorMessage('Error adding post');
    },
  }
);
*/