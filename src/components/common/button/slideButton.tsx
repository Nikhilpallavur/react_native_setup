import React, {useCallback, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import {ArrowLeftIcon} from '../../../assets/icons';
import {defaultDimensions} from '../../../constants';
import {globalStyles} from '../../../styles';
import {useCurrentThemeData} from '../../../lib/redux/hooks';

interface SlideButtonProps {
  onSwipeComplete: () => void;
  title: string;
  reset?: boolean; // Prop to reset the button to initial position
  textStyle?: StyleProp<TextStyle> | undefined;

  style?: StyleProp<ViewStyle> | undefined;
}
const {width: SCREEN_WIDTH} = Dimensions.get('window');
export const SlideButton: React.FC<SlideButtonProps> = ({
  onSwipeComplete,
  title,
  reset,
  textStyle,
  style,
}) => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({});
  const [completed, setCompleted] = useState(false); // Track if swipe is complete
  const translationX = useSharedValue(0);
  const BUTTON_WIDTH =
    SCREEN_WIDTH - defaultDimensions.appHorizontalPadding * 2; // Width of the button
  const SLIDER_WIDTH = defaultDimensions.buttonHeight; // Width of the slider
  const MIN_SWIPE_DISTANCE = BUTTON_WIDTH - SLIDER_WIDTH; // Minimum swipe distance to trigger the completion

  // Reset the button when the `reset` prop is true
  useEffect(() => {
    if (reset) {
      translationX.value = 0; // Reset the slider position to 0
      setCompleted(false); // Reset the completed state
    }
  }, [reset, translationX]);

  // Gesture handler event
  const onGestureEvent = useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      if (completed) {
        return;
      } // Prevent gesture event handling after completion

      const {translationX: xTranslation} = event.nativeEvent;
      if (xTranslation >= 0 && xTranslation <= MIN_SWIPE_DISTANCE) {
        translationX.value = xTranslation; // Update the position of the slider while the user is dragging
      }
    },
    [MIN_SWIPE_DISTANCE, completed, translationX],
  );

  // Animated style for the slider
  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(translationX.value, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  // Animated style for the swiped area (background)
  const swipedAreaStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translationX.value,
      [0, MIN_SWIPE_DISTANCE],
      [`${colors.imageOverlayColor}`, `${colors.imageOverlayColor}`], // start color (e0e0e0) and end color (swiped color, e.g., green)
    );

    return {
      backgroundColor, // Update the color based on the swipe progress
      width: withSpring(translationX.value + SLIDER_WIDTH), // Ensure background width includes the slider
    };
  });

  // Handle the swipe completion event
  const onGestureEnd = useCallback(() => {
    if (completed) {
      return;
    } // Prevent triggering onSwipeComplete again

    if (translationX.value >= MIN_SWIPE_DISTANCE - SLIDER_WIDTH) {
      // If the swipe is complete, move the slider to the end and trigger the completion action
      translationX.value = MIN_SWIPE_DISTANCE;
      setCompleted(true); // Set completed flag to true
      onSwipeComplete(); // Trigger the swipe completion action
    } else {
      // If the swipe is not complete, reset the slider to the starting position
      translationX.value = 0;
    }
  }, [
    completed,
    translationX,
    MIN_SWIPE_DISTANCE,
    SLIDER_WIDTH,
    onSwipeComplete,
  ]);

  return (
    <GestureHandlerRootView style={style}>
      <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
        <Animated.View
          style={[commonStyles.button, styles.button, {width: BUTTON_WIDTH}]}>
          <Animated.View
            style={[styles.swipedArea, swipedAreaStyle]} />
          <Text style={[commonStyles.bgButtonText, textStyle]}>{title}</Text>
          <Animated.View
            style={[styles.slider, {backgroundColor: '#a38a79'}, sliderStyle]}>
            <ArrowLeftIcon
              style={styles.arrowIcon}
              fontSize={24}
              color={colors.bgButtonText}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: defaultDimensions.buttonHeight,
  },
  button: {
    height: defaultDimensions.buttonHeight,
    borderRadius: defaultDimensions.borderRadiusCircle,
    justifyContent: 'center',
    position: 'relative',
  },
  swipedArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: defaultDimensions.buttonHeight,
    borderRadius: defaultDimensions.borderRadiusCircle,
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: defaultDimensions.buttonHeight,
    width: defaultDimensions.buttonHeight,
    borderRadius: defaultDimensions.borderRadiusCircle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    transform: [{rotate: '180deg'}],
  },
});
