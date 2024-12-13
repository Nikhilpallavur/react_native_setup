import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-gifted-charts';
import {defaultDimensions, fontSizes} from '../../../constants';
import {useCurrentThemeData} from '../../../lib/redux/hooks';
import {globalStyles} from '../../../styles';

const windowWidth = Dimensions.get('window').width;
const barData = [
  {
    value: 40,
    label: 'Jan',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: {color: 'gray'},
    frontColor: '#177AD5',
  },
  {value: 20, frontColor: '#ED6665'},
  {
    value: 50,
    label: 'Feb',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: {color: 'gray'},
    frontColor: '#177AD5',
  },
  {value: 40, frontColor: '#ED6665'},
  {
    value: 75,
    label: 'Mar',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: {color: 'gray'},
    frontColor: '#177AD5',
  },
  {value: 25, frontColor: '#ED6665'},
  {
    value: 30,
    label: 'Apr',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: {color: 'gray'},
    frontColor: '#177AD5',
  },
  {value: 20, frontColor: '#ED6665'},
  {
    value: 60,
    label: 'May',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: {color: 'gray'},
    frontColor: '#177AD5',
  },
  {value: 40, frontColor: '#ED6665'},
  {
    value: 65,
    label: 'Jun',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: {color: 'gray'},
    frontColor: '#177AD5',
  },
  {value: 30, frontColor: '#ED6665'},
  {
    value: 65,
    label: 'July',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: {color: 'gray'},
    frontColor: '#177AD5',
  },
  {value: 30, frontColor: '#ED6665'},
];

const DEFAULT_CHART_PADDING = 40;
const DEFAULT_BAR_WIDTH = 10;
const CHART_PADDING = 10;
export const CompareChart = () => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors});
  const chartWidth =
    windowWidth -
    DEFAULT_CHART_PADDING -
    (defaultDimensions.appHorizontalPadding + CHART_PADDING) * 2;
  const barChartSpacing = chartWidth / barData.length;

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

  const headerData = [
    {
      color: '#177AD5',
      label: 'Budget',
    },
    {
      color: '#ED6665',
      label: 'Expense',
    },
  ];

  return (
    <View style={chartContainerStyle}>
      <Text
        style={{
          color: colors.text,
          fontSize: fontSizes.large,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        2024 - 25
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 24,
          marginBottom: 10,
        }}>
        {headerData.map((header, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: header.color,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                width: 60,
                height: 16,
                color: colors.text,
              }}>
              {header.label}
            </Text>
          </View>
        ))}
      </View>
      <BarChart
        data={barData}
        width={chartWidth}
        barWidth={DEFAULT_BAR_WIDTH}
        spacing={barChartSpacing}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{color: colors.text}}
        xAxisLabelTextStyle={{color: colors.text}}
        noOfSections={3}
        maxValue={75}
        isAnimated
        disableScroll
        activeOpacity={0.7}
      />
    </View>
  );
};
