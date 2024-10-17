/* eslint-disable unicorn/filename-case */
/**
 // ########################################
// #  www.pydoundation.org
// #  Eng Marcelo Anjos
// #  marcelu.phd@gmail.com
// #  2022-02-10
// ########################################
 * @ Create Time: 2022-04-16 20:57:35
 * @ Modified by: Your name
 * @ Modified time: 2022-04-17 10:41:46
 * @ Description:
 */
import {useInfiniteQuery} from 'react-query';

import {getObjs} from './objs';
import {type ObjsSuccessPayload} from './types';

// eslint-disable-next-line unused-imports/no-unused-vars
export default function useObjs<T>(endpoints: string, {per_page = 5}) {
  return useInfiniteQuery<ObjsSuccessPayload, Error>('objs', ({pageParam = 1}) => getObjs<any>(endpoints, {pageParam, per_page}), {
    keepPreviousData: true,
    getNextPageParam: (lastPage):any => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}
