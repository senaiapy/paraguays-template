/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList,StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar,TabView } from 'react-native-tab-view';

import Header from '@/components/BANK/Header';
import HistoryCard from '@/components/BANK/HistoryCard';
import { COLORS } from '@/constants/BANK';
import { translate } from '@/core';
import { allHistoryData, requestHistoryData, sendHistoryData } from '@/data/BANK/BANK';

const allHistoryRoute = () => {

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <FlatList
        data={allHistoryData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HistoryCard name={item.name} avatar={item.avatar} date={item.date} amount={item.amount} onPress={() => console.log('View Detail')} />
        )}
      />
    </View>
  );
};

const sendHistoryRoute = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <FlatList
        data={sendHistoryData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HistoryCard name={item.name} avatar={item.avatar} date={item.date} amount={item.amount} onPress={() => console.log('View Detail')} />
        )}
      />
    </View>
  );
};

const requestHistoryRoute = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondaryWhite }}>
      <FlatList
        data={requestHistoryData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HistoryCard name={item.name} avatar={item.avatar} date={item.date} amount={item.amount} onPress={() => console.log('View Detail')} />
        )}
      />
    </View>
  );
};
const renderScene = SceneMap({
  first: allHistoryRoute,
  second: sendHistoryRoute,
  third: requestHistoryRoute,
});

const HistoryScreen = () => {
  const router = useRouter();

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: translate('bank_screens.All') },
    { key: 'second', title: translate('bank_screens.Sended') },
    { key: 'third', title: translate('bank_screens.Requested') },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: '#fff',
      }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={[
            {
              color: focused ? COLORS.primary : 'gray',
              fontSize: 14,
              fontFamily: focused ? 'medium' : 'regular',
            },
          ]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="History" />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
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
  },
});

export default HistoryScreen;
