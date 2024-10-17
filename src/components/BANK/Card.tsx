/* eslint-disable unicorn/filename-case */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, images } from '@/constants/BANK';
import { translate } from '@/core';

interface CardProps {
  number: string;
  balance: string | number;
  date: string;
  onPress: () => void;
  containerStyle?: object;
}
const Card: React.FC<CardProps> = ({ number, balance, date, onPress, containerStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Payment Card</Text>
        <Image source={images.cardLogo} resizeMode="contain" style={styles.icon} />
      </View>
      <Text style={styles.cardNumber}>{number}</Text>
      <View style={styles.footerContainer}>
        <Text style={styles.balance}>
          {translate('bank_screens.currency')}
          {balance}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Image source={images.elipseCard} resizeMode="contain" style={styles.elipseIcon} />
      <Image source={images.rectangleCard} resizeMode="contain" style={styles.rectangleIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 304,
    height: 200,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 12,
    marginRight: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 10,
    fontFamily: 'Poppins Regular',
    color: 'rgba(255,255,255,.8)',
  },
  icon: {
    width: 40,
    height: 24,
  },
  cardNumber: {
    fontSize: 14,
    fontFamily: 'medium',
    color: COLORS.white,
    marginVertical: 32,
  },
  footerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  balance: {
    fontFamily: 'Poppins SemiBold',
    fontSize: 16,
    color: COLORS.white,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Poppins Regular',
    color: 'rgba(255,255,255,.8)',
  },
  elipseIcon: {
    height: 142,
    width: 142,
    position: 'absolute',
    bottom: -22,
    right: 0,
  },
  rectangleIcon: {
    height: 132,
    width: 156,
    position: 'absolute',
    top: -44,
    left: -44,
    zIndex: -999,
  },
});

export default Card;
