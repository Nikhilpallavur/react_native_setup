import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  KeyboardAvoidingViewProps,
} from 'react-native';

interface KeyboardAvoidingLayoutProps extends KeyboardAvoidingViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: object;
  childContainerStyle?: object;
}

export const KeyboardAvoidingLayout: React.FC<KeyboardAvoidingLayoutProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      {...props}>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  nonScrollableContainer: {
    flex: 1,
  },
});
