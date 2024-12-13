import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {defaultDimensions, fontSizes} from '../../../constants';
import {useCurrentThemeData} from '../../../lib/redux/hooks';
import {globalStyles} from '../../../styles';

const windowWidth = Dimensions.get('window').width;
const lineChartData = [
  {value: 20, label: 'Jan'},
  {value: 30, label: 'Feb'},
  {value: 20, label: 'Mar'},
  {value: 40, label: 'Apr'},
  {value: 10, label: 'May'},
  {value: 20, label: 'Jun'},
  {value: 30, label: 'July'},
  {value: 40, label: 'Aug'},
  {value: 30, label: 'Sep'},
  {value: 70, label: 'Oct'},
  {value: 45, label: 'Nov'},
  {value: 80, label: 'Dec'},
];
export const MonthlyExpense = () => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors});
  const chartWidth = windowWidth - defaultDimensions.appHorizontalPadding;

  const chartContainerStyle = [
    commonStyles.shadowMedium,
    {
      // backgroundColor: colors.cardBackground,
      // padding: CHART_PADDING,
      marginBottom: 30,

      marginHorizontal: defaultDimensions.appHorizontalPadding,
      // borderRadius: defaultDimensions.borderRadiusMedium,
    },
  ];

  const chartSpacing = chartWidth / lineChartData.length;

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
        data={lineChartData}
        width={chartWidth}
        initialSpacing={defaultDimensions.appHorizontalPadding}
        spacing={chartSpacing}
        hideDataPoints
        thickness={5}
        hideRules
        hideYAxisText
        hideAxesAndRules
        color={colors.iconColor}
        curveType={1}
        curved
        xAxisLabelTextStyle={{fontSize: fontSizes.small, color: colors.text}}
        yAxisSide={1}
        yAxisLabelWidth={0}
        xAxisLength={chartWidth}
        xAxisThickness={1}
        isAnimated
        animationDuration={2000}
        yAxisExtraHeight={50}
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: 'lightgray',
          pointerStripWidth: 1,
          strokeDashArray: [2, 5],
          pointerColor: 'blue',
          pointerComponent: () => (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 50,
                backgroundColor: colors.background,
                borderColor: colors.primary,
                borderWidth: 5,
                marginTop: -5,
                marginLeft: -10,
              }}></View>
          ),
          radius: 4,
          pointerLabelWidth: 100,
          pointerLabelHeight: 100,
          pointerLabelComponent: (
            items: {
              label: string;
              value: string;
            }[],
          ) => {
            return (
              <View
                style={{
                  borderRadius: 4,
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  marginLeft: -10,
                  backgroundColor: colors.cardBackground,
                  flexGrow: 1,
                  padding: 5,
                }}>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: fontSizes.medium,
                  }}>
                  {items[0].label}
                </Text>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: fontSizes.large,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  ${items[0].value}
                </Text>
              </View>
            );
          },
        }}
      />
    </View>
  );
};
