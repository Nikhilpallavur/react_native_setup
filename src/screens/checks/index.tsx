import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, SafeAreaView} from 'react-native';

import {useCurrentThemeData} from '../../lib/redux/hooks';
import ExpensesScreen from '../expenses';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types';
import BudgetScreen from '../budget';
import {CustomStatusBar} from '../../components';
import {defaultDimensions} from '../../constants';
import {FloatingButton} from '../../components/common/button/floatingButton';

interface ChecksPageProps {
  navigation: NavigationProp<RootStackParamList, 'checks'>;
}

const CheckScreen = ({navigation}: ChecksPageProps) => {
  const [activeTab, setActiveTab] = useState('Expenses');
  const {colors} = useCurrentThemeData();

  const renderScreen = () => {
    switch (activeTab) {
      case 'Expenses':
        return <ExpensesScreen navigation={navigation} />;
      case 'Budget':
        return <BudgetScreen navigation={navigation} />;
      default:
        return <ExpensesScreen navigation={navigation} />;
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <CustomStatusBar />
      <View style={[styles.tabContainer, {borderColor: colors.primary}]}>
        <Pressable
          style={[
            styles.tabButton,
            {
              backgroundColor:
                activeTab === 'Expenses' ? colors.primary : 'transparent',
            },
          ]}
          onPress={() => setActiveTab('Expenses')}>
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'Expenses' ? colors.background : colors.text,
              },
            ]}>
            Expenses
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabButton,
            {
              backgroundColor:
                activeTab === 'Budget' ? colors.primary : 'transparent',
            },
          ]}
          onPress={() => setActiveTab('Budget')}>
          <Text
            style={[
              styles.tabText,
              {color: activeTab === 'Budget' ? colors.background : colors.text},
            ]}>
            Budget
          </Text>
        </Pressable>
      </View>

      {/* Render Active Screen */}
      {renderScreen()}
      <FloatingButton onPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  tabContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: defaultDimensions.appHorizontalPadding,
    borderRadius: defaultDimensions.borderRadiusLarge,
    borderWidth: 1,
  },
  tabButton: {
    paddingVertical: defaultDimensions.paddingSmall,
    width: '50%',
    borderRadius: defaultDimensions.borderRadiusLarge,
  },
  tabText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CheckScreen;
