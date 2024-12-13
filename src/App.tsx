// App.js

import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from './ThemeProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {getCurrentUser} from './service/supabase/authService';
import {Provider} from 'react-redux';
import {store} from './lib/redux/store';
import NavigationController from './navigation';
import {UserSession} from './types';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSession, setCurrentSession] = useState<UserSession | null>(
    null,
  );

  const findUserSession = async () => {
    const currentSessionCheck = await getCurrentUser();
    setCurrentSession(currentSessionCheck);
    setIsLoading(false);
  };

  useEffect(() => {
    findUserSession();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <ThemeProvider>
            <NavigationController currentSession={currentSession} />
            <Toast />
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
