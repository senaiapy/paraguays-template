/* eslint-disable unicorn/filename-case */
import React from 'react';
import { Image,StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, SIZES } from '@/constants/BANK';

interface NotificationCardProps {
  icon: any;
  title: string;
  name: string;
  amount?: number;
  date: string;
  onPress: () => void;
}
const NotificationCard: React.FC<NotificationCardProps> = ({ icon, title, name, amount, date, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={icon} resizeMode="contain" style={styles.icon} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Text style={styles.name}>{name} </Text>
          <Text style={styles.amount}>${amount}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 102,
    width: SIZES.width - 32,
    backgroundColor: '#F6F9F9',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  iconContainer: {
    height: 48,
    width: 48,
    backgroundColor: '#ECE7FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    marginRight: 16,
  },
  icon: {
    height: 32,
    width: 32,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Poppins Regular',
    color: COLORS.primary,
    marginBottom: 6,
  },
  name: {
    fontSize: 12,
    fontFamily: 'medium',
    color: COLORS.primary,
  },
  amount: {
    fontSize: 12,
    fontFamily: 'medium',
    color: COLORS.primary,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Poppins Regular',
    color: '#999999',
  },
});
export default NotificationCard;
