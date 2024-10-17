/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/BANK/Button';
import DotsView from '@/components/BANK/DotsView';
import PageContainer from '@/components/BANK/PageContainer';
import { illustrations } from '@/constants/BANK';
// eslint-disable-next-line unused-imports/no-unused-imports
import { COLORS } from '@/constants/BANK';
import { translate } from '@/core';
import { useIsFirstTime } from '@/core/hooks';
import Onboarding1Styles from '@/styles/BANK/OnboardingStyles';

const Onboarding1: React.FC<{ navigation: any }> = ({ navigation }) => {
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [_, setIsFirstTime] = useIsFirstTime();
/*
  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 1) {
          clearInterval(intervalId);
          return prevProgress;
        }
        return prevProgress + 0.25;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
*/
  useEffect(() => {
    if (progress >= 1) {
      // navigate to the Onboarding2 Screen
      setIsFirstTime(false);

      //setProgress(1);
      // TODO:
      router.push('/Onboarding2');
    }
  }, [progress, navigation, setIsFirstTime, router]);

  return (
    <SafeAreaView style={Onboarding1Styles.container}>
      <StatusBar hidden />
      <PageContainer>
        <View style={Onboarding1Styles.contentContainer}>
          <Image source={illustrations.sendMoney} resizeMode="contain" style={Onboarding1Styles.illustration} />

          <View style={Onboarding1Styles.titleContainer}>
            <Text style={Onboarding1Styles.title}>{translate('bank_screens.onboarding_Send_Money')}</Text>
          </View>

          <Text style={Onboarding1Styles.description}>{translate('bank_screens.onboarding_Send_money_easily')}</Text>

          <View style={Onboarding1Styles.dotsContainer}>{progress < 1 && <DotsView progress={progress} numDots={4} />}</View>

          <View style={Onboarding1Styles.buttonContainer}>
            <Button
              title={translate('bank_screens.Next')}
              filled
              onPress={() => {
                setIsFirstTime(false);
                router.push('/Onboarding2');
              }}
              style={Onboarding1Styles.nextButton}
            />
            {/* 
            <Button
              title={translate('bank_screens.Skip')}
              onPress={() => router.push('/Login')}
              textColor={COLORS.primary}
              style={Onboarding1Styles.skipButton}
            />
            */}
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Onboarding1;
