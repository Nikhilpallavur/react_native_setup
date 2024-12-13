import React, {useState, useEffect, useRef, memo} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {PlaceholderImage} from '../../../assets/image';
import {colors} from '../../../constants';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {ReloadOutlineIcon} from '../../../assets/icons';

interface CommonImageProps {
  source: Source;
  placeholder?: Source;
  style?: object;
  retryText?: string;
  showLoader?: boolean;
  imageStyle?: object;
  retryTextColor?: string;
  showBgColor?: boolean;
}

export const CommonImage: React.FC<CommonImageProps> = memo(
  ({
    source,
    placeholder = PlaceholderImage,
    style,
    retryText = 'Tap to retry',
    showLoader = true,
    imageStyle,
    retryTextColor = colors.light.text,
    showBgColor = false,
  }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const prevSourceUri = useRef(source.uri);

    useEffect(() => {
      if (source.uri !== prevSourceUri.current) {
        setLoading(true);
        setError(false);
        prevSourceUri.current = source.uri; // Update the previous source URI
      }
    }, [source]);

    const onLoadEnd = () => {
      setLoading(false);
    };

    const onError = () => {
      setError(true);
      setLoading(false);
    };

    const handleRetry = () => {
      setError(false);
      setLoading(true);
    };

    const scale = useSharedValue(1);

    // Animated style to apply the scale transformation
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: scale.value}],
      };
    });

    // Pinch gesture event handler
    const onPinchEvent = (event: PinchGestureHandlerGestureEvent) => {
      scale.value = event.nativeEvent.scale;
    };

    const onPinchStateChange = (event: PinchGestureHandlerGestureEvent) => {
      if (event.nativeEvent.state === 4) {
        // "End" state
        scale.value = withSpring(1); // Snap the scale back to 1 after pinch ends
      }
    };

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: showBgColor ? '#96969650' : 'transparent'},
          style,
        ]}>
        <GestureHandlerRootView style={styles.container}>
          {loading && showLoader && !error && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="rgba(0,0,0,0.3)" />
            </View>
          )}
          <PinchGestureHandler
            onGestureEvent={onPinchEvent}
            onHandlerStateChange={onPinchStateChange}>
            <View style={styles.imageContainer}>
              <FastImage
                key={source.uri} // Ensure FastImage only reloads if the URI changes
                style={[styles.image, imageStyle, animatedStyle]}
                source={error ? placeholder : source}
                resizeMode={FastImage.resizeMode.cover}
                onError={onError}
                onLoadEnd={onLoadEnd}
              />
            </View>
          </PinchGestureHandler>
          {error && (
            <TouchableOpacity
              style={styles.retryContainer}
              onPress={handleRetry}>
              <ReloadOutlineIcon
                fontSize={100}
                style={{width: 40, height: 40}}
                stroke={retryTextColor}
              />
              <Text style={[styles.retryText, {color: retryTextColor}]}>
                {retryText}
              </Text>
            </TouchableOpacity>
          )}
        </GestureHandlerRootView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  loaderContainer: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  retryContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
