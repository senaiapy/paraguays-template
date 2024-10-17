/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable unused-imports/no-unused-vars */
import { Env } from '@env';
import crypto from 'react-native-quick-crypto';

import Protek from '@/services/Protek';


const key = Env.KEY; //length=22length=22'your-key-here'; // Replace with your actual key
const iv = ''; //'your-iv-here'; // Replace with your actual IV

const ENC = Env.KEY;//'bf3c199c2470cb477d907b1e0917c17b';
const ALGO = "aes-256-cbc"
const IV = "5183666c72eec9e4"; //async () => await Protek.createProtek();//"5183666c72eec9e4";

export const Encrypt = async (value: any) => {
  let ciph: string = '';
  try {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    ciph = cipher.update(value, 'utf8', 'hex') as string;
    ciph += cipher.final('hex') as string;

  } catch (e) {
    // read key error
    console.log('Error encrypt');
  }

  return ciph;
}

export const Decrypt = async (value: any) => {
  let txt: string = '';
  try {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    txt = decipher.update(value, 'hex', 'utf8') as string;
    txt += decipher.final('utf8') as string;
  } catch (e) {
    // read key error
    console.log('Error decrypt');
  }

  return txt
}

export const encrypt = ((value: string) => {
  let cipher = crypto.createCipheriv(ALGO, ENC, IV);
  let encrypted = cipher.update(value, 'utf8', 'base64');
  encrypted += cipher.final('base64') as string;
  return encrypted;
});

export const decrypt = ((value: string) => {
  let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
  let decrypted = decipher.update(value, 'base64', 'utf8');
  decrypted += decipher.final('utf8') as string;
  return decrypted;
});


// import {encrypt, decrypt} from 'react-native-quick-crypto';
//const password = encrypt(codes);
//const dPassword = decrypt(password);
//console.log('codes', password);
//console.log('pin', dPassword);