import React from 'react';
import {Pressable, StyleSheet, ViewStyle, Text} from 'react-native';
import {useCurrentThemeData} from '../../../lib/redux/hooks';
import {fontSizes} from '../../../constants';

interface FloatingButtonProps {
  onPress: () => void;
  size?: number;
  color?: string;
  iconColor?: string;
  style?: ViewStyle;
  icon?: React.ReactNode; // Allow custom icons
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  size = 60,
  color,
  iconColor,
  style,
  icon,
}) => {
  const {colors} = useCurrentThemeData();
  const buttonColor = color || colors.primary; // Default to theme's primary color
  const iconFillColor = iconColor || colors.bgButtonText; // Default icon color is white

  return (
    <Pressable
      style={[
        styles.floatingButton,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: buttonColor,
        },
        style,
      ]}
      onPress={onPress}>
      {icon ? (
        icon
      ) : (
        <Text
          style={{
            color: iconFillColor,
            fontSize: fontSizes.xLarge,
            fontWeight: 'bold',
          }}>
          +
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20, // Default position: bottom right
    right: 20,
    elevation: 5, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
