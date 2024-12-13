import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {defaultDimensions, fontSizes} from '../../../constants';
import {useCurrentThemeData} from '../../../lib/redux/hooks';
import {globalStyles} from '../../../styles';

const windowWidth = Dimensions.get('window').width;
const lineData = [
  {value: 0},
  {value: 10},
  {value: 8},
  {value: 58},
  {value: 56},
  {value: 78},
  {value: 74},
  {value: 98},
];
const lineData2 = [
  {value: 0},
  {value: 20},
  {value: 18},
  {value: 40},
  {value: 36},
  {value: 60},
  {value: 54},
  {value: 85},
];
const DEFAULT_CHART_PADDING = 40;
const DEFAULT_BAR_WIDTH = 10;
const CHART_PADDING = 10;
export const MultiLineChart = () => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors});
  const chartWidth =
    windowWidth -
    DEFAULT_CHART_PADDING -
    (defaultDimensions.appHorizontalPadding + CHART_PADDING) * 2;
  const barChartSpacing = chartWidth / lineData.length;

  const chartContainerStyle = [
    commonStyles.shadowMedium,
    {
      backgroundColor: colors.cardBackground,
      padding: CHART_PADDING,
      marginBottom: 30,
      borderRadius: defaultDimensions.borderRadiusMedium,
      marginHorizontal: defaultDimensions.appHorizontalPadding,
    },
  ];

  const chartSpacing = chartWidth / lineData.length;

  return (
    <View style={chartContainerStyle}>
      <Text
        style={{
          color: colors.text,
          fontSize: fontSizes.large,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Expense
      </Text>
      <LineChart
        areaChart
        curved
        data={lineData}
        data2={lineData2}
        height={250}
        showVerticalLines
        spacing={44}
        initialSpacing={0}
        color1="skyblue"
        color2="orange"
        textColor1="green"
        hideDataPoints
        dataPointsColor1="blue"
        dataPointsColor2="red"
        startFillColor1="skyblue"
        startFillColor2="orange"
        startOpacity={0.8}
        endOpacity={0.3}
      />
    </View>
  );
};
