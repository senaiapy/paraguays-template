/* eslint-disable unicorn/filename-case */
export interface IRead<T> {
  find(item: T): Promise<T[]>;
  findOne(id: string): Promise<T>;
}
