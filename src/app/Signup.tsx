/* eslint-disable unicorn/filename-case */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod';
import { useNetInfo } from '@react-native-community/netinfo'; // import the hook
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

import Button from '@/components/BANK/Button';
import CheckboxItem from '@/components/BANK/CheckboxItem';
import Input from '@/components/BANK/Input';
import InputLabel from '@/components/BANK/InputLabel';
import PageContainer from '@/components/BANK/PageContainer';
import { AvatarImage } from '@/components/CN/Avatar';
import { RadioGroup, RadioGroupItem, RadioGroupLabel } from '@/components/CN/RadioGroup';
import { COLORS, SIZES } from '@/constants/BANK';
import { translate } from '@/core';
import { useAuth } from '@/core';
import type { SignUp } from '@/repository/services/types';
import { useAddSignUp } from '@/repository/services/use-add-signup';
import { encrypt } from '@/services/crypto';
import { ActivityIndicator, FocusAwareStatusBar } from '@/ui';
import { showErrorMessage } from '@/ui';
import { validateInput } from '@/utils/BANK/actions/formActions';
import { reducer } from '@/utils/BANK/reducers/formReducers';


const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
  phone: z
    .string({
      required_error: 'Phone is required',
    })
    .min(6, 'Phone must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

interface InputValues {
  fullName: string;
  email: string;
  password: string;
}

interface InputValidities {
  fullName: boolean | undefined;
  email: boolean | undefined;
  password: boolean | undefined;
}

interface FormState {
  inputValues: InputValues;
  inputValidities: InputValidities;
  formIsValid: boolean;
}

const initialState: FormState = {
  inputValues: {
    fullName: '',
    email: '',
    password: '',
  },
  inputValidities: {
    fullName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const Signup: React.FC<{ navigation: any }> = ({ navigation }) => {
  const router = useRouter();
  const registerIn = useAuth.use.registerIn();
  const netInfo = useNetInfo(); // declare the constant

  const signIn = useAuth.use.signIn();
  const { mutate: addSignUp, isPending } = useAddSignUp();


  enum USERTYPE {
    USER = 'USER',
    AGENT = 'AGENT',
    MERCHANT = 'MERCHANT',
    ADMIN = 'ADMIN',
  }

  const [error, setError] = useState<string | undefined>();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [userName, setUserName] = React.useState('Su Nombre');
  const [userEmail, setUserEmail] = React.useState('example@example.com');
  const [userPhone, setUserPhone] = React.useState('Telefono');
  const [userPassword, setUserPassword] = React.useState('******');
  const [userPassword_Confirmation, setUserPassword_Confirmation] = React.useState('');
  const [userCountry, setUserCountry] = React.useState('Germany');
  const [userAddress, setUserAddress] = React.useState('Bolivia');
  const [userDial_Code, setUserDial_Code] = React.useState('+55');

  const [userType, setUserType] = React.useState('user');
  const [userTerms, setUserTerms] = React.useState(false);

  const handleTermsToggle = () => {
    setUserTerms(!acceptTerms);
    setAcceptTerms(!acceptTerms);
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      if (inputId === 'fullName') {
        setUserName(inputValue);
      } else if (inputId === 'email') {
        setUserEmail(inputValue);
      } else if (inputId === 'phone') {
        setUserPhone(inputValue);
      } else if (inputId === 'password') {
        setUserPassword(inputValue);
        setUserPassword_Confirmation(inputValue);
      }

      const result = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState],
  );

  async function serverSignUp() {
    if (!netInfo.isConnected) {
      onMessage(translate('ERROR.internet'), ' !!!! ', 'danger');
    } else if (!userTerms) {
      showErrorMessage('Acepta los Terminos y Condiciones de Uso');
    } else {
      const data = {
        email: userEmail,
        password: userPassword,
        name: userName,
        dial_code: userDial_Code,
        phone: userPhone,
        password_confirmation: userPassword,
        country: userCountry,
        address: userAddress,
      }
      const returno = addSignUp(
        {
          data,
          token: '',
          method: 'POST',
          endpoint: 'signUp',
          userType: userType,
        },
        {
          onSuccess: (data) => {
             showMessage({
              message: 'Sucesos',
              type: 'success',
            });
            // here you can navigate to the post list and refresh the list data
            //queryClient.invalidateQueries(usePosts.getKey());
            //console.log('SALIO BIEN',data.response?.token);
            const tokenZero =   String(encrypt(userPassword)); // enc token

            signIn({ access: data.response?.token, refresh: data.response?.token });
            registerIn({ name: userName, email: userEmail, phone: userPhone, password: tokenZero, type: userType, terms: String(userTerms) });
            router.push('/AccountCreated');
          },
          onError: () => {
            showErrorMessage('Saliu Malo');
          },
        }
      );
      //signIn({ access: returno?.token, refresh: data?.token });
      //console.log("REGISTER", name,mail,phone,password,pin,type, terms);
    }


  }


  function onMessage(messages: string, descriptions: string = '', types: any = 'success') {
    showMessage({
      message: messages,
      description: descriptions,
      type: types, // danger // success
      //backgroundColor: 'purple', // background color
      // color: '#606060', // text color
      duration: 4000,
      icon: 'success', // danger
      onPress: () => {
        onMessageClick();
        /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
      },
    });
  }

  function onMessageClick() {
    console.log('CLICK');
  }

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error);
    }
  }, [error]);


  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.area}>
      <PageContainer>
        <ScrollView>
          <Text style={styles.formTitle}>{translate('bank_screens.signup_Welcome')}</Text>
          <View>
            <InputLabel title={translate('bank_screens.signup_Full_Name')} />
            <Input
              id="fullName"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['fullName']}
              placeholder={'    ----'}
              placeholderTextColor={COLORS.gray}
            />
            <InputLabel title={translate('bank_screens.signup_Email_Address')} />
            <Input
              id="email"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['email']}
              placeholder={"   mail.com"}
              placeholderTextColor={COLORS.gray}
            />
            <InputLabel title={translate('bank_screens.signup_Phone')} />
            <Input
              id="phone"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['phone']}
              placeholder={"    --- ------"}
              placeholderTextColor={COLORS.gray}
            />
            <InputLabel title={translate('bank_screens.signup_Password')} />
            <Input
              id="password"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['password']}
              placeholder={'******'}
              placeholderTextColor={COLORS.gray}
              secureTextEntry={true}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}>
              <CheckboxItem label="" selected={acceptTerms} onSelect={handleTermsToggle} />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.body6}>{translate('bank_screens.signup_I_accept')} </Text>
                <Text style={styles.h6}>{translate('bank_screens.signup_Terms_Conditions')}</Text>
              </View>
            </View>
            {/* 
            <View
              style={{
                alignItems: 'center',
                width: '100%',
              }}>
              <Text style={styles.h6}>{translate('bank_screens.signup_Privacy_Policy')} </Text>
            </View>
            */}
          </View>
          <View className='m-2 rounded-lg bg-gray-400'>
            <RadioGroup  defaultValue="user">
              <RadioGroupItem value="user" label="Personal" />
              <RadioGroupItem value="merchant" label="Empresarial" />
              <RadioGroupItem value="agent" label="Agente" />

              <View className="flex flex-row items-center gap-2">
                <RadioGroupItem value="admin" />
                <RadioGroupLabel value="admin">
                  <AvatarImage
                    className="size-8 rounded-full"
                    source={{
                      uri: 'https://avatars.githubusercontent.com/u/75042455?s=200&v=4',
                    }}
                  />
                </RadioGroupLabel>
              </View>
            </RadioGroup>
          </View>
          <View style={{ width: '100%', marginVertical: 12 }}>
            <Button
              title={translate('bank_screens.CreateAccount')}
              filled
              onPress={() => {
                serverSignUp();
              }}
              style={styles.filledBtn}
            />
            {/* 
            <Button
              title={translate('bank_screens.LoginNow')}
              onPress={() => router.push('/Login')}
              textColor={COLORS.primary}
              style={styles.outlinedBtn}
            />
            */}
            <View style={styles.footerContainer}>
              <Text style={styles.body6}>{translate('bank_screens.signup_Already_have')}</Text>
              <TouchableOpacity onPress={() => router.push('/Login')}>
                <Text style={styles.h6}>{translate('bank_screens.signup_SignIn')}</Text>
              </TouchableOpacity>
            </View>
          </View>



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
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  h6: {
    fontSize: 9,
    fontFamily: 'medium',
    color: COLORS.primary,
    textDecorationColor: COLORS.primary,
    textDecorationLine: 'underline',
  },
  body6: {
    fontSize: 9,
    fontFamily: 'Poppins Regular',
    color: COLORS.black,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
});

export default Signup;
