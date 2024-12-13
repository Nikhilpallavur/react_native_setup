import {StyleSheet} from 'react-native';
import {colors as DefaultColor, fontSizes, getDimensions} from '../constants';
import CommonShadows from './common/shadow';
import CommonTextStyles from './common/text';

type propsType = {
  customDimensions?: Record<string, number>;
  colors?: (typeof DefaultColor)[keyof typeof DefaultColor];
};
export const globalStyles = ({customDimensions, colors}: propsType) => {
  const dimensions = getDimensions(customDimensions);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors?.background ?? DefaultColor.light.background,
      position: 'relative',
    },
    appHorizontalPadding: {
      paddingHorizontal: dimensions.appHorizontalPadding,
    },
    header: {
      color: colors?.text ?? DefaultColor.light.text,
      fontSize: fontSizes.commonHeader,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: colors?.primary ?? DefaultColor.light.primary,
      padding: dimensions.paddingMedium,
      borderRadius: dimensions.borderRadiusSmall,
      alignItems: 'center',
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderRadius: dimensions.borderRadiusSmall,
      paddingHorizontal: dimensions.paddingSmall,
      marginBottom: dimensions.marginMedium,
      color: colors?.text ?? DefaultColor.light.text,
      width: '100%',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    ...CommonTextStyles({colors}),
    ...CommonShadows({colors}),
  });
};
