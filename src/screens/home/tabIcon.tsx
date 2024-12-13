import React from 'react';
import {
  HomeIcon,
  HomeOutlineIcon,
  LayoutGrid,
  LayoutOutlineGrid,
  MoneyBagOutLineIcon,
  SettingsIcon,
  SettingsOutlineIcon,
} from '../../assets/icons';
import {PATH_URL} from '../../constants';
import {useCurrentThemeData} from '../../lib/redux/hooks';

const TabIcon = ({name, focused}: {name: string; focused: boolean}) => {
  const {colors} = useCurrentThemeData();
  const iconProps = {
    width: focused ? 28 : 25,
    height: focused ? 28 : 25,
  };
  const fillColor = focused ? colors.tabIconColor : '#8E8E93';

  switch (name) {
    case PATH_URL.feed:
      return focused ? (
        <HomeIcon {...iconProps} fill={fillColor} />
      ) : (
        <HomeOutlineIcon {...iconProps} stroke={'#8E8E93'} />
      );
    case PATH_URL.settings:
      return focused ? (
        <SettingsIcon {...iconProps} fill={fillColor} />
      ) : (
        <SettingsOutlineIcon {...iconProps} stroke={'#8E8E93'} />
      );
    case PATH_URL.checks:
      return focused ? (
        <MoneyBagOutLineIcon
          {...iconProps}
          fill={fillColor}
          stroke={fillColor}
        />
      ) : (
        <MoneyBagOutLineIcon {...iconProps} stroke={'#8E8E93'} />
      );
    case PATH_URL.dashboard:
      return focused ? (
        <LayoutGrid {...iconProps} fill={fillColor} />
      ) : (
        <LayoutOutlineGrid {...iconProps} stroke={'#8E8E93'} />
      );
    default:
      return null;
  }
};

export default TabIcon;
