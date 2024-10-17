import { configureAuth } from 'react-query-auth';

import {
  type AuthResponse,
  getUserProfile,
  loginWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
} from './api';
import { storage } from './utils';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  name: string;
  password: string;
};

async function handleUserResponse(data: AuthResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function userFn() {
  const { user } = await getUserProfile();
  return user ?? null;
}

async function loginFn(data: LoginCredentials) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentials) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  await logout();
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
  });

/*
  import { useLogout, useUser } from '@/lib/auth';
  const user = useUser({});
  const logout = useLogout({});

  <View>Welcome {user.data?.name}</View>
  <Button disabled={logout.isLoading} onClick={() => logout.mutate({})}>
    Log Out
  </Button>
  */

/*
import {
  LoginCredentials,
  RegisterCredentials,
  useLogin,
  useRegister,
} from '@/lib/auth';

// REGISTER
const register = useRegister();

type RegisterCredentials = {
  email: string;
  name: string;
  password: string;
}
function onSubmit(values: RegisterCredentials) {
  
register.mutate(values, {
  onSuccess: () => console.log('registered'),
});

}

<Button disabled={register.isLoading} type="submit">
login
</Button>

//LOGIN
const login = useLogin();

type LoginCredentials = {
  email: string;
  password: string;
}
function onSubmit(values: LoginCredentials) {
login.mutate(values);
}

<Button disabled={login.isLoading} type="submit">
Submit
</Button>
*/