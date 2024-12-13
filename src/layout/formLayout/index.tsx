import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import {AppMainLayout, KeyboardAvoidingLayout} from '..';
import {ScrollView} from 'react-native-gesture-handler';
import {useCurrentThemeData} from '../../lib/redux/hooks';
import {globalStyles} from '../../styles';
import {defaultDimensions} from '../../constants';
import {CommonHeaderPropsType} from '../../types';
import {CustomButton, SlideButton} from '../../components';

interface FormLayoutProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  KeyboardScrollable?: boolean;
  keyboardStyle?: object;
  KeyboardChildContainerStyle?: object;
  buttonText?: string;
  onPressButton: () => void;
  swipeButton?: boolean;
}

export const FormLayout = memo(
  (props: FormLayoutProps & CommonHeaderPropsType) => {
    const {
      children,
      KeyboardScrollable,
      keyboardStyle,
      KeyboardChildContainerStyle,
      buttonText = 'Submit',
      onPressButton,
      swipeButton,
    } = props;
    const {colors} = useCurrentThemeData();
    const commonStyles = globalStyles({colors: colors});
    return (
      <KeyboardAvoidingLayout
        scrollable={KeyboardScrollable}
        style={keyboardStyle}
        childContainerStyle={KeyboardChildContainerStyle}>
        <AppMainLayout {...props}>
          <ScrollView
            bounces={false}
            style={[commonStyles.container]}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={[styles.container]}>
              {children}
              {swipeButton ? (
                <SlideButton
                  title={buttonText}
                  onSwipeComplete={onPressButton}
                  style={[commonStyles.shadowMedium, styles.nextButton]}
                />
              ) : (
                <CustomButton
                  onPress={onPressButton}
                  style={[
                    commonStyles.button,
                    commonStyles.shadowMedium,
                    styles.nextButton,
                  ]}
                  title={buttonText}
                  textStyle={[commonStyles.bgButtonText]}
                />
              )}
            </View>
          </ScrollView>
        </AppMainLayout>
      </KeyboardAvoidingLayout>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: defaultDimensions.appVerticalPadding,
    paddingHorizontal: defaultDimensions.appHorizontalPadding,
    position: 'relative',
    flex: 1,
    paddingBottom: defaultDimensions.appVerticalPadding * 5,
  },
  nextButton: {
    position: 'absolute',
    bottom: defaultDimensions.appVerticalPadding,
    width: '100%',
    left: defaultDimensions.appHorizontalPadding,
  },
});
