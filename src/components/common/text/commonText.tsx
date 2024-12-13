import React from 'react';
import {Text as RNText, StyleProp, TextStyle} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import {fontSizes} from '../../../constants/style/fontSizes';

interface TextProps {
  children: React.ReactNode;
  style: StyleProp<TextStyle> | undefined;
  size?: 'small' | 'medium' | 'large' | 'xLarge'; // Define size prop here
}

export const CustomText: React.FC<TextProps> = ({
  children,
  style,
  size = 'medium',
}) => {
  const styles = globalStyles({});
  return (
    <RNText style={[styles.text, {fontSize: fontSizes[size]}, style]}>
      {children}
    </RNText>
  );
};
