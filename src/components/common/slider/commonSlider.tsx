import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  GestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  colors as commonColors,
  defaultDimensions,
  fontSizes,
} from '../../../constants';
import {useCurrentThemeData} from '../../../lib/redux/hooks';

// Get screen width for responsive design
const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Default slider settings
const DEFAULT_SLIDER_WIDTH = SCREEN_WIDTH - 40;
const DEFAULT_THUMB_SIZE = 30;
const DEFAULT_TRACK_HEIGHT = 4;

type SliderProps = {
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  step?: number;
  trackColor?: string;
  thumbColor?: string;
  trackFillColor?: string;
  trackHeight?: number;
  thumbSize?: number;
  showValueLabel?: boolean;
  onValueChange?: (value: number) => void;
  label?: string;
};

export const CommonSlider = memo(
  ({
    minValue = 0,
    maxValue = 100,
    defaultValue = 0,
    step = 1,
    trackColor = '#d3d3d3',
    thumbColor = commonColors.light.primary,
    trackFillColor = commonColors.light.primary,
    trackHeight = DEFAULT_TRACK_HEIGHT,
    thumbSize = DEFAULT_THUMB_SIZE,
    showValueLabel = true,
    label,
    onValueChange,
  }: SliderProps) => {
    const {colors} = useCurrentThemeData();
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);

    const translateX = useSharedValue(
      ((value - minValue) / (maxValue - minValue)) *
        (DEFAULT_SLIDER_WIDTH - thumbSize),
    );

    // Gesture handler for sliding
    const gestureHandler = (event: GestureHandlerGestureEvent) => {
      const translationX = event.nativeEvent.translationX as number;
      // Smooth movement of the thumb during the gesture (with spring)
      translateX.value = Math.min(
        Math.max(translationX, 0),
        DEFAULT_SLIDER_WIDTH - thumbSize,
      );
      // Update the value as the thumb moves
      const newValue =
        (translateX.value / (DEFAULT_SLIDER_WIDTH - thumbSize)) *
          (maxValue - minValue) +
        minValue;
      setValue(Math.round(newValue / step) * step);
    };

    const onGestureEnd = () => {
      // Smooth spring animation on gesture end
      translateX.value = withSpring(translateX.value, {
        damping: 20, // Lower damping for more bouncy effect
        stiffness: 90, // Higher stiffness for quicker spring
        overshootClamping: true, // Prevents overshooting the value
      });

      // Calculate the final value based on translateX value
      const finalValue =
        (translateX.value / (DEFAULT_SLIDER_WIDTH - thumbSize)) *
          (maxValue - minValue) +
        minValue;

      // Update the value after gesture ends
      onValueChange?.(Math.round(finalValue / step) * step);
    };

    // Animated styles for the thumb and the filled track
    const animatedThumbStyle = useAnimatedStyle(() => ({
      transform: [{translateX: translateX.value}],
    }));

    const animatedTrackFillStyle = useAnimatedStyle(() => ({
      width: translateX.value + thumbSize / 2,
    }));

    // Calculate the displayed value based on translateX during render
    const displayedValue = Math.round(
      (translateX.value / (DEFAULT_SLIDER_WIDTH - thumbSize)) *
        (maxValue - minValue) +
        minValue,
    );

    return (
      <GestureHandlerRootView style={styles.container}>
        {label && (
          <Text
            style={{
              color: colors.text,
              marginBottom: 4,
              fontSize: fontSizes.medium,
              alignSelf: 'flex-start',
            }}>
            {label}
          </Text>
        )}
        {showValueLabel && (
          <Text style={[styles.valueLabel, {color: colors.text}]}>
            {displayedValue}
          </Text>
        )}
        <View style={[styles.trackContainer, {height: trackHeight}]}>
          <View
            style={[
              styles.trackBackground,
              {height: trackHeight, backgroundColor: trackColor},
            ]}
          />
          <Animated.View
            style={[
              styles.trackFill,
              animatedTrackFillStyle,
              {backgroundColor: trackFillColor},
            ]}
          />
          <PanGestureHandler
            onGestureEvent={gestureHandler}
            onHandlerStateChange={onGestureEnd}>
            <Animated.View
              style={[
                styles.thumb,
                animatedThumbStyle,
                {
                  width: thumbSize,
                  height: thumbSize,
                  backgroundColor: thumbColor,
                },
              ]}
            />
          </PanGestureHandler>
        </View>
      </GestureHandlerRootView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  valueLabel: {
    fontSize: fontSizes.medium,
    marginBottom: defaultDimensions.marginMedium,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  trackContainer: {
    width: DEFAULT_SLIDER_WIDTH,
    justifyContent: 'center',
    position: 'relative',
  },
  trackBackground: {
    position: 'absolute',
    width: '100%',
    borderRadius: 2,
  },
  trackFill: {
    position: 'absolute',
    borderRadius: 2,
    left: 0,
    top: 0,
    bottom: 0,
  },
  thumb: {
    position: 'absolute',
    borderRadius: 50,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
  },
});

export default CommonSlider;
