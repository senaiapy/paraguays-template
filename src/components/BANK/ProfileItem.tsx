/* eslint-disable unicorn/filename-case */
import React from 'react';
import { Image,StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, icons,SIZES } from '@/constants/BANK';

interface ProfileItemProps {
  title: string;
  icon: any;
  onPress: () => void;
}
const ProfileItem: React.FC<ProfileItemProps> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.iconContainer}>
          <Image source={icon} resizeMode="contain" style={styles.icon} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Image source={icons.next} resizeMode="contain" style={styles.nextIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width - 32,
    height: 72,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#F1EDFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    height: 16,
    width: 16,
    tintColor: COLORS.primary,
  },
  title: {
    fontFamily: 'medium',
    fontSize: 14,
    color: 'gray',
  },
  nextIcon: {
    height: 12,
    width: 12,
    tintColor: 'gray',
  },
});
export default ProfileItem;
