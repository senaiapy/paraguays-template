/* eslint-disable unicorn/filename-case */
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS, SIZES } from '@/constants/BANK';

const Button = (props: any) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedBgColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedBgColor;
  const textColor = props.filled ? COLORS.white || props.textColor : props.textColor || COLORS.primary;
  const isLoading = props.isLoading || false;

  return (
    <TouchableOpacity
      style={{
        ...styles.btn,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={props.onPress}>
      {isLoading && isLoading === true ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Text style={{ fontSize: 16, fontFamily: 'Poppins SemiBold', ...{ color: textColor } }}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
  },
});

export default Button;
