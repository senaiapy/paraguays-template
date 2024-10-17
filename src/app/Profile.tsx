/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { ScrollView } from 'react-native-virtualized-view';

import Button from '@/components/BANK/Button';
import ProfileItem from '@/components/BANK/ProfileItem';
import { COLORS, icons, images, SIZES } from '@/constants/BANK';
import { translate } from '@/core';
import { useAuth } from '@/core';

const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const router = useRouter();

  const signOut = useAuth.use.signOut();

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<any>(null);

  const [userName, setUserName] = React.useState('Cliente');
  const [userCardId, setUserCardId] = React.useState('0896 2102 7821');

  const pickImage = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImage(imageUri);
      }
    });
  };
  const renderModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Image source={images.error} resizeMode="contain" style={styles.modalSuccess} />
              <Text style={styles.modalTitle}>{translate('bank_screens.profile_Logout')}</Text>
              <Text style={styles.modalSubtitle}>{translate('bank_screens.profile_clickLogout')}</Text>
              <Button
                title={translate('bank_screens.profile_LogoutNow')}
                filled
                onPress={() => {
                  signOut();
                  setModalVisible(false);
                  router.push('/Login');
                }}
                style={styles.modalBtn}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{translate('bank_screens.profile_YourProfile')}</Text>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.profileLeftContainer}>
              <View>
                <Image source={image === null ? images.avatar6 : { uri: image }} resizeMode="cover" style={styles.avatar} />
                <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
                  <SimpleLineIcons name="pencil" size={8} color={COLORS.white} />
                </TouchableOpacity>
              </View>
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.name}>{userName}</Text>
                <Text style={styles.phoneNumber}>{userCardId}</Text>
              </View>
            </View>
            <View style={styles.profileRightContainer}>
              <Text style={{ fontSize: 12 }}>Basic</Text>
            </View>
          </View>
          <View style={styles.qrContainer}>
            <TouchableOpacity onPress={() => router.push('/Pay')} style={styles.qrInfoContainer}>
              <View style={styles.qrIconContainer}>
                <Image source={icons.scanner} resizeMode="contain" style={styles.qrIcon} />
              </View>
              <Text style={styles.qrText}>{translate('bank_screens.profile_ScanQR')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/Pay')} style={styles.qrInfoContainer}>
              <View style={styles.qrIconContainer}>
                <Image source={icons.qrCode} resizeMode="contain" style={styles.qrIcon} />
              </View>
              <Text style={styles.qrText}>{translate('bank_screens.profile_MyQR')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.settingsContainer}>
            <Text style={styles.subtitle}>Account</Text>
            <ProfileItem
              title={translate('bank_screens.profile_ChangeProfile')}
              icon={icons.user}
              onPress={() => router.push('/ChangePersonalProfile')}
            />
            <ProfileItem
              title={translate('bank_screens.profile_ChangeEmail')}
              icon={icons.email}
              onPress={() => router.push('/ChangeEmail')}
            />
            <ProfileItem
              title={translate('bank_screens.profile_ChangePassword')}
              icon={icons.lock}
              onPress={() => router.push('/ChangePassword')}
            />
            <Text style={styles.subtitle}>{translate('bank_screens.profile_MoreSettings')}</Text>
            <ProfileItem
              title={translate('bank_screens.profile_AccountSecurity')}
              icon={icons.padlock}
              onPress={() => router.push('/Account')}
            />
            <ProfileItem
              title={translate('bank_screens.profile_HelpPrivacy')}
              icon={icons.question}
              onPress={() => router.push('/HelpCenter')}
            />

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.btn}>
              <Text style={styles.logout}>{translate('bank_screens.profile_Log_out')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {renderModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryWhite,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    height: 72,
    paddingVertical: 16,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
  },
  profileContainer: {
    height: 80,
    width: SIZES.width - 32,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginVertical: 6,
    top: -22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileRightContainer: {
    height: 26,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 32,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  iconContainer: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  name: {
    fontSize: 14,
    fontFamily: 'medium',
    color: COLORS.primary,
    marginVertical: 4,
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: 'Poppins Regular',
    color: 'gray',
  },
  qrContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  qrInfoContainer: {
    width: (SIZES.width - 32) / 2 - 12,
    height: 72,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  qrIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#F1EDFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  qrIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.primary,
  },
  qrText: {
    fontSize: 14,
    fontFamily: 'medium',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.primary,
    marginVertical: 16,
  },
  settingsContainer: {
    marginHorizontal: 16,
  },
  logout: {
    fontFamily: 'Poppins SemiBold',
    color: 'red',
    textDecorationLine: 'underline',
    marginVertical: 22,
    textAlign: 'center',
  },
  btn: {
    marginTop: 2,
    marginBottom: 36,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins SemiBold',
    color: COLORS.primary,
    textAlign: 'center',
    marginVertical: 6,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins Regular',
    color: COLORS.primary,
    textAlign: 'center',
    marginVertical: 22,
  },
  modalSuccess: {
    height: 217,
    width: 217,
    marginVertical: 22,
  },
  modal: {
    height: 494,
    width: SIZES.width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalBtn: {
    width: '100%',
    marginTop: 12,
  },
});

export default Profile;
