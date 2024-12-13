import React from 'react';
import {TextInput, TextInputProps, StyleSheet, Text} from 'react-native';
import {useCurrentThemeData} from '../../../lib/redux/hooks';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {fontSizes} from '../../../constants';

interface InputProps extends TextInputProps {
  label?: string; // Optional label for the input
}

export const CustomInput: React.FC<InputProps> = ({label, style, ...props}) => {
  const {colors} = useCurrentThemeData(); // Accessing theme colors and padding
  const inputFocus = useSharedValue(1);

  const handleFocus = () => {
    inputFocus.value = withSpring(1.05);
  };

  const handleBlur = () => {
    inputFocus.value = withSpring(1);
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{scaleY: withSpring(inputFocus.value)}],
  }));
  return (
    <Animated.View style={[styles.container, animatedCardStyle]}>
      {label && (
        <Text
          style={{
            color: colors.text,
            marginBottom: 4,
            fontSize: fontSizes.medium,
          }}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {backgroundColor: colors.background, color: colors.text},
          style,
        ]}
        placeholderTextColor={colors.placeHolderText} // Placeholder color based on theme
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props} // Spread other props like value, onChangeText, etc.
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray', // Default border color
  },
});
