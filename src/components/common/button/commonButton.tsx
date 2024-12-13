import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle> | undefined;
  textStyle?: StyleProp<TextStyle> | undefined;
}

export const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  const styles = globalStyles({});
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
