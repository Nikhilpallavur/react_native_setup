import React, {useState} from 'react';
import {CustomInput} from '../../../components';
import {globalStyles} from '../../../styles';
import {useAppDispatch, useCurrentThemeData} from '../../../lib/redux/hooks';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../types';
import {FormLayout} from '../../../layout/formLayout';
import {updateUserInfo} from '../../../lib/redux/slices/userDetails';
import {
  isNotEmpty,
  isValidEmail,
  isValidPhoneNumber,
  isValidZipCode,
  showToast,
} from '../../../utils';

interface PersonalInfoScreenPageProps {
  navigation: NavigationProp<RootStackParamList, 'personalInfo'>; // Specify the route
}
const PersonalInfoScreen = ({navigation}: PersonalInfoScreenPageProps) => {
  const dispatch = useAppDispatch();
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors: colors});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const onClickNext = () => {
    // Perform field validations
    if (!isNotEmpty(firstName)) {
      showToast({type: 'error', text1: 'First Name is required.'});
      return;
    }

    if (!isNotEmpty(lastName)) {
      showToast({type: 'error', text1: 'Last Name is required.'});
      return;
    }

    if (!isValidEmail(email)) {
      showToast({type: 'error', text1: 'Please enter a valid email address.'});
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      showToast({
        type: 'error',
        text1: 'Please enter a valid 10-digit phone number.',
      });
      return;
    }

    if (!isNotEmpty(addressLine1)) {
      showToast({type: 'error', text1: 'Address Line 1 is required.'});
      return;
    }

    if (!isNotEmpty(city)) {
      showToast({type: 'error', text1: 'City is required.'});
      return;
    }

    if (!isNotEmpty(state)) {
      showToast({type: 'error', text1: 'State is required.'});
      return;
    }

    if (!isValidZipCode(zipCode)) {
      showToast({type: 'error', text1: 'Please enter a valid ZIP Code.'});
      return;
    }

    dispatch(
      updateUserInfo({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        address: {
          line1: addressLine1,
          line2: addressLine2,
          city: city,
          state: state,
          zip: zipCode,
        },
      }),
    );
    navigation.navigate('financialInfo');
  };
  return (
    <FormLayout
      title="Personal Information"
      showBackButton
      hideRightIcons
      buttonText="Next"
      onPressButton={() => {
        onClickNext();
      }}>
      <CustomInput
        style={[commonStyles.input, commonStyles.shadowSmall]}
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <CustomInput
        style={[commonStyles.input, commonStyles.shadowSmall]}
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <CustomInput
        style={[commonStyles.input, commonStyles.shadowSmall]}
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <CustomInput
        style={[commonStyles.input, commonStyles.shadowSmall]}
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <CustomInput
        style={[commonStyles.input, commonStyles.shadowSmall]}
        label="Address Line 1"
        value={addressLine1}
        onChangeText={setAddressLine1}
        placeholder="Address Line 1"
      />
      <CustomInput
        style={[commonStyles.input, commonStyles.shadowSmall]}
        label="Address Line 2"
        value={addressLine2}
        onChangeText={setAddressLine2}
        placeholder="Address Line 2"
      />
      <CustomInput
        style={[commonStyles.input, commonStyles.shadowSmall]}
        label="City"
        value={city}
        onChangeText={setCity}
        placeholder="City"
      />
      <CustomInput
        style={[commonStyles.input, commonStyles.shadowSmall]}
        label="State"
        value={state}
        onChangeText={setState}
        placeholder="State"
      />
      <CustomInput
        style={[commonStyles.input, commonStyles.shadowSmall]}
        label="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
        placeholder="Zip Code"
        keyboardType="numeric"
      />
    </FormLayout>
  );
};

export default PersonalInfoScreen;
