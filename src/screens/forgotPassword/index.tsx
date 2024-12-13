import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {supabase} from '../../service/supabase/connect';
import {AppMainLayout} from '../../layout';
import {useCurrentThemeData} from '../../lib/redux/hooks';
import {globalStyles} from '../../styles';
import {CustomButton, CustomInput, CustomText} from '../../components';
import {APP_DEEP_LINK_BASE_URL, defaultDimensions} from '../../constants';
import {showToast} from '../../utils';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types';

interface ForgotPasswordPageProps {
  navigation: NavigationProp<RootStackParamList, 'forgotPassword'>; // Specify the route
}

const ForgotPasswordScreen = ({navigation}: ForgotPasswordPageProps) => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors: colors});
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      showToast({type: 'error', text1: 'Please enter your email'});
      return;
    }

    setLoading(true);

    const {error} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: APP_DEEP_LINK_BASE_URL.resetPassword,
    });

    setLoading(false);

    if (error) {
      showToast({type: 'error', text1: error.message});
    } else {
      showToast({
        type: 'success',
        text1: 'Check your email for a password reset link.',
      });
    }
  };

  return (
    <AppMainLayout
      title="Forgot password"
      containerStyle={[commonStyles.center, styles.container]}
      hideRightIcons
      showBackButton>
      <View style={styles.subContainer}>
        <CustomInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={[commonStyles.input, commonStyles.shadowSmall]}
          label="Email"
        />
        <CustomButton
          onPress={handleForgotPassword}
          style={[commonStyles.button, commonStyles.shadowMedium]}
          title={loading ? 'Sending...' : 'Send Reset Email'}
          textStyle={[commonStyles.bgButtonText]}
        />
        <TouchableOpacity
          style={commonStyles.center}
          onPress={() => {
            navigation.navigate('login');
          }}>
          <CustomText style={{marginTop: 20, textAlign: 'center'}}>
            Remember your password?{' '}
            <Text style={{color: colors.primary}}>Log in</Text>
          </CustomText>
        </TouchableOpacity>
      </View>
    </AppMainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: defaultDimensions.appHorizontalPadding,
  },
  subContainer: {
    width: '100%',
  },
});
export default ForgotPasswordScreen;
