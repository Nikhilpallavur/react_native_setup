import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import {useCurrentThemeData} from '../../lib/redux/hooks';
import {defaultDimensions, fontSizes} from '../../constants';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  errorMessage?: string | null;
  otpValue: string[]; // New prop to manage OTP value from parent
  resetOtp: boolean; // Prop to trigger reset of OTP fields
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  errorMessage,
  otpValue,
  resetOtp,
}) => {
  const [otp, setOtp] = useState<string[]>(otpValue);
  const inputsRef = useRef<TextInput[]>([]);
  const theme = useCurrentThemeData();

  // Reset OTP fields when resetOtp prop changes
  useEffect(() => {
    if (resetOtp) {
      setOtp(Array(length).fill(''));
      inputsRef.current[0].focus(); // Focus on the first input after resetting
    }
  }, [resetOtp, length]);

  // Handle changes in each box
  const handleChange = (value: string, index: number) => {
    if (/^\d$/.test(value)) {
      // Only allow digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next box
      if (value !== '' && index < length - 1) {
        inputsRef.current[index + 1].focus();
      }

      // Call the onComplete when the OTP is fully entered
      if (newOtp.join('').length === length) {
        Keyboard.dismiss();
        onComplete(newOtp.join(''));
      }
    }
  };

  // Handle backspace for navigating back to the previous input
  const handleBackspace = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    // Check if the backspace key is pressed
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];

      // If current input is already empty, move focus to the previous input
      if (newOtp[index] === '' && index > 0) {
        inputsRef.current[index - 1].focus();
      } else {
        // Clear the current input and update the state
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputsRef.current[index] = ref as TextInput)}
            style={[
              styles.input,
              {
                borderColor: theme.colors.placeHolderText,
                color: theme.colors.text,
              },
            ]}
            maxLength={1}
            keyboardType="number-pad"
            value={otp[index]}
            onChangeText={value => handleChange(value, index)}
            onKeyPress={e => handleBackspace(e, index)}
          />
        ))}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: defaultDimensions.borderRadiusSmall,
    textAlign: 'center',
    fontSize: fontSizes.large,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default OTPInput;
