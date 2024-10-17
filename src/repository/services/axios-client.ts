/* eslint-disable max-params */
/* eslint-disable unused-imports/no-unused-vars */
import { Env } from '@env';
import axios from "axios";

import { useAuth } from '@/core';

let accessToken = "";
let baseURL = Env.API_URL; //"http://localhost:3000/";

const axiosApi = axios.create({
  baseURL: Env.API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${accessToken}`,
  },
});

//const token = localStorage.getItem("token");
const token = useAuth.use.token();
const type = useAuth.use.type();// user agent merchant

axiosApi.interceptors.request.use(function (config: any) {
  config.headers.Authorization = token ? token : "";
  return config;
});

const endpoints: any = {
  login: "v1/auth/vendor",
  register: "v1/user/add",
  module: "module",
  countries: "api/country-list",

  signIn: '/login',
  signUp: '/register',
  refreshToken: '/refresh/token',
  twoFaOtpVerification: '/otp-submit',
  user: '/user-info',
  updateProfile: '/profile-settings',
  resetPassword: '/forgot-password',
  verifyEmail: '/forgot-password/verify-code',
  resetPasswordSubmit: '/reset-password',
  changePassword: '/change-password',
  kycForm: '/kyc-form-data',
  kycFormSubmit: '/kyc-form',
  generateQr: '/generate-qrcode',
  settings: '/settings',
  dashboard: '/dashboard',
  //Withdraw
  withdrawList: '/withdraw-history',
  withdrawFrom: '/withdraw-money',
  methods: '/withdraw-methods?currency=',
  submitWithdraw: '/withdraw-money',
  //Support
  tickets: '/support/tickets',
  openTickets: '/open/support/ticket',
  ticketMessages: '/support/ticket/messages/',
  ticketReply: '/reply/ticket/',
  //2fa verification
  sendCode: '/send/two-step/verify-code',
  resendCode: '/resend/two-step/verify-code',
  enableVerification: '/two-step/verification',
  loginVerification: '/two-step/code/verify',
};

const buildEndpoint = (callFor: string) => {
  let returnOut = "";
  if(callFor === 'module' || callFor === 'country-list') {
    returnOut = `${baseURL}/api/${endpoints[callFor]}`;
  }
  else{
    returnOut = `${baseURL}/api/${type}/${endpoints[callFor]}`;
  }
  return returnOut;
};

 const getRequest = async ( endpoint: any, parameter: any = {}, urlParams: any = []) => {
  try {
    let getURL = buildEndpoint(endpoint);
    if (urlParams.length) {
      urlParams.forEach((param: string) => {
        getURL += `/${param}`;
      });
    }
    const { data, request } = await axiosApi.get(getURL, {
      params: parameter,
    });
    return data;
  } catch (e) {
    return false;
  }
};

 const postRequest = async (endpoint: any, body: any = {}) => {
  try {
    const { data } = await axiosApi.post(buildEndpoint(endpoint), body);
    return data;
  } catch (e) {
    return false;
  }
};

 const putRequest = async (endpoint: any, body: any = {}) => {
  try {
    const { data } = await axiosApi.put(buildEndpoint(endpoint), body);
    return data;
  } catch (e) {
    return false;
  }
};

const patchRequest = async (endpoint: any, body: any = {}) => {
  try {
    const { data } = await axiosApi.patch(buildEndpoint(endpoint), body);
    return data;
  } catch (e) {
    return false;
  }
};

export const ApiClient = async ( method: any, endpoint: any, parameter: any = {}, urlParams: any = [], body: any = {}) => {  
  let returnOut:any = null;
  if(method === 'get') {
    returnOut = await getRequest(endpoint, parameter, urlParams);
  } else if(method === 'post') {  
    returnOut = await postRequest(endpoint, body);
  } else if(method === 'put') {
    returnOut = await putRequest(endpoint, body);
  } else if(method === 'patch') {
    returnOut = await patchRequest(endpoint, body);
  }
  return returnOut;
}