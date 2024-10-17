/* eslint-disable unicorn/filename-case */

/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { Env } from '@env';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS, SIZES } from '@/constants/BANK';
import { translate } from '@/core';
import { useAuth } from '@/core';
import {decrypt, encrypt} from '@/services/crypto';
import Protek from '@/services/Protek';

const AES256 = require('acypher');
const pinLength = 4;
const pinContainerSize = SIZES.width / 2;
const pinMaxSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinMaxSize - pinSpacing * 2;

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];
const dialPadSize = SIZES.width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;
const _spacing = 20;

function DialPad({ onPress }: { onPress: (item: (typeof dialPad)[number]) => void }) {
  Vibration.vibrate();
  return (
    <FlatList
      numColumns={3}
      data={dialPad}
      style={{ flexGrow: 1 }}
      keyExtractor={(_, index) => index.toString()}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: _spacing }}
      contentContainerStyle={{ gap: _spacing }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            disabled={item === ''}
            onPress={() => {
              onPress(item);
            }}>
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                borderRadius: dialPadSize / 2,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: typeof item !== 'number' ? 0 : 1,
                borderColor: 'black',
              }}>
              {item === 'del' ? (
                <Ionicons name="backspace-outline" size={dialPadTextSize} color="black" />
              ) : (
                <Text
                  style={{
                    fontSize: dialPadTextSize,
                    fontFamily: 'Poppins Regular',
                    color: 'black',
                  }}>
                  {item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}


const ConfirmPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
  const router = useRouter();
  const registerIn = useAuth.use.registerIn();
  const pin = useAuth.use.pin();
  const [code, setCode] = useState<number[]>([]);
   function protec(codes: string) {
    //TODO: encode pin
    ///*
    
    const tokenZero = String(encrypt(codes)); // enc token
    //console.log('Token',tokenZero);
    //const tokenRemoteDCrip =  decrypt(tokenZero.toString());
    //console.log('tokenRemoteDCrip', tokenRemoteDCrip);
    //*/
    registerIn({ pin: tokenZero, password: '', type: '', email: '', name: '', phone: '', terms: '' });
    router.push('/Signup');
  }

  return (
    <SafeAreaView style={styles.area}>
      <Text style={styles.formTitle}>{translate('bank_screens.ConfirmPassword')}</Text>
      <View
        style={{
          flexDirection: 'row',
          gap: pinSpacing * 2,
          marginBottom: _spacing * 2,
          height: pinSize * 2,
          alignItems: 'flex-end',
        }}>
        {[...Array(pinLength).keys()].map(key => {
          const isSelected = !!code[key];

          return (
            <View
              key={key}
              style={{
                width: pinSize,
                height: isSelected ? pinSize : 2,
                borderRadius: pinSize,
                backgroundColor: COLORS.primary,
              }}
            />
          );
        })}
      </View>
      <DialPad
        onPress={item => {
          if (item === 'del') {
            setCode(prevCode => prevCode.slice(0, prevCode.length - 1));
          } else if (typeof item === 'number') {
            if (code.length === pinLength) {
              let codes = code.toString();
              codes = codes.replaceAll(',', '');

              //TODO: encode pin
              if (pin === codes) {
                protec(codes);
                
              } else {
                router.push('/CreatePassword');
              }
            }
            setCode(prevCode => [...prevCode, item]);
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 18,
  },
});

export default ConfirmPassword;
