import {useCallback, useEffect} from 'react';
import {AppState, Linking, AppStateStatus} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';

export const useDeepLinking = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleDeepLink = useCallback(
    (url: string | null) => {
      if (url) {
        const route = url.replace(/.*?:\/\//, ''); // Extract route part
        const [screen] = route.split('/'); // Get screen and optional params

        if (screen) {
          if (screen === 'home') {
            navigation.navigate('home');
          } else if (screen === 'expenses') {
            navigation.navigate('expenses');
          } else if (screen === 'settings') {
            navigation.navigate('settings');
          } else if (screen === 'feedDetail') {
            navigation.navigate('feedDetail');
          } else {
            console.warn(`Unknown screen: ${screen}`);
          }
        }
      }
    },
    [navigation],
  );

  useEffect(() => {
    // Get initial URL on app cold start
    const getInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getInitialURL();

    // Listen for deep linking events in foreground
    const linkingSubscription = Linking.addEventListener('url', event => {
      handleDeepLink(event.url);
    });

    // Handle app state changes (foreground, background, inactive)
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        const resumedUrl = await Linking.getInitialURL();
        handleDeepLink(resumedUrl);
      }
    };

    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Cleanup listeners
    return () => {
      linkingSubscription.remove();
      appStateSubscription.remove();
    };
  }, [handleDeepLink, navigation]);
};
