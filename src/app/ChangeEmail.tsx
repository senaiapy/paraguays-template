/* eslint-disable unicorn/filename-case */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/BANK/Button';
import Header from '@/components/BANK/Header';
import Input from '@/components/BANK/Input';
import InputLabel from '@/components/BANK/InputLabel';
import { COLORS, SIZES } from '@/constants/BANK';
import { translate } from '@/core';
import { validateInput } from '@/utils/BANK/actions/formActions';
import { reducer } from '@/utils/BANK/reducers/formReducers';

interface InputValues {
  currentEmail: string;
  newEmail: string;
  password: string;
}

interface InputValidities {
  currentEmail: boolean | undefined;
  newEmail: boolean | undefined;
  password: boolean | undefined;
}

interface FormState {
  inputValues: InputValues;
  inputValidities: InputValidities;
  formIsValid: boolean;
}

const initialState: FormState = {
  inputValues: {
    currentEmail: '',
    newEmail: '',
    password: '',
  },
  inputValidities: {
    currentEmail: false,
    newEmail: false,
    password: false,
  },
  formIsValid: false,
};

const ChangeEmail: React.FC<{ navigation: any }> = ({ navigation }) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

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
      <View style={styles.container}>
        <Header title={translate('bank_screens.ChangeEmail')} />
        <View style={{ margin: 16 }}>
          <InputLabel title={translate('bank_screens.signup_Email_Address')} />
          <Input
            id="currentEmail"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['currentEmail']}
            placeholder="alexander@gmail.com"
            placeholderTextColor={COLORS.black}
          />
          <InputLabel title={translate('bank_screens.NewEmailAddress')} />
          <Input
            id="newEmail"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['newEmail']}
            placeholder="alexander23@gmail.com"
            placeholderTextColor={COLORS.black}
          />
          <InputLabel title={translate('bank_screens.Password')} />
          <Input
            id="password"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['password']}
            placeholder="**********"
            placeholderTextColor={COLORS.black}
            secureTextEntry={true}
          />
        </View>
        <Button
          title={translate('bank_screens.SaveEmail')}
          onPress={() => router.push('/Profile')}
          filled
          style={{
            position: 'absolute',
            bottom: 32,
            width: SIZES.width - 32,
            marginHorizontal: 16,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default ChangeEmail;
