/* eslint-disable unicorn/filename-case */
/* eslint-disable unused-imports/no-unused-vars */
import React from 'react';
import { Image,StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, SIZES } from '@/constants/BANK';
import { translate } from '@/core';

interface RequestMoneyCardProps {
  name: string;
  avatar: any;
  date: string;
  amount: string | number;
  acceptPress?: () => void;
  declinePress?: () => void;
}

const RequestMoneyCard: React.FC<RequestMoneyCardProps> = ({ name, avatar, date, amount, acceptPress, declinePress }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={avatar} resizeMode="contain" style={styles.avatar} />
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>{translate('bank_components.Accept')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: COLORS.white,
                borderWidth: 1,
                marginHorizontal: 8,
              },
            ]}>
            <Text style={[styles.btnText, { color: COLORS.primary }]}>{translate('bank_components.Decline')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.amount}>
          {translate('bank_components.currency')}
          {amount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: SIZES.width - 32,
    backgroundColor: '#F6F9F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 999,
  },
  name: {
    fontSize: 14,
    fontFamily: 'medium',
    color: COLORS.primary,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Poppins Regular',
    color: COLORS.primary,
  },
  btn: {
    width: 80,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    marginTop: 12,
  },
  btnText: {
    fontSize: 12,
    fontFamily: 'medium',
    color: COLORS.white,
  },
  amount: {
    fontSize: 14,
    fontFamily: 'Poppins SemiBold',
    color: COLORS.primary,
  },
});
export default RequestMoneyCard;
