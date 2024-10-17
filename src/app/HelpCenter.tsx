/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList,StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-virtualized-view';

import Header from '@/components/BANK/Header';
import HelpItem from '@/components/BANK/HelpItem';
import { COLORS } from '@/constants/BANK';
import { helpData } from '@/data/BANK/BANK';

const HelperCenterScreen = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(helpData);

  const handleSearch = () => {
    const filteredItems = helpData.filter(
      item => item.title.toLowerCase().includes(searchValue.toLowerCase()) || item.description.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredData(filteredItems);
  };
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Help Center" />
        <ScrollView>
          <View style={{ margin: 16 }}>
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
                <AntDesign name="search1" size={24} color="gray" />
              </TouchableOpacity>
              <TextInput
                placeholder="Search anything here"
                style={styles.input}
                placeholderTextColor="gray"
                onChangeText={value => setSearchValue(value)}
                value={searchValue}
                onSubmitEditing={handleSearch}
              />
            </View>
            <FlatList
              data={filteredData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <HelpItem title={item.title} description={item.description} />}
            />
          </View>
        </ScrollView>
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
  inputContainer: {
    height: 48,
    borderRadius: 6,
    borderWidth: 0.4,
    borderColor: 'gray',
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingRight: 16,
    fontSize: 16,
    color: 'gray',
  },
});

export default HelperCenterScreen;
