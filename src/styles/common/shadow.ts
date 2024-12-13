import {StyleSheet} from 'react-native';
import {colors as DefaultColor} from '../../constants';
type propsType = {
  colors?: (typeof DefaultColor)[keyof typeof DefaultColor];
};
const CommonShadows = ({colors}: propsType) => {
  return StyleSheet.create({
    statusBarShadow: {
      shadowColor: colors?.shadow ?? DefaultColor.light.shadow, // You can define a shadow color
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 2, // For Android
    },
    shadowSmall: {
      shadowColor: colors?.shadow ?? DefaultColor.light.shadow, // You can define a shadow color
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2, // For Android
    },
    shadowMedium: {
      shadowColor: colors?.shadow ?? DefaultColor.light.shadow,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6, // For Android
    },
    shadowLarge: {
      shadowColor: colors?.shadow ?? DefaultColor.light.shadow,
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12, // For Android
    },
  });
};

export default CommonShadows;
