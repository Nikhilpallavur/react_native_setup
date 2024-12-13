import {AuthError, Session, User} from '@supabase/supabase-js';
import {Source} from 'react-native-fast-image';

export interface SignInResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface SignUpResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface UserSession {
  user: User | null;
  session: Session | null;
}

export interface UserAddressType {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

export interface UserDetailsStateType {
  email: string;
  role: string;
  profileImage: Source;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: UserAddressType;
  annualIncome: number;
  riskAppetite: number;
  targetAssets: number[];
}
