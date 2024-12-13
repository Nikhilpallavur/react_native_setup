import {StyleProp, TextStyle} from 'react-native';

export type CommonHeaderPropsType = {
  title?: string;
  onBackPress?: () => void;
  onProfilePress?: () => void;
  transparentColor?: boolean;
  headerContainerStyle?: object;
  showBackButton?: boolean;
  titleStyle?: StyleProp<TextStyle> | undefined;
  iconsColor?: string;
  isAbsolute?: boolean;
  hideRightIcons?: boolean;
};
