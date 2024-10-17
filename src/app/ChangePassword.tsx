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
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface InputValidities {
  currentPassword: boolean | undefined;
  newPassword: boolean | undefined;
  confirmNewPassword: boolean | undefined;
}

interface FormState {
  inputValues: InputValues;
  inputValidities: InputValidities;
  formIsValid: boolean;
}

const initialState: FormState = {
  inputValues: {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  },
  inputValidities: {
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  },
  formIsValid: false,
};

const ChangePassword: React.FC<{ navigation: any }> = ({ navigation }) => {
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
        <Header title={translate('bank_screens.Password')} />
        <View style={{ margin: 16 }}>
          <InputLabel title={translate('bank_screens.Enteryouroldpassword')} />
          <Input
            id="currentPassword"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['currentPassword']}
            placeholder="**********"
            placeholderTextColor={COLORS.black}
          />
          <InputLabel title={translate('bank_screens.Enteryournewpassword')} />
          <Input
            id="newPassword"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['newPassword']}
            placeholder=""
            placeholderTextColor={COLORS.black}
          />
          <InputLabel title={translate('bank_screens.Re_passwornewpassword')} />
          <Input
            id="confirmNewPassword"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['confirmNewPassword']}
            placeholder=""
            placeholderTextColor={COLORS.black}
            secureTextEntry={true}
          />
        </View>
        <Button
          title={translate('bank_screens.SavePassword')}
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

export default ChangePassword;
