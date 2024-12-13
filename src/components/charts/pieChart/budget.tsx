import {Text, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {useCurrentThemeData} from '../../../lib/redux/hooks';
import {globalStyles} from '../../../styles';
import {defaultDimensions, fontSizes} from '../../../constants';

const CHART_PADDING = 10;
export const BudgetPieChart = () => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors});
  const pieData = [
    {
      value: 47,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
    {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
    {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
  ];

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#006DFF')}
            <Text style={{color: colors.text}}>Excellent: 47%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#8F80F3')}
            <Text style={{color: colors.text}}>Okay: 16%</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#3BE9DE')}
            <Text style={{color: colors.text}}>Good: 40%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#FF7F97')}
            <Text style={{color: colors.text}}>Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };

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

  return (
    <View style={chartContainerStyle}>
      <Text
        style={{
          color: colors.text,
          fontSize: fontSizes.large,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Budget
      </Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  47%
                </Text>
                <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};
