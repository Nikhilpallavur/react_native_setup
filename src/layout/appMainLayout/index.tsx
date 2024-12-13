import {
  View,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles';
import {calculateFlex} from '../../utils';
import {defaultDimensions} from '../../constants';
import {CommonHeaderPropsType} from '../../types';
import {CommonHeader, CustomStatusBar} from '../../components';
import {useCurrentThemeData} from '../../lib/redux/hooks';

interface AppMainLayoutProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  customerStatusPosition?: 'absolute' | 'relative';
  customerStatusHidden?: boolean;
  loading?: boolean;
}

export const AppMainLayout = (
  props: AppMainLayoutProps & CommonHeaderPropsType,
) => {
  const {
    children,
    containerStyle = {},
    title = '',
    isAbsolute = false,
    customerStatusPosition,
    customerStatusHidden,
    loading,
  } = props;
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors});
  const hederFlex =
    calculateFlex({
      givenHeight: defaultDimensions.headerHeight,
    }) + 0.005;
  const contentFlex = 1 - hederFlex;
  const absoluteHeader = isAbsolute || title === '';
  return (
    <SafeAreaView style={[commonStyles.container]}>
      <CustomStatusBar
        backgroundColor={
          absoluteHeader ? colors.background : colors.headerBgColor
        }
        position={customerStatusPosition}
        hidden={customerStatusHidden}
      />

      {absoluteHeader ? (
        <CommonHeader {...props} />
      ) : (
        <View style={{flex: hederFlex, zIndex: 1}}>
          <CommonHeader {...props} />
        </View>
      )}
      <View style={[{flex: absoluteHeader ? 1 : contentFlex}, containerStyle]}>
        {children}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: defaultDimensions.appHorizontalPadding,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});
