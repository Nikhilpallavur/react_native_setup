import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import {AppMainLayout} from '../../layout';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from 'react-native-gifted-charts';
import {defaultDimensions, fontSizes} from '../../constants';
import {useCurrentThemeData} from '../../lib/redux/hooks';
import {globalStyles} from '../../styles';
import {
  BudgetPieChart,
  CompareChart,
  MonthlyExpense,
  MultiLineChart,
} from '../../components/charts';
const windowWidth = Dimensions.get('window').width;

const pieChartData = [
  {value: 40, color: '#FFA726'},
  {value: 30, color: '#66BB6A'},
  {value: 20, color: '#42A5F5'},
  {value: 10, color: '#FF7043'},
];

const CHART_PADDING = 10;

const Dashboard = () => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors});

  const chartContainerStyle = [
    styles.chartContainer,
    commonStyles.shadowMedium,
    {backgroundColor: colors.cardBackground, padding: CHART_PADDING},
  ];
  const chartHeaderStyle = [styles.chartTitle, {color: colors.text}];
  return (
    <AppMainLayout title="Dashboard">
      <ScrollView style={styles.container}>
        <MonthlyExpense />
        <MultiLineChart />
        <CompareChart />
        <BudgetPieChart />
      </ScrollView>
    </AppMainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // paddingHorizontal: defaultDimensions.appHorizontalPadding,
    paddingVertical: defaultDimensions.appVerticalPadding,
  },
  chartContainer: {
    marginBottom: 30,
    borderRadius: defaultDimensions.borderRadiusMedium,
  },
  chartTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Dashboard;
