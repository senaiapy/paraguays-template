/* eslint-disable unicorn/filename-case */
export interface Datas {
    id?: number,
    title: string,
    image: string,
    price: number
}

export interface module  {
  id: number;
  module: string;
  status: string; // bool
  kyc: string; // bool
  created_at: string | null;
  updated_at: string;
}