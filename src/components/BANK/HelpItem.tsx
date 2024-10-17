/* eslint-disable unicorn/filename-case */
import React, { useState } from 'react';
import { Image,StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { icons } from '@/constants/BANK';

interface HelpItemProps {
  title: string;
  description: string;
}
const HelpItem: React.FC<HelpItemProps> = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <Image source={isOpen ? icons.down : icons.next} resizeMode="contain" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {isOpen && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    paddingVertical: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontFamily: 'medium',
    color: '#333333',
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: '#333333',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins Regular',
    color: 'gray',
  },
});
export default HelpItem;
