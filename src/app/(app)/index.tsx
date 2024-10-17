/* eslint-disable unicorn/filename-case */

/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import { ScrollView } from 'react-native-virtualized-view';

import Card from '@/components/BANK/Card';
import SavingCard from '@/components/BANK/SavingCard';
import SubHeaderItem from '@/components/BANK/SubHeaderItem';
import { COLORS, images } from '@/constants/BANK';
import { translate } from '@/core';
import { useAuth } from '@/core';
import { userCards } from '@/data/BANK/BANK';
import type { IResponseModule,Modul, Module } from '@/repository/services/types';
import type { Dashboard } from '@/repository/services/types';
import { useDashboard } from '@/repository/services/use-dashboard';
//import { useApi } from '@/repository/services/use-api';
import { useModule } from '@/repository/services/use-module';
import {initializeDb,  prismaClient } from '@/services/db';
import { ActivityIndicator, FocusAwareStatusBar } from '@/ui';

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  
  const router = useRouter();
  const token = useAuth.use.token();
  const types = useAuth.use.type();

  const { data, isPending, isError } = useModule();
  const { data: dataDashboard, isPending: isPendingDashboard, isError: isErrorDashboard } = useDashboard({
    //@ts-ignore
    variables: { 
      token: token?.access || '',
      endpoint: 'dashboard',
      userType: types
     },
  });

  //const { data, isPending, isError } = useApi();
  const [dbInitialized, setDbInitialized] = React.useState(false);

  const [userName, setUserName] = React.useState('Cliente');
  const [userBalance, setUserBalance] = React.useState('0.00');
  const [module, setModule] = React.useState<IResponseModule[]>();
  const [dashboard, setDashboard] = React.useState<Dashboard>();

  useEffect(() => {
    const setup = async () => {
      await initializeDb();
      setDbInitialized(true);
      //onDBaccess();
    };     
    setup();
  }, [])


  useEffect(() => {
    if (data) {
      // @ts-ignore
      setModule(data?.response);
      // @ts-ignore
      console.log(data?.response);
    }

    if (dataDashboard) {
      const dadus: Dashboard = {
        success: dataDashboard.success,
        message: dataDashboard.message,
        response: dataDashboard.response,
      };
      setDashboard(dadus);
      console.log(dadus);
    }
  }, [data, dataDashboard])

  //************************  DATABASE**************** */
  async function onDBaccess(data: any = {}, id: any = 0) {
   
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
  }
   
     //************************  DATABASE**************** */
          
  // Render User Debit Card
  


  if (!dbInitialized) {
    return (
      <View className="flex-1 justify-center  p-3">
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }

  if (isPending || isPendingDashboard) {
    return (
      <View className="flex-1 justify-center  p-3">
        <FocusAwareStatusBar />
        <Text className="text-center"> Loading DB</Text>
        <ActivityIndicator />
      </View>
    );
  }
  if (isError || isErrorDashboard) {
    return (
      <View className="flex-1 justify-center p-3">
        <FocusAwareStatusBar />
        <Text className="text-center"> Loading Server</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greeting}>{translate('bank_screens.home_Welcome_back')}</Text>
            <Text style={styles.username}>{userName}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/Notifications')}>
            <View style={styles.notiView} />
            <Octicons name="bell" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ top: -40 }}>
        
          <SubHeaderItem
            title={translate('bank_screens.home_Your_Savings')}
            subtitle={translate('bank_screens.home_View_All')}
            onPress={() => router.push('/YourSavings')}
          />
          <SavingCard
            title=""
            subtitle="Movimento General"
            icon={images.gameIcon}
            percentage={60}
            onPress={() => console.log('View Detail')}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
    margin: 0,
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    height: 126,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 12,
    fontFamily: 'Poppins Regular',
    color: 'rgba(255, 255, 255,.72)',
  },
  username: {
    fontSize: 18,
    fontFamily: 'medium',
    color: COLORS.white,
    marginTop: 8,
  },
  notiView: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 2,
    zIndex: 999,
  },
  balanceCard: {
    height: 220,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: 16,
    marginHorizontal: 16,
    top: -40,
  },
  balanceCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  balanceText: {
    fontSize: 16,
    fontFamily: 'Poppins Regular',
    color: 'black',
  },
  balanceInfo: {
    fontSize: 10,
    fontFamily: 'Poppins Regular',
    color: 'black',
  },
  balanceValue: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: COLORS.primary,
  },
  featureColumn: {
    padding: 5,
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 16,
  },
  featureIconContainer: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    backgroundColor: '#ECE7FF',
    marginBottom: 12,
  },
  featureIcon: {
    height: 45,
    width: 45,
  },
  featureText: {
    fontSize: 12,
    fontFamily: 'Poppins Regular',
    color: COLORS.primary,
  },
});
export default Home;
