/* eslint-disable unicorn/filename-case */
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, icons } from '@/constants/BANK';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Image source={icons.back} resizeMode="contain" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity>
        <Image source={icons.more} resizeMode="contain" style={styles.moreIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: 'black',
  },
  title: {
    fontSize: 16,
    fontFamily: 'medium',
    color: 'black',
  },
  moreIcon: {
    height: 24,
    width: 24,
    tintColor: 'black',
  },
});

export default Header;
