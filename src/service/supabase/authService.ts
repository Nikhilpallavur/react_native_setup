import {supabase} from './connect';
import {SignInResponse, UserDetailsStateType, UserSession} from '../../types';
import {APP_COMMON_PASSWORD} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get the current user session
export const getCurrentUser = async (): Promise<UserSession | null> => {
  const {data, error} = await supabase.auth.getSession();

  if (error) {
    return null;
  }

  // Return null if the session does not exist
  return data.session ? {user: data.session.user, session: data.session} : null;
};

export const signUpUser = async ({
  email,
  userData,
}: {
  email: string;
  password?: string;
  userData: UserDetailsStateType;
}): Promise<{userId: string}> => {
  // const {error, data} = await supabase.auth.signUp({
  //   email,
  //   password: APP_COMMON_PASSWORD,
  // }); // real one

  // Bypass start
  const {error, user, session} = await signIn({
    email,
    password: APP_COMMON_PASSWORD,
  });
  const data = {
    user,
    session,
  };
  // Bypass  end
  if (error) {
    console.error('Error signing up:', error);
    throw new Error(`Error signing up:${error?.message}`);
  }
  if (!data?.user?.id) {
    console.error('Error signing up:');
    throw new Error('Error signing up');
  }

  // After successful signup, save additional user details to the 'user_details' table
  await upsertUserDetails(data?.user?.id, userData);
  return {userId: data?.user?.id};
};

// Function to upsert user details into the 'user_details' table
const upsertUserDetails = async (
  userId: string,
  userData: UserDetailsStateType,
) => {
  const {
    firstName,
    lastName,
    phone,
    address,
    annualIncome,
    riskAppetite,
    targetAssets,
  } = userData;
  const payload = {
    user_id: userId,
    first_name: firstName,
    last_name: lastName,
    phone,
    address_line_1: address.line1,
    address_line_2: address.line2,
    city: address.city,
    state: address.state,
    zip_code: address.zip,
    annual_income: annualIncome,
    risk_appetite: riskAppetite,
  };
  const {error} = await supabase.from('user_details').upsert(payload);
  if (error) {
    console.error('Error upserting user details:', error);
    throw new Error(`Error upserting user details:${error?.message}`);
  }
  if (targetAssets?.length > 0) {
    await addTargetAssets(userId, targetAssets);
  }
};

const addTargetAssets = async (userId: string, assets: number[]) => {
  const assetEntries = assets.map(assetValue => ({
    user_id: userId,
    asset_value: assetValue,
  }));

  const {error} = await supabase.from('target_assets').insert(assetEntries);

  if (error) {
    console.error('Error inserting target assets:', error.message);
    throw new Error(`Error inserting target assets::${error?.message}`);
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<SignInResponse> => {
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });
    return {
      user: data?.user || null,
      session: data?.session || null,
      error: error || null,
    };
  } catch (error) {
    console.error('Error signing in:', error);
    throw new Error(`Error signing in:${error}`);
  }
};

export const signOut = async (): Promise<void> => {
  const {error} = await supabase.auth.signOut();
  AsyncStorage.clear();
  if (error) {
    throw error;
  }
  AsyncStorage.clear()
    .then(() => {})
    .catch(err => {
      throw err;
    });
};
