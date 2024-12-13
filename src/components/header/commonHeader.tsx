import React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {defaultDimensions} from '../../constants';
import {ArrowLeftIcon, BellIcon} from '../../assets/icons';
import {globalStyles} from '../../styles';
import {useStatusBarHeight} from '../../hooks';
import {useCurrentThemeData, useUserDetails} from '../../lib/redux/hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CommonHeaderPropsType, RootStackParamList} from '../../types';
import {CommonImage} from '../common/image';
import Animated from 'react-native-reanimated';

const commonStyles = globalStyles({});

type NavigationPropType = NavigationProp<RootStackParamList>;
export const CommonHeader: React.FC<CommonHeaderPropsType> = ({
  title,
  onBackPress,
  onProfilePress,
  transparentColor = false,
  headerContainerStyle = {},
  showBackButton = false,
  titleStyle = {},
  iconsColor,
  isAbsolute = false,
  hideRightIcons = false,
}) => {
  const {profileImage} = useUserDetails();
  const navigation = useNavigation<NavigationPropType>();
  const {colors} = useCurrentThemeData();
  const statusBarHeight = useStatusBarHeight();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      navigation.navigate('settings');
    }
  };
  return title && title !== '' ? (
    <Animated.View
      style={[
        styles.header,
        {
          backgroundColor: transparentColor
            ? 'transparent'
            : colors.headerBgColor,
        },
        isAbsolute ? styles.absolutePosition : {},
        {top: isAbsolute ? statusBarHeight : 0},
        transparentColor ? {} : commonStyles.statusBarShadow,
        headerContainerStyle,
      ]}>
      <Animated.Text
        style={[
          styles.title,
          commonStyles.header,
          {color: colors.text},
          titleStyle,
        ]}>
        {title}
      </Animated.Text>

      {/* Should not keep the code above the title , it will make overlap z-index issue */}
      {showBackButton ? (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <ArrowLeftIcon
            style={styles.backIcon}
            stroke={iconsColor || colors.iconColor}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleProfilePress}
          style={styles.backButton}>
          {profileImage ? (
            <CommonImage
              // source={{uri: profileImageUrl}}
              source={profileImage}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.defaultProfileIcon} />
          )}
        </TouchableOpacity>
      )}
      {!hideRightIcons && (
        <TouchableOpacity style={styles.notificationButton}>
          <BellIcon
            style={styles.notificationIcon}
            fill={iconsColor || colors.iconColor}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  ) : showBackButton ? (
    <TouchableOpacity
      onPress={handleBackPress}
      style={styles.backButtonAbsolute}>
      <ArrowLeftIcon
        style={styles.backIcon}
        stroke={iconsColor || colors.iconColor}
      />
    </TouchableOpacity>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: defaultDimensions.paddingSmall,
    paddingHorizontal: defaultDimensions.appHorizontalPadding,
    height: defaultDimensions.headerHeight,
  },
  absolutePosition: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    left: 0,
    paddingLeft: defaultDimensions.appHorizontalPadding,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  notificationButton: {
    padding: 10,
    paddingRight: defaultDimensions.appHorizontalPadding,
    position: 'absolute',
    right: 0,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  defaultProfileIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  backButtonAbsolute: {
    position: 'absolute',
    left: 0,
    paddingLeft: defaultDimensions.appHorizontalPadding,
    top: Platform.OS === 'ios' ? defaultDimensions.headerHeight : 0,
    paddingTop: defaultDimensions.headerHeight * 0.3,
    zIndex: 1000,
  },
});
