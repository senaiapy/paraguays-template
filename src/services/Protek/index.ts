/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
//###########################################
//#  www.airspacedefense.org
//#  Eng Marcelo Anjos
//#  marcelu.phd@gmail.com
//#  10/04/2020
//###########################################

// import {GLOBAL} from '@/config/global';
import { Env } from '@env';
import DeviceInfo from 'react-native-device-info';
const AES256 = require('acypher');

export default class Protek {
  static async getProtek(machineKey: any) {
    let posApiKeyMobile = 'undefined';
    let posKeyPrivate = 'undefined';

    try {

      //TODO: change for most privacy
      /*
    const teln = await  DeviceInfo.getPhoneNumber();
    const imein = await IMEI.getImei();
    const seridn = await DeviceInfo.getSerialNumber();
     const andidn = await DeviceInfo.getAndroidId();
    //let macidn = await DeviceInfo.getMacAddress();
    const seridn = await DeviceInfo.getSerialNumber();
    const mobileMKey = teln + imein;
    const mobileKey = andidn + seridn;
    */

      const andidn = await DeviceInfo.getAndroidId();
      //let macidn = await DeviceInfo.getMacAddress();
      const seridn = await DeviceInfo.getAndroidId();
      const mobileMKey = seridn;
      const mobileKey = andidn;

      // if (GLOBAL.DEBUG === true) {
      //   // console.log(' teln ',teln); // phone number
      //   // console.log(' imein ',imein); // imei
      //   console.log(' andidn ', andidn); // android id
      //   //  console.log(' macidn ',macidn); // mac address
      //   console.log(' seridn ', seridn); // serial device number
      //   console.log(' mobileMKey ', mobileMKey); // key 1
      // }

      // NOT NULL VERIFY
      if (mobileMKey !== null && mobileMKey !== '' && mobileMKey !== 'undefined') {
        //posApiKeyMobile = await AES256.encrypt(mobileMKey, machineKey);
      }

      // if (GLOBAL.DEBUG === true) {
      //   console.log(' posApiKeyMobile ', posApiKeyMobile); // key 1 cripto
      // } // end console log

      if (mobileKey !== null && mobileKey !== '' && mobileKey !== 'undefined') {
        //posKeyPrivate = await AES256.encrypt(mobileKey, machineKey);
      }

      // if (GLOBAL.DEBUG === true) {
      //   console.log(' posKeyPrivate ', posKeyPrivate); // key 2 cripto
      // } // end console log

      // var datakey = AES256.encrypt(dataMachineKeys, key);
      // var mobikey = AES256.encrypt(mobileMachineKey, key);

      //var datakey = AES256.decrypt(dataMachineKeys, key);
      //var mobikey = AES256.decrypt(mobileMachineKey, key);
      // const key = "2B7E151628AED2A6ABF7158809CF4F3C";

      //Alert.alert(JSON.stringify(values));
    } catch (e) {
      console.log('PhoneERROR ', e);
    }
    const protek = { posApiKeyMobile, posKeyPrivate };
    return protek;
  } // end function loadProtek
  /*
        +595984187131
       ["352163081636557", "352163081636565"]
        50757e1c21457430
        D0:13:FD:58:02:97
        LGH9903f370675
    */
  //shortcut for RNSimData.getSimInfo().carrierName0
  // RNSimData.getCarrierName();
  //shortcut for RNSimData.getSimInfo().countryCode0
  // RNSimData.getCountryCode();
  /*
        DeviceInfo.getIPAddress().then(ip => {
          // "92.168.32.44"
        });
        */

  //-----------------------


  static async createProtek(): Promise<any> {
    let protek = null;

    try {
      // Get the device's unique ID (IMEI on Android, IDFV on iOS)
      // const uniqueId = DeviceInfo.getUniqueId();
      // console.log('Unique ID:', uniqueId);
      //
      // // Get the device's model (e.g., iPhone X, Samsung Galaxy S10)
      // const deviceModel = DeviceInfo.getModel();
      // console.log('Device Model:', deviceModel);
      //
      // // Get the device's brand (e.g., Apple, Samsung)
      // const deviceBrand = DeviceInfo.getBrand();
      // console.log('Device Brand:', deviceBrand);
      //
      // // Get the device's system name (e.g., iOS, Android)
      // const systemName = DeviceInfo.getSystemName();
      // console.log('System Name:', systemName);
      //
      // // Get the device's system version (e.g., 14.5, 11)
      // const systemVersion = DeviceInfo.getSystemVersion();
      // console.log('System Version:', systemVersion);
      //
      // // Determine if the device is a tablet
      // const isTablet = DeviceInfo.isTablet();
      // console.log('Is Tablet:', isTablet);
      //
      // // Retrieve the device's total memory
      // const totalMemory = DeviceInfo.getTotalMemory();
      // console.log('Total Memory:', totalMemory);
      //
      // // Access the device's battery level
      // const batteryLevel = DeviceInfo.getBatteryLevel();
      // console.log('Battery Level:', batteryLevel);

      const uniqueId = await DeviceInfo.getUniqueId();
      console.log('Unique ID:', uniqueId);
      if (uniqueId !== null && uniqueId !== '' && uniqueId !== 'undefined') {
        //protek = await AES256.encrypt(uniqueId, Env.KEY);
        protek = String(uniqueId);
      }
    } catch (e) {
      console.log('PhoneERROR ', e);
    }
    return protek;
  } // end function loadProtek
}
