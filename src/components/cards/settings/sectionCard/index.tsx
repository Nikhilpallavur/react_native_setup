import {memo} from 'react';
import {useCurrentThemeData} from '../../../../lib/redux/hooks';
import {globalStyles} from '../../../../styles';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Switch} from 'react-native';
import {Icon} from '@rneui/themed';

export const CommonSettingItem = memo(
  ({
    title,
    subtitle,
    hasSwitch,
    switchValue,
    onSwitchToggle,
    rightIcon,
    onPress,
  }: {
    title: string;
    subtitle?: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchToggle?: () => void;
    rightIcon?: string;
    onPress?: () => void;
  }) => {
    const {colors} = useCurrentThemeData();

    const commonStyles = globalStyles({});
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.settingItem}>
        <Text style={[commonStyles.text, {color: colors.text}]}>{title}</Text>
        {subtitle && <Text style={styles.settingSubText}>{subtitle}</Text>}
        {hasSwitch ? (
          <Switch
            trackColor={{false: colors.background, true: colors.primary}}
            thumbColor={switchValue ? colors.bgButtonText : colors.background}
            onValueChange={onSwitchToggle}
            value={switchValue}
          />
        ) : rightIcon ? (
          <Icon name={rightIcon} size={24} color={colors.text} />
        ) : null}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  settingSubText: {
    fontSize: 14,
    color: 'gray',
  },
});
