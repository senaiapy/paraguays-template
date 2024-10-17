/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useNetInfo } from '@react-native-community/netinfo'; // import the hook
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';

import Button from '@/components/BANK/Button';
import CheckboxItem from '@/components/BANK/CheckboxItem';
import Input from '@/components/BANK/Input';
import { COLORS, FONTS } from '@/constants/BANK';
import { translate } from '@/core';
import { useAuth } from '@/core';
import type { SignIn } from '@/repository/services/types';
import { useAddSignIn } from '@/repository/services/use-add-signin';
import { encrypt } from '@/services/crypto';
import { prismaClient } from '@/services/db';
import { commonStyles } from '@/styles/BANK/CommonStyles';
import { ActivityIndicator, FocusAwareStatusBar } from '@/ui';
import { showErrorMessage } from '@/ui';
import { validateInput } from '@/utils/BANK/actions/formActions';
import { reducer } from '@/utils/BANK/reducers/formReducers';

interface InputValues {
  email: string;
  password: string;
}

interface InputValidities {
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
    email: '',
    password: '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};
const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const netInfo = useNetInfo(); // declare the constant
  const signIn = useAuth.use.signIn();
  const registerIn = useAuth.use.registerIn();

  const name = useAuth.use.name();
  const mail = useAuth.use.email();
  const phone = useAuth.use.phone();
  const password = useAuth.use.password();
  const pin = useAuth.use.pin();
  const terms = useAuth.use.terms();

  const router = useRouter();
  const token = useAuth.use.token();
  let types = useAuth.use.type();

  const { mutate: addSignIn, isPending } = useAddSignIn();

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const [acceptTermsSave, setAcceptTermsSave] = useState(false);

  const [userName, setUserName] = React.useState('Su Nombre');
  const [userEmail, setUserEmail] = React.useState('example@example.com');
  const [userPassword, setUserPassword] = React.useState('******');
  const [signin, setSignin] = React.useState<SignIn>();

  const [userTerms, setUserTerms] = React.useState(false);

  const handleTermsToggle = () => {
    setAcceptTermsSave(!acceptTermsSave);
  };
  //onEffect(() => {
  //  if (signin) {
  //    signIn({ access: signin?.token, refresh: signin?.token });
  //  }
  //})
  function onButtonLoginPress() {
    if (!netInfo.isConnected) {
      onMessage(translate('ERROR.internet'), ' !!!! ', 'danger');
    } else {
      const data = {
        email: userEmail, password: userPassword,
      }
      const returno = addSignIn(
        {
          data,
          token: '',
          method: 'POST',
          endpoint: 'signIn',
          userType: types,
        },
        {
          onSuccess: async (data) => {
            showMessage({
              message: 'Sucesos',
              type: 'success',
            });
            // here you can navigate to the post list and refresh the list data
            //queryClient.invalidateQueries(usePosts.getKey());
            //console.log('SALIO BIEN',data.response?.token);
              //console.log('SALIO BIEN',data.response?.token);
              const tokenZero =   String(encrypt(String(userPassword))); // enc token
              if(types === '' || types === null || types === undefined){
                types = 'user';
              }
              // register token
               signIn({ access: data.response?.token, refresh: data.response?.token });
              // register user
               registerIn({ name: data.response?.user.name, email: data.response?.user.email, phone: data.response?.user.phone, password: tokenZero, type: types });
              //save db user
              await prismaClient.task.create({
                data: data.response?.user,
              });
              /*
              await prismaClient.task.create({
                data: data.response?.user,
              })
              const tasks = prismaClient.task.useFindMany({
                where:{
                  completed: filter
                }
              });
              await prismaClient.task.delete({
                where:{
                  id: data.id
                }
              });
              await prismaClient.task.update({
                where:{
                  id: data.id
                },
                data:{
                  completed: true
                }
              });
              */
            router.push('/');
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

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue);
      if (inputId === 'email') {
        setUserEmail(inputValue);
      };
      if (inputId === 'password') {
        setUserPassword(inputValue);
      };
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

  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <LinearGradient colors={[COLORS.primary, COLORS.primary]} style={{ flex: 1, backgroundColor: COLORS.blue }}>
      <StatusBar hidden />
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>{translate('bank_screens.login_LogIn')}</Text>
        <Text style={commonStyles.subHeaderTitle}>{translate('bank_screens.login_Please_sign')}</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={commonStyles.footer}>
        <Text style={commonStyles.formTitle}>{translate('bank_screens.login_WelcomeBack')}</Text>
        <Text style={commonStyles.inputHeader}>{translate('bank_screens.login_Email')}</Text>
        <Input
          id="email"
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities['email']}
          placeholder={'---@gmail.com'}
          placeholderTextColor={COLORS.gray}
        />
        <Text style={commonStyles.inputHeader}>{translate('bank_screens.login_Password')}</Text>
        <Input
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities['password']}
          id="password"
          placeholder={'******'}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={true}
        />
        <View style={{ marginBottom: 5 }}>

          {signin != null ? (
            <Text style={{ ...FONTS.body4, color: COLORS.primary }}>DASHBOARD:{JSON.stringify(signin)}</Text>
          ) : (
            <Text style={{ ...FONTS.body4, color: COLORS.primary }}>No data available</Text>
          )}
        </View>
        <View style={commonStyles.checkBoxContainer}>
          {/* CHECKBOX  */}
          {/*   
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              style={commonStyles.checkbox}
              value={isChecked}
              onTintColor={isChecked ? COLORS.primary : COLORS.black}
              onValueChange={() => setChecked(true)}
            />
            <Text style={{ ...FONTS.body4, color: COLORS.black }}>
              {translate('bank_screens.login_Remenber')} {'  '}
            </Text>
          </View>
          */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            <CheckboxItem label="" selected={acceptTermsSave} onSelect={handleTermsToggle} />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                {translate('bank_screens.login_Remenber')} {'  '}
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/ForgotPassword')}>
            <Text style={{ ...FONTS.body4, color: COLORS.primary }}>{translate('bank_screens.login_ForgotPassword')}</Text>
          </TouchableOpacity>
          </View>
         
        </View>

        <Button title={translate('bank_screens.login_LOGIN')} isLoading={isLoading} filled onPress={onButtonLoginPress} style={commonStyles.btn} />
        <View style={commonStyles.center}>
          <Text style={{ ...FONTS.body4, color: COLORS.black }}>{translate('bank_screens.login_Don_have_account')} </Text>
          <TouchableOpacity onPress={() => router.push('/CreatePassword')}>
            <Text style={{ ...FONTS.body4, color: COLORS.primary }}>{translate('bank_screens.login_SIGNUP')}</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default Login;
