import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PATH_URL} from '../constants';
import LoginPage from '../screens/login';
import HomeScreen from '../screens/home';
import DeepLinking from '../DeepLinking';
import FeedDetailScreen from '../screens/feed/feedDetails';
import {RootStackParamList, UserSession} from '../types';
import BookmarkScreen from '../screens/bookmarks';
import {configUserData} from '../utils';
import {useAppDispatch} from '../lib/redux/hooks';
import {setUserDetails} from '../lib/redux/slices/userDetails';
import PersonalInfoScreen from '../screens/onboarding/personalInfo';
import FinancialInfoScreen from '../screens/onboarding/financialInfo';
import ConnectPlaidScreen from '../screens/onboarding/ConnectPlaidScreen';
import ForgotPasswordScreen from '../screens/forgotPassword';
import OTPScreen from '../screens/otpScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const NavigationController = ({
  currentSession,
}: {
  currentSession: UserSession | null;
}) => {
  const dispatch = useAppDispatch();
  const updatedUserData = useCallback(async () => {
    const userData = await configUserData({
      session: currentSession?.session ?? null,
      user: currentSession?.user ?? null,
    });
    dispatch(setUserDetails(userData));
  }, [currentSession?.session, currentSession?.user, dispatch]);
  useEffect(() => {
    if (currentSession?.session) {
      updatedUserData();
    }
  }, [currentSession, updatedUserData]);

  const linking = {
    prefixes: ['dolfin://'], // Add your app's scheme
    config: {
      screens: {
        Home: '',
        feedDetail: `${PATH_URL.feedDetail}/:id`,
        resetPassword: `${PATH_URL.resetPassword}/:id`,
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <DeepLinking>
        <Stack.Navigator
          initialRouteName={currentSession ? 'home' : 'login'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={'login'} component={LoginPage} />
          <Stack.Screen name={'home'} component={HomeScreen} />
          <Stack.Screen name={'feedDetail'} component={FeedDetailScreen} />
          <Stack.Screen name={'bookmark'} component={BookmarkScreen} />
          <Stack.Screen name={'personalInfo'} component={PersonalInfoScreen} />
          <Stack.Screen
            name={'financialInfo'}
            component={FinancialInfoScreen}
          />
          <Stack.Screen
            name={'connectPlaidScreen'}
            component={ConnectPlaidScreen}
          />
          <Stack.Screen
            name={'forgotPassword'}
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name={'otpScreen'} component={OTPScreen} />
        </Stack.Navigator>
      </DeepLinking>
    </NavigationContainer>
  );
};

export default NavigationController;
