import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedScreen from '../feed';
import {PATH_URL, fontSizes} from '../../constants';
import SettingsScreen from '../settings';
import TabIcon from './tabIcon';
import DashboardScreen from '../dashboard';
import {CustomText} from '../../components';
import {useCurrentThemeData} from '../../lib/redux/hooks';
import CheckScreen from '../checks';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const {colors} = useCurrentThemeData();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide header for bottom tabs
        tabBarActiveTintColor: colors.text, // Active icon color
        tabBarInactiveTintColor: 'gray', // Inactive icon color
        tabBarStyle: {backgroundColor: colors.tabBgColor}, // Tab bar background color
      }}>
      <Tab.Screen
        name={PATH_URL.feed}
        component={FeedScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name={PATH_URL.feed} focused={focused} />
          ),
          tabBarLabel: ({focused}) => (
            <CustomText
              style={{
                fontSize: fontSizes.small,
                color: colors.text,
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Feed
            </CustomText>
          ),
        }}
      />
      <Tab.Screen
        name={PATH_URL.checks}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name={PATH_URL.checks} focused={focused} />
          ),
          tabBarLabel: ({focused}) => (
            <CustomText
              style={{
                fontSize: fontSizes.small,
                color: colors.text,
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Budget
            </CustomText>
          ),
        }}
        component={CheckScreen}
      />
      <Tab.Screen
        name={PATH_URL.dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name={PATH_URL.dashboard} focused={focused} />
          ),
          tabBarLabel: ({focused}) => (
            <CustomText
              style={{
                fontSize: fontSizes.small,
                color: colors.text,
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Dashboard
            </CustomText>
          ),
        }}
        component={DashboardScreen}
      />
      <Tab.Screen
        name={PATH_URL.settings}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name={PATH_URL.settings} focused={focused} />
          ),
          tabBarLabel: ({focused}) => (
            <CustomText
              style={{
                fontSize: fontSizes.small,
                color: colors.text,
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Settings
            </CustomText>
          ),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
