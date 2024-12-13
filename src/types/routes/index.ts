import {PATH_URL} from '../../constants';

export type RootStackParamList = {
  [key in keyof typeof PATH_URL]: key extends 'forgotPassword'
    ? {email: string}
    : key extends 'otpScreen'
    ? {email: string}
    : undefined; // No params for other routes
};
