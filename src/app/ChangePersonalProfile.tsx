/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getFormatedDate } from 'react-native-modern-datepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

import Button from '@/components/BANK/Button';
import DatePickerModal from '@/components/BANK/DatePickerModal';
import Header from '@/components/BANK/Header';
import Input from '@/components/BANK/Input';
import InputLabel from '@/components/BANK/InputLabel';
import { COLORS, SIZES } from '@/constants/BANK';
import { translate } from '@/core';
import { validateInput } from '@/utils/BANK/actions/formActions';
import { reducer } from '@/utils/BANK/reducers/formReducers';

interface InputValues {
  name: string;
  address: string;
  description: string;
}

interface InputValidities {
  name: boolean | undefined;
  address: boolean | undefined;
  description: boolean | undefined;
}

interface FormState {
  inputValues: InputValues;
  inputValidities: InputValidities;
  formIsValid: boolean;
}

const initialState: FormState = {
  inputValues: {
    name: '',
    address: '',
    description: '',
  },
  inputValidities: {
    name: false,
    address: false,
    description: false,
  },
  formIsValid: false,
};

const ChangePersonalProfile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(new Date(today.setDate(today.getDate() + 1)), 'YYYY/MM/DD');
  const [startedDate, setStartedDate] = useState('12/12/2023');

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

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
        <Header title={translate('bank_screens.ChangePersonalProfile')} />
        <View style={{ margin: 16 }}>
          <InputLabel title={translate('bank_screens.Name')} />
          <Input
            id="name"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['name']}
            placeholder=""
            placeholderTextColor={COLORS.black}
          />
          <InputLabel title={translate('bank_screens.Birthday')} />
          <TouchableOpacity style={styles.inputBtn} onPress={handleOnPressStartDate}>
            <Text>{startedDate}</Text>
            <Feather name="calendar" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <InputLabel title={translate('bank_screens.Address')} />
          <Input
            id="address"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['address']}
            placeholder=""
            placeholderTextColor={COLORS.black}
          />
          <InputLabel title={translate('bank_screens.Description')} />
          <Input
            id="description"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['description']}
            placeholder=""
            placeholderTextColor={COLORS.black}
            secureTextEntry={true}
          />
        </View>
        <Button
          title={translate('bank_screens.SaveProfile')}
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
      <DatePickerModal
        open={openStartDatePicker}
        startDate={startDate}
        selectedDate={startedDate}
        onClose={() => setOpenStartDatePicker(false)}
        onChangeStartDate={(date: any) => setStartedDate(date)}
      />
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
  inputBtn: {
    borderWidth: 0.6,
    borderRadius: 4,
    borderColor: 'gray',
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: 'space-between',
    marginTop: 14,
    backgroundColor: COLORS.white,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
});

export default ChangePersonalProfile;
