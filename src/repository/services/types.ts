export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Module = {
  success: boolean;
  message: string;
  response: [
    {
      id: number;
      module: string;
      status: string; // bool
      kyc: string; // bool
      created_at: Date | null;
      updated_at: Date;
    },
  ]
}

export type Modul = {
  
  response: [
    {
      id: number;
      module: string;
      status: string; // bool
      kyc: string; // bool
      created_at: Date | null;
      updated_at: Date;
    },
  ]
}

export type CountryList = {
  any: any
}
export type Dashboard = {
  success: boolean;
  message: string;
  response: {
    wallets: [
      {
        id: number;
        user_id: string;
        user_type: string;
        currency_id: string;
        balance: string;
        created_at: string;
        updated_at: string;
        currency: {
          id: number;
          default: string;
          symbol: string;
          code: string;
          curr_name: string;
          type: string;
          status: string;
          rate: string;
          created_at: Date;
          updated_at: Date;
        }
      }
    ];
    transactions: any[];
    totalTransferMoney: number;
    totalExchange: number;
    totalDeposit: number;
    totalWithdraw: number;
  }
}

export type Api = {
  any: any
}
export type SignIn = {
  success: boolean;
  message: string;
  response: {
    token: string; // "127|Odwh5YDWIlhIRJaBn02u8rDCL1zjvuJoknQeSB1m20081828", 
    user: { // {
      id: number; // 2,
      name: string; // "Marcelo Anjos",
      email: string; // "user@gmail.com",
      phone: string; // "++595 993547294",
      country: string; // "Asuncion",
      city: string; // "dhaka",
      zip: string; // "1230",
      address: string; // "Uttara",
      profile_photo: string; // "https://\/\/dbrbank.digital\/assets\/images\/18335353941697632725.jpg",
      email_verified: boolean; // true,
      kyc_status: string; // "1",
      two_fa_status: string; // "0",
      two_fa: string; // "0",
      two_fa_code: number; // 262431,
      status: string; // "1",
      created_at: Date; // "2023-09-25T19:53: string; //55.000000Z",
      updated_at: Date; // "2024-10-09T23:42:10.000000Z"
    },
  }
}

export type SignUp = {
  success: boolean;
  message: string;
  response: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      country: string;
      city: string;
      zip: string;
      address: string;
      profile_photo: string;
      email_verified: boolean;
      kyc_status: string; // '0
      two_fa_status: string; // '0
      two_fa: string; // '0
      two_fa_code: number; //269843
      status: string; // '1'
      created_at: Date;
      updated_at: Date
    }
  }
}
export interface ICurrency {
  id: number;
  default: string;
  symbol: string;
  code: string;
  curr_name: string;
  type: string;
  status: string;
  rate: string;
  created_at: Date;
  updated_at: Date;
}

export interface IWallet {
  id: number;
  user_id: string;
  user_type: string;
  currency_id: string;
  balance: string;
  created_at: Date;
  updated_at: Date;
  currency: ICurrency;
}

export interface ITransactions {
  id: number;
  trnx: string;
  user_id: string;
  user_type: string;
  currency_id: string;
  wallet_id: string;
  charge: string;
  amount: string;
  remark: string;
  type: string;
  details: string;
  invoice_num: string;
  created_at: Date;
  updated_at: Date;
  currency: ICurrency;
}

export interface IResponseDashboard {
  wallets: IWallet[];
  transactions: ITransactions[];
  totalTransferMoney: number;
  totalExchange: number;
  totalDeposit: number;
  totalWithdraw: number;
}

export interface IDashboard {
  success: boolean;
  message: string;
  response: IResponseDashboard;
}

export interface IResponseModule {
  id: number;
  module: string;
  status: string; // bool
  kyc: string; // bool
  created_at: Date | null;
  updated_at: Date;
}
export interface IModule {
  success: boolean;
  message: string;
  response: IResponseModule[];
}

export interface IUserUser {
  id: number;     
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  profile_photo: string;
  email_verified: boolean;
  kyc_status: string;
  two_fa_status: string;
  two_fa: string;
  two_fa_code: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface IResponseUser {
  token: string;
  user: IUserUser;
}
export interface IUser {
  success: boolean;
  message: string;
  response: IResponseUser;
}