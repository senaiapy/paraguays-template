/* eslint-disable unicorn/filename-case */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/BANK';

interface InputLabelProps {
  title: string;
}

const InputLabel: React.FC<InputLabelProps> = ({ title }) => {
  return (
    <View style={{ marginVertical: 6 }}>
      <Text style={styles.inputLabel}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 12,
    fontFamily: 'Poppins Regular',
    color: COLORS.secondaryBlack,
  },
});

export default InputLabel;
