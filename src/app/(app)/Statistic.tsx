/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React from 'react';
import { Image,StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '@/components/BANK/Card';
import { COLORS, icons,SIZES } from '@/constants/BANK';
import { translate } from '@/core';
import { userCards } from '@/data/BANK/BANK';

// Statistic data
const data = {
  labels: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const StatisticScreen = () => {
  const router = useRouter();

  // Render User Debit Card
  const renderAllDebitCard = () => {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <FlatList
          horizontal
          data={userCards}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Card number={item.number} balance={item.balance} date={item.date} onPress={() => console.log('Card Pressed')} />}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Text style={styles.title}>{translate('bank_screens.statistic_StatisticCard')}</Text>
        {renderAllDebitCard()}
        <View style={styles.timeSelectionContainer}>
          <View>
            <Text style={styles.balanceText}>{translate('bank_screens.statistic_TotalBalance')}</Text>
            <Text style={styles.amount}>$2885.00</Text>
          </View>
          <TouchableOpacity style={styles.timeSelection}>
            <Text style={styles.timeSelectionText}>{translate('bank_screens.statistic_Week')}</Text>
            <Image source={icons.down} resizeMode="contain" style={styles.downIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <LineChart
            data={data}
            width={SIZES.width - 32} // Use window width for responsive sizing
            height={220}
            chartConfig={{
              backgroundColor: COLORS.primary,
              backgroundGradientFrom: COLORS.primary,
              backgroundGradientTo: COLORS.primary,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
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
  title: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.primary,
    marginVertical: 16,
    textAlign: 'center',
  },
  balanceText: {
    fontSize: 14,
    fontFamily: 'Poppins Regular',
    color: 'gray',
  },
  amount: {
    fontSize: 20,
    fontFamily: 'medium',
    color: 'black',
    marginTop: 6,
  },
  timeSelection: {
    width: 78,
    height: 38,
    flexDirection: 'row',
    borderWidth: 0.3,
    borderColor: 'gray',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSelectionText: {
    fontSize: 12,
    fontFamily: 'medium',
    color: 'gray',
  },
  downIcon: {
    height: 8,
    width: 8,
    tintColor: 'gray',
    marginLeft: 4,
  },
  timeSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
});
export default StatisticScreen;
