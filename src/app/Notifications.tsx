/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList,StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar,TabView } from 'react-native-tab-view';

import Header from '@/components/BANK/Header';
import NotificationCard from '@/components/BANK/NotificationCard';
import { COLORS } from '@/constants/BANK';
import { translate } from '@/core';
import { allNotifications, unreadNotifications } from '@/data/BANK/BANK';

const AllNotificationsRoute = () => (
  <View style={{ flex: 1, padding: 16, backgroundColor: COLORS.white }}>
    <FlatList
      data={allNotifications}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <NotificationCard
          icon={item.icon}
          title={item.title}
          name={item.name}
          amount={item.amount}
          date={item.date}
          onPress={() => console.log('Pressed')}
        />
      )}
    />
  </View>
);

const UnreadNotificationsRoute = () => (
  <View style={{ flex: 1, padding: 16, backgroundColor: COLORS.white }}>
    <FlatList
      data={unreadNotifications}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <NotificationCard
          icon={item.icon}
          title={item.title}
          name={item.name}
          amount={item.amount}
          date={item.date}
          onPress={() => console.log('Pressed')}
        />
      )}
    />
  </View>
);

const renderScene = SceneMap({
  first: AllNotificationsRoute,
  second: UnreadNotificationsRoute,
});

const NotificationsScreen = () => {
  const router = useRouter();

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: translate('bank_screens.notif_AllNotifications') },
    { key: 'second', title: translate('bank_screens.notif_Unread') },
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
        <Header title={translate('bank_screens.notif_Notifications')} />
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
export default NotificationsScreen;
