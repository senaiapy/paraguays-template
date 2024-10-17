/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/BANK/Button';
import PageContainer from '@/components/BANK/PageContainer';
import { COLORS, SIZES } from '@/constants/BANK';
import { translate } from '@/core';

const VerifyAccount: React.FC<{ navigation: any }> = ({ navigation }) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();
  const [phoneToSend, setPhoneToSend] = useState('+595 993547294');

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.area}>
      <PageContainer>
        <ScrollView>
          <Text style={styles.formTitle}>{translate('bank_screens.verify_VerifyAccount')}</Text>
          <Text style={styles.formSubTitle}>{translate('bank_screens.verify_digitcode')}</Text>
          <Text style={styles.phoneNumber}>{phoneToSend}</Text>
          <View style={{ marginVertical: 16 }}>
            <OTPTextInput textInputStyle={styles.OTPStyle} inputCount={4} tintColor={COLORS.primary} />
          </View>
          <Text style={styles.formSubTitle}>{translate('bank_screens.verify_Haven_received')}</Text>
          <TouchableOpacity>
            <Text style={styles.resendCode}>{translate('bank_screens.verify_ResendCode')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </PageContainer>
      <View style={styles.footer}>
        <Button title="Verify Now" filled onPress={() => router.push('/AccountCreated')} style={styles.filledBtn} />
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
  phoneNumber: {
    fontSize: 14,
    fontFamily: 'medium',
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  OTPStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderRadius: 10,
    height: 58,
    width: 58,
    borderBottomWidth: 2,
  },
  footer: {
    width: '100%',
    marginVertical: 12,
    position: 'absolute',
    bottom: 36,
    right: 16,
    left: 16,
  },
  resendCode: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: COLORS.primary,
    textAlign: 'center',
    textDecorationColor: COLORS.primary,
    textDecorationLine: 'underline',
    marginVertical: 4,
  },
  filledBtn: {
    width: SIZES.width - 32,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
});

export default VerifyAccount;
