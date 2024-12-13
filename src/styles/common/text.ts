import {StyleSheet} from 'react-native';
import {colors as DefaultColor, fontSizes} from '../../constants';
type propsType = {
  colors?: (typeof DefaultColor)[keyof typeof DefaultColor];
};
const CommonTextStyles = ({colors}: propsType) => {
  return StyleSheet.create({
    smallText: {
      color: colors?.text ?? DefaultColor.light.text,
      fontSize: fontSizes.small,
    },
    text: {
      color: colors?.text ?? DefaultColor.light.text,
      fontSize: fontSizes.medium,
    },
    cardHeaderBold: {
      color: colors?.text ?? DefaultColor.light.text,
      fontSize: fontSizes.medium,
      fontWeight: 'bold',
    },
    screenHeader: {
      color: colors?.text ?? DefaultColor.light.text,
      fontSize: fontSizes.xLarge,
      fontWeight: 'bold',
    },
    bgButtonText: {
      color: colors?.bgButtonText ?? DefaultColor.light.bgButtonText,
      fontWeight: 'bold',
      fontSize: fontSizes.large,
    },
    textButton: {
      color: colors?.textButtonColor ?? DefaultColor.light.textButtonColor,
      fontSize: fontSizes.medium,
      fontWeight: 'bold',
    },
  });
};

export default CommonTextStyles;
