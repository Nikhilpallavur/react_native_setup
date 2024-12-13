import React, {memo, useCallback, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  useAppDispatch,
  useCurrentTheme,
  useUserDetails,
} from '../../lib/redux/hooks';
import {globalStyles} from '../../styles';
import {CommonHeader, CustomStatusBar} from '../../components';
import {defaultDimensions, fontSizes} from '../../constants';
import {CommonImage} from '../../components/common/image';
import {CommonSettingItem} from '../../components/cards/settings/sectionCard';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import {setManualThem, setTheme} from '../../lib/redux/slices/themeSlice';
import {EditOutlineIcon} from '../../assets/icons';
import {signOut} from '../../service/supabase/authService';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types';

const MAX_BANNER_HEIGHT = 400;
const MIN_BANNER_HEIGHT = 200;
const CONTENT_POSITION = MAX_BANNER_HEIGHT - 100;
const PROFILE_IMAGE_HEIGHT = 80;

const SectionHeader = memo(({title}: {title: string}) => (
  <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
));

const INITIAL_HEADER = {
  iconColor: '#fff',
  transparentColor: true,
  textStyle: '#fff',
  statusBarHidden: true,
};
interface SettingPageProps {
  navigation: NavigationProp<RootStackParamList, 'settings'>;
}

const SettingsScreen = ({navigation}: SettingPageProps) => {
  const {currentThemeData, theme} = useCurrentTheme();
  const dispatch = useAppDispatch();
  const userDetails = useUserDetails();
  const {colors} = currentThemeData;
  const commonStyles = globalStyles({});
  const [pushNotifications, setPushNotifications] = React.useState(false);
  const [backupEnabled, setBackupEnabled] = React.useState(true);
  const translateY = useSharedValue(0);
  const [headerStyle, setHeaderStyle] = useState(INITIAL_HEADER);
  const lastHeaderData = useRef(INITIAL_HEADER);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.y;
    let newHeaderData = INITIAL_HEADER; // Default color when at top
    if (
      translateY.value >
      CONTENT_POSITION - (PROFILE_IMAGE_HEIGHT + defaultDimensions.headerHeight)
    ) {
      newHeaderData = {
        iconColor: colors.text,
        transparentColor: false,
        textStyle: colors.text,
        statusBarHidden: false,
      };
    }
    if (newHeaderData !== lastHeaderData.current) {
      lastHeaderData.current = newHeaderData; // Update the ref to the new color
      runOnJS(setHeaderStyle)(newHeaderData); // Update the state
    }
  });

  const animatedBannerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      translateY.value,
      [0, MAX_BANNER_HEIGHT],
      [MAX_BANNER_HEIGHT, MIN_BANNER_HEIGHT],
      'clamp',
    );
    return {
      height,
      opacity: interpolate(
        translateY.value,
        [0, MAX_BANNER_HEIGHT],
        [1, 0.5],
        'clamp',
      ),
    };
  });

  const handlePushNotificationToggle = useCallback(() => {
    setPushNotifications(!pushNotifications);
  }, [pushNotifications]);

  const handleBackupToggle = useCallback(() => {
    setBackupEnabled(!backupEnabled);
  }, [backupEnabled]);

  const handleDarkMode = () => {
    dispatch(setManualThem(true));
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  const signOutOnClick = () => {
    signOut();
    navigation.reset({
      index: 0,
      routes: [{name: 'login'}],
    });
  };

  return (
    <View style={commonStyles.container}>
      <CustomStatusBar
        position={headerStyle.statusBarHidden ? 'absolute' : 'relative'}
        hidden={headerStyle.statusBarHidden}
      />
      <CommonHeader
        iconsColor={headerStyle.iconColor}
        titleStyle={{color: headerStyle.textStyle}}
        showBackButton
        title="Settings"
        transparentColor={headerStyle.transparentColor}
        isAbsolute={true}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
        style={[styles.container, {backgroundColor: colors.background}]}>
        <Animated.View
          style={[styles.bannerImageContainer, animatedBannerStyle]}>
          <CommonImage
            source={userDetails?.profileImage}
            style={styles.bannerImage}
          />
          <View
            style={[
              styles.bannerOverlay,
              {backgroundColor: colors.imageOverlayColor},
            ]}
          />
        </Animated.View>
        <View
          style={[
            styles.contentContainer,
            {backgroundColor: colors.cardBackground},
          ]}>
          <View style={styles.profileSection}>
            <View>
              <CommonImage
                source={userDetails?.profileImage}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editIcon}>
                <EditOutlineIcon color="white" width={15} height={15} />
              </TouchableOpacity>
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={[styles.profileName, {color: colors.text}]}>
                {`${userDetails?.firstName} ${userDetails?.lastName}`}
              </Text>
              <Text style={[styles.profileLocation, {color: colors.text}]}>
                {`${userDetails?.address?.city}, ${userDetails?.address?.state}`}
              </Text>
            </View>
          </View>
          <View style={styles.settingsSection}>
            <SectionHeader title="Activity" />
            <CommonSettingItem
              title="Bookmarks"
              onPress={() => navigation.navigate('bookmark')}
              // rightIcon="chevron-right"
            />
            <SectionHeader title="Profile Settings" />
            <CommonSettingItem
              title="Dark Mode"
              hasSwitch
              switchValue={theme === 'dark'}
              onSwitchToggle={handleDarkMode}
            />
            <CommonSettingItem
              title="Send push notifications"
              hasSwitch
              switchValue={pushNotifications}
              onSwitchToggle={handlePushNotificationToggle}
            />
            <CommonSettingItem
              title="Backup"
              hasSwitch
              switchValue={backupEnabled}
              onSwitchToggle={handleBackupToggle}
            />
            <SectionHeader title="Account" />
            <CommonSettingItem
              title="Two-factor authentication"
              rightIcon="chevron-right"
            />
            <CommonSettingItem
              title="Mobile data use"
              rightIcon="chevron-right"
            />
            <CommonSettingItem title="Language" subtitle="English" />
            <SectionHeader title="Support" />
            <CommonSettingItem title="Call us" />
            <CommonSettingItem title="Feedback" />
            <TouchableOpacity activeOpacity={0.8} onPress={signOutOnClick}>
              <Text style={styles.logOut}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    borderTopLeftRadius: defaultDimensions.borderRadiusXLarge,
    borderTopRightRadius: defaultDimensions.borderRadiusXLarge,
    marginTop: CONTENT_POSITION,
  },
  bannerImageContainer: {
    height: MAX_BANNER_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject, // Fill the entire image
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: defaultDimensions.paddingLarge,
  },
  profileImage: {
    width: PROFILE_IMAGE_HEIGHT,
    height: PROFILE_IMAGE_HEIGHT,
    borderRadius: 40,
    marginTop: -(PROFILE_IMAGE_HEIGHT * 0.5),
  },
  profileTextContainer: {
    marginLeft: 20,
    marginTop: defaultDimensions.marginSmall,
    flex: 1,
  },
  profileName: {
    fontSize: fontSizes.headerMedium,
    fontWeight: 'bold',
  },
  profileLocation: {
    fontSize: fontSizes.small,
    marginTop: defaultDimensions.marginXSmall,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00000080',
    padding: 5,
    borderRadius: defaultDimensions.borderRadiusLarge,
  },
  settingsSection: {
    marginTop: defaultDimensions.marginLarge,
    paddingHorizontal: defaultDimensions.appHorizontalPadding,
  },
  sectionHeaderContainer: {
    borderBottomWidth: 0.3,
    borderColor: '#ddd',
  },
  sectionTitle: {
    fontSize: fontSizes.headerMedium,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 20,
    marginBottom: 8,
  },
  logOut: {
    color: 'red',
    fontSize: fontSizes.medium,
    marginVertical: defaultDimensions.marginMedium,
  },
});

export default SettingsScreen;
