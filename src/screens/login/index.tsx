import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {defaultDimensions, fontSizes} from '../../constants';
import {globalStyles} from '../../styles';
import {CustomButton, CustomInput, CustomText} from '../../components';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types';
import {CommonImage} from '../../components/common/image';
import {AppLogo} from '../../assets/image';
import {useCurrentThemeData} from '../../lib/redux/hooks';
import {Text} from 'react-native';
import {isValidEmail, showToast} from '../../utils';
import {AppMainLayout} from '../../layout';
import {signOut} from '../../service/supabase/authService';

interface LoginPageProps {
  navigation: NavigationProp<RootStackParamList, 'login'>;
}

const LoginPage: React.FC<LoginPageProps> = ({navigation}) => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors: colors});
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    signOut(); // To Clear all sessions
    setLoading(true);
    if (!email || email === '') {
      showToast({type: 'error', text1: 'Email is required'});
      setLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      showToast({type: 'error', text1: 'Please enter a valid email address.'});
      setLoading(false);
      return;
    }
    setLoading(false);
    navigation.navigate('otpScreen', {email: email});
  };

  return (
    <AppMainLayout
      loading={loading}
      isAbsolute
      containerStyle={[styles.container]}>
      <CommonImage source={AppLogo} style={styles.logoImage} />
      <CustomText style={[commonStyles.screenHeader, styles.header]}>
        Login
      </CustomText>
      <CustomInput
        placeholder="Email"
        style={[commonStyles.input, commonStyles.shadowSmall]}
        onChangeText={setEmail}
        value={email}
      />
      <CustomButton
        onPress={handleSignIn}
        style={[commonStyles.button, commonStyles.shadowMedium, styles.button]}
        title="Login"
        textStyle={[commonStyles.bgButtonText]}
      />
      <TouchableOpacity onPress={() => navigation.navigate('personalInfo')}>
        <CustomText style={[styles.signup, {color: colors.text}]}>
          Don't have an account?
          <Text
            style={[commonStyles.textButton, {color: colors.textButtonColor}]}>
            {' '}
            Sign Up
          </Text>
        </CustomText>
      </TouchableOpacity>
    </AppMainLayout>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  container: {
    paddingHorizontal: defaultDimensions.appHorizontalPadding,
  },
  header: {
    marginBottom: defaultDimensions.marginMedium,
    marginTop: defaultDimensions.marginLarge * 3,
    textAlign: 'center',
  },
  forgotPassword: {
    fontSize: fontSizes.small,
    textAlign: 'right',
    marginBottom: defaultDimensions.marginMedium,
  },
  button: {
    marginBottom: defaultDimensions.marginMedium,
  },
  signup: {
    textAlign: 'center',
  },
});

export default LoginPage;
