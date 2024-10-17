/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/BANK/Button';
import Input from '@/components/BANK/Input';
import InputLabel from '@/components/BANK/InputLabel';
import PageContainer from '@/components/BANK/PageContainer';
import { COLORS, illustrations, SIZES } from '@/constants/BANK';
import { translate } from '@/core';
import { validateInput } from '@/utils/BANK/actions/formActions';
import { reducer } from '@/utils/BANK/reducers/formReducers';

interface InputValues {
  email: string;
}

interface InputValidities {
  email: boolean | undefined;
}

interface FormState {
  inputValues: InputValues;
  inputValidities: InputValidities;
  formIsValid: boolean;
}

const initialState: FormState = {
  inputValues: {
    email: '',
  },
  inputValidities: {
    email: false,
  },
  formIsValid: false,
};

const ForgotPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [userMail, setUserMail] = useState<string>('example@example.com');

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error);
    }
  }, [error]);
  return (
    <SafeAreaView style={styles.area}>
      <PageContainer>
        <ScrollView>
          <Text style={styles.formTitle}>{translate('bank_screens.ForgotPassword')}</Text>
          <View style={{ alignItems: 'center' }}>
            <Image source={illustrations.forgetPassword} resizeMode="contain" style={styles.illustration} />
          </View>
          <Text style={styles.formSubtitle}>{translate('bank_screens.registeredMail')}</Text>
          <Text style={styles.formSubtitle}>{translate('bank_screens.password_reset')}</Text>
          <View style={{ marginVertical: 32 }}>
            <InputLabel title="Email Address" />
            <Input
              id="email"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['email']}
              placeholder={userMail}
              placeholderTextColor={COLORS.black}
            />
          </View>
          <Button title={translate('bank_screens.SendCode')} filled onPress={() => router.push('/ResetPassword')} style={styles.btn} />
        </ScrollView>
      </PageContainer>
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
  formSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins Regular',
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginVertical: 2,
  },
  illustration: {
    height: 179,
    width: 179,
    marginVertical: 32,
  },

  btn: {
    width: SIZES.width - 32,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    marginVertical: 16,
  },
});

export default ForgotPassword;
