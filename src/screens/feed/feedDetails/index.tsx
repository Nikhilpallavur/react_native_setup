import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {RootStackParamList} from '../../../types';
import {useCurrentThemeData} from '../../../lib/redux/hooks';
import {globalStyles} from '../../../styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonHeader, CustomStatusBar} from '../../../components';
import {AppMainLayout} from '../../../layout';
import {View} from 'react-native';

interface FeedDetailPageProps {
  navigation: NavigationProp<RootStackParamList, 'feedDetail'>; // Specify the route
}

const DashboardScreen = ({}: FeedDetailPageProps) => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors: colors});
  return (
    <AppMainLayout title="Feed Details">
      <View></View>
    </AppMainLayout>
  );
};

export default DashboardScreen;
