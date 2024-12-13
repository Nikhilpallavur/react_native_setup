import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  type?: ToastType; // Type of toast message
  text1: string; // Primary text
  text2?: string; // Secondary text (optional)
  position?: 'top' | 'bottom'; // Position of the toast
  duration?: number; // Duration the toast will be shown (milliseconds)
  onPress?: () => void; // Callback when toast is pressed
}

export const showToast = ({
  type = 'info',
  text1,
  text2,
  position = 'top',
  duration = 3000,
  onPress,
}: ToastOptions) => {
  Toast.show({
    type,
    text1,
    text2,
    position,
    visibilityTime: duration,
    onPress,
    swipeable: true,
  });
};
