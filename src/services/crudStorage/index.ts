/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import AsyncStorage from '@react-native-async-storage/async-storage';


const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log('Error getData');
  }
};

const storeOneDataObj = async (value: any, key: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('Data Saved');
  } catch (e) {
    // saving error
    console.log('Error storeOneData');
  }
};
//save a OBJ
const storeOneDataString = async (value: string, key: string) => {
  try {
    const DataStored = await getData(key);
    await AsyncStorage.setItem(key, value);
    console.log('Data Saved');
    return DataStored;
  } catch (e) {
    // saving error
    console.log('Error storeDataString');
  }
};

async function createStorage<T>(id: string, item: T): Promise<boolean> {
  let returno = false;
  try {
    const FileList: unknown[] = [];
    const DataStored = await getData(id);
    const values = {...item};
    if (!DataStored) {
      FileList.push(values);
      await AsyncStorage.setItem(id, JSON.stringify(FileList));
      returno = true;
    } else {
      DataStored.push(values);
      await AsyncStorage.setItem(id, JSON.stringify(DataStored));
      returno = true;
    }
    // console.log('base  ', currentUser);
    console.log('OBJ Saved');
  } catch (e) {
    // saving error
    console.log('Error storeDataObj');
  }
  return returno;
}

async function updateStorage<T>(id: string, item: T): Promise<boolean> {
  let returno = false;
  try {
    const dataStored = await getData(id);
    const jsonValueData = JSON.stringify(dataStored);
    await AsyncStorage.setItem(id, jsonValueData);
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.mergeItem(id, jsonValue);
    // read merged item
    console.log('Data Update');
    returno = true;
  } catch (e) {
    // saving error
    console.log('Error updateData');
  }
  return returno;
}

async function findStorage<T>(id: string): Promise<any> {
  let returno;
  try {
    const jsonValue = await AsyncStorage.getItem(id);
    jsonValue != null ? JSON.parse(jsonValue) : null;
    returno = JSON.stringify(jsonValue);
    returno = returno.replace(/[^\w\s]/gi, '');
    //console.log('DATA', returno);
    returno = returno.toString();
  } catch (e) {
    console.log('Error getDataString');
  }
  return returno;
}

async function findOneStorage<T>(id: string, key: any): Promise<T | undefined> {
  let returno;
  try {
    const dataStored = await getData(id);
    returno = dataStored.some((item: any) => item.id === key.id);
  } catch (e) {
    // read key error
    console.log('Error hasData');
  }
  return returno;
}

async function deleteStorage<T>(id: string): Promise<boolean> {
  let returno = false;
  try {
    await AsyncStorage.removeItem(id);
    console.log('Clear One.');
    returno = true;
  } catch (e) {
    // remove error
    console.log('Error removeOne');
  }
  return returno;
}

async function deleteAllStorage<T>(): Promise<boolean> {
  let returno = false;
  try {
    await AsyncStorage.clear();
    console.log('Clear One.');
    returno = true;
  } catch (e) {
    // remove error
    console.log('Error removeOne');
  }
  return returno;
}

async function deleteByIdStorage(id: any, key: string): Promise<boolean> {
  let returno = false;

  try {
    const dataStored = await getData(key);

    const myData = await dataStored.filter((item: any) => {
      return item.id !== id;
    });
    const jsonValue = JSON.stringify(myData);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('Deleted By Id');
    //return myData;
    returno = true;
  } catch (e) {
    // read key error
    console.log('Error Deleted By Id');
  }
  return returno;
}

// get all keys from
async function getAllKeysStorage() {
  var keys: any;
  try {
    keys = await AsyncStorage.getAllKeys();
    console.log(keys);
  } catch (e) {
    // read key error
    console.log('Error getAllKeys');
  }
  return keys;
}

// verify if have data saved
async function hasDataStorage(value: any, key: string): Promise<boolean | undefined> {
  let returno = false;
  try {
    const dataStored = await getData(key);
    const hasDatas = dataStored.some((item: any) => item.id === value.id);
    if (hasDatas) {
      returno = true;
    }
  } catch (e) {
    // read key error
    console.log('Error hasData');
  }
  return returno;
}

const crudStorage = {
  storeOneDataObj,
  storeOneDataString,
  createStorage,
  updateStorage,
  findStorage,
  findOneStorage,
  deleteStorage,
  deleteAllStorage,
  deleteByIdStorage,
  getAllKeysStorage,
  hasDataStorage,
};

export default crudStorage;
