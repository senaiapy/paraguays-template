/* eslint-disable unicorn/filename-case */
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/BANK/Button';
import { COLORS, illustrations, SIZES } from '@/constants/BANK';
import { translate } from '@/core';

// eslint-disable-next-line unused-imports/no-unused-vars
const AccountCreated: React.FC<{ navigation: any }> = ({ navigation }) => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.formTitle}>{translate('bank_screens.accountcreated_Account_Created')}</Text>
        <Text style={styles.formSubTitle}>{translate('bank_screens.accountcreated_Your_account')}</Text>
        <Image source={illustrations.accountCreated} resizeMode="contain" style={styles.illustration} />
        <Button title="Continue" filled onPress={() => router.push('/Login')} style={styles.btn} />
        <View>
          <Text style={styles.footerTitle}>{translate('bank_screens.accountcreated_By_clicking')}</Text>
          <TouchableOpacity>
            <Text style={styles.footerSubtitle}>{translate('bank_screens.accountcreated_Terms_and')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 18,
  },
  formSubTitle: {
    fontSize: 14,
    fontFamily: 'Poppins Regular',
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  illustration: {
    height: 217,
    width: 217,
    marginVertical: 64,
  },
  btn: {
    width: SIZES.width - 32,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  footerTitle: {
    fontSize: 12,
    fontFamily: 'Poppins Regular',
    color: 'black',
    marginVertical: 4,
    textAlign: 'center',
  },
  footerSubtitle: {
    fontSize: 12,
    fontFamily: 'medium',
    color: 'black',
    marginVertical: 4,
    textAlign: 'center',
    textDecorationColor: 'black',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
export default AccountCreated;
