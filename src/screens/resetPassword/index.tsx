import React, {useState} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {supabase} from '../../service/supabase/connect';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types';
import {AppMainLayout} from '../../layout';
import {useCurrentThemeData} from '../../lib/redux/hooks';
import {globalStyles} from '../../styles';
import {showToast} from '../../utils';
import {CustomButton, CustomInput} from '../../components';

interface ResetPasswordScreenProps {
  navigation: NavigationProp<RootStackParamList, 'forgotPassword'>; // Specify the route
  route: RouteProp<RootStackParamList, 'resetPassword'>;
}

const ResetPasswordScreen = ({navigation}: ResetPasswordScreenProps) => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors: colors});
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle password reset
  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      supabase.auth.onAuthStateChange(async event => {
        if (event === 'PASSWORD_RECOVERY') {
          const {data, error} = await supabase.auth.updateUser({
            password: newPassword,
          });
          if (data) {
            showToast({
              type: 'success',
              text1: 'Password updated successfully!',
            });
            navigation.navigate('login');
          }
          if (error) {
            showToast({
              type: 'error',
              text1: 'There was an error updating your password.',
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <AppMainLayout
      title="Reset password"
      containerStyle={[commonStyles.center, styles.container]}
      hideRightIcons
      showBackButton>
      <View style={styles.subContainer}>
        <CustomInput
          style={[commonStyles.input, commonStyles.shadowSmall]}
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <CustomInput
          style={[commonStyles.input, commonStyles.shadowSmall]}
          placeholder="Confirm new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setConfirmPassword}
        />
        <CustomButton
          onPress={handlePasswordReset}
          style={[commonStyles.button, commonStyles.shadowMedium]}
          title={isLoading ? 'Resetting...' : 'Reset Password'}
          textStyle={[commonStyles.bgButtonText]}
        />
      </View>
    </AppMainLayout>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  subContainer: {
    width: '100%',
  },
});

export default ResetPasswordScreen;
