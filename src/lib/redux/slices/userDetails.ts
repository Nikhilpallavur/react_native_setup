import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DummyProfileImage} from '../../../assets/image';
import {UserAddressType, UserDetailsStateType} from '../../../types';

export const USER_DETAILS_DEFAULT_DATA: UserDetailsStateType = {
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  profileImage: DummyProfileImage,
  phone: '',
  address: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
  },
  annualIncome: 0,
  riskAppetite: 0,
  targetAssets: [],
};

const userSlice = createSlice({
  name: 'userDetails',
  initialState: USER_DETAILS_DEFAULT_DATA,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserDetailsStateType>) {
      const {
        userId,
        firstName,
        lastName,
        phone,
        address,
        annualIncome,
        riskAppetite,
      } = action.payload;
      state.userId = userId;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phone = phone;
      state.address = address;
      state.annualIncome = annualIncome;
      state.riskAppetite = riskAppetite;
    },
    // Add or update user info together (First name, Last name, Email, Phone, Address)
    updateUserInfo(
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: UserAddressType;
      }>,
    ) {
      const {firstName, lastName, email, phone, address} = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phone = phone;
      state.address = address;
    },
    updateFinancialInfo(
      state,
      action: PayloadAction<{
        annualIncome: number;
        riskAppetite: number;
      }>,
    ) {
      const {annualIncome, riskAppetite} = action.payload;
      state.annualIncome = annualIncome;
      state.riskAppetite = riskAppetite;
    },
    updateUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setTargetAssets(state, action: PayloadAction<number[]>) {
      state.targetAssets = action.payload;
    },
    addTargetAsset(state, action: PayloadAction<number>) {
      state.targetAssets.push(action.payload);
    },
    removeTargetAsset(state, action: PayloadAction<number>) {
      state.targetAssets = state.targetAssets.filter(
        asset => asset !== action.payload,
      );
    },
    clearUserState(state) {
      state.userId = '';
      state.firstName = '';
      state.lastName = '';
      state.phone = '';
      state.address = {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
      };
      state.annualIncome = 0;
      state.riskAppetite = 0;
      state.targetAssets = [];
    },
  },
});

export const {
  setUserDetails,
  updateUserId,
  setTargetAssets,
  addTargetAsset,
  removeTargetAsset,
  clearUserState,
  updateUserInfo,
  updateFinancialInfo,
} = userSlice.actions;

export default userSlice.reducer;
