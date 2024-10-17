/* eslint-disable unicorn/filename-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-lines-per-function */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import RNRestart from 'react-native-restart';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/BANK/Button';
import { COLORS, SIZES } from '@/constants/BANK';
import { translate } from '@/core';
import { useAuth } from '@/core';

// eslint-disable-next-line unused-imports/no-unused-vars
const Account: React.FC<{ navigation: any }> = ({ navigation }) => {
  const router = useRouter();

  const signOut = useAuth.use.signOut();

  const [isAccountHidden, setIsAccountHidden] = useState(false);

  const toggleSwitch = async (value: any) => {
    try {
      await AsyncStorage.setItem('isAccountHidden', JSON.stringify(value));
      setIsAccountHidden(value);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  const getSwitchValue = async () => {
    try {
      const value = await AsyncStorage.getItem('isAccountHidden');
      if (value !== null) {
        setIsAccountHidden(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  React.useEffect(() => {
    getSwitchValue();
  }, []);

  const deleteAccount = () => {
    signOut();
    console.log('deleteAccount');
    RNRestart.Restart();
  };

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Text style={styles.formTitle}>{translate('bank_screens.account_Account')}</Text>
        <View style={styles.formContainer}>
          <Text style={styles.formText}>{translate('bank_screens.account_Hide_Account')}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#F1F1F1' }}
            thumbColor={isAccountHidden ? COLORS.primary : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isAccountHidden}
          />
        </View>
        <View style={{ marginVertical: 32 }}>
          <Text style={styles.body6}>{translate('bank_screens.account_Make_sure')}</Text>
          <Text style={styles.body6}>{translate('bank_screens.account_as_you_ll')}</Text>
        </View>
        <Text style={styles.email}>sunombre@gmail.com</Text>
      </View>
      <View style={styles.footer}>
        <Button
          title={translate('bank_screens.account_Change_Password')}
          filled
          onPress={() => router.push('/ChangePassword')}
          style={styles.filledBtn}
        />
        <Button
          title={translate('bank_screens.account_Logout')}
          onPress={() => {
            console.log('Login');
            signOut();
            router.push('/Login');
          }}
          textColor={COLORS.primary}
          style={styles.outlinedBtn}
        />
        <TouchableOpacity onPress={() => deleteAccount()} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.footerText}>{translate('bank_screens.account_Delete_Account')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 18,
  },
  formContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0.3,
    paddingVertical: 8,
  },
  formText: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.primary,
    textAlign: 'center',
  },
  body6: {
    fontSize: 14,
    fontFamily: 'Poppins Regular',
    color: COLORS.primary,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    fontFamily: 'medium',
    color: COLORS.primary,
    textAlign: 'center',
  },
  filledBtn: {
    width: SIZES.width - 32,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  outlinedBtn: {
    width: SIZES.width - 32,
    marginBottom: SIZES.padding,
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
  },
  footer: {
    width: '100%',
    marginVertical: 12,
    position: 'absolute',
    bottom: 22,
    right: 16,
    left: 16,
  },
  footerText: {
    fontSize: 16,
    fontFamily: 'Poppins Regular',
    color: COLORS.black,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.black,
    textDecorationStyle: 'solid',
  },
});
export default Account;
