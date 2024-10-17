/**
 // ########################################
// #  www.pydoundation.org
// #  Eng Marcelo Anjos
// #  marcelu.phd@gmail.com
// #  2022-02-10
// ########################################
 * @ Create Time: 2022-04-16 20:57:35
 * @ Modified by: Your name
 * @ Modified time: 2022-04-17 10:42:22
 * @ Description:
 */

export type ObjsRequestPayload = {
  pageParam?: number;
  per_page?: number;
};

export type ObjsSuccessPayload = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data?: Obj[] | null;
  //@ts-ignore
  support: Support;
};

export type ObjDetailsRequestPayload = {
  objId: number;
};

export type ObjDetailsSuccessPayload = {
  data: Obj;
  //@ts-ignore
  support: Support;
};

export type Obj = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
