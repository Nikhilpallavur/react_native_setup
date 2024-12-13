import {DummyProfileImage} from '../../../assets/image';
import {USER_DETAILS_DEFAULT_DATA} from '../../../lib/redux/slices/userDetails';
import {supabase} from '../../../service/supabase/connect';
import {UserDetailsStateType, UserSession} from '../../../types';

export const configUserData = async ({
  user,
}: UserSession): Promise<UserDetailsStateType> => {
  if (user?.id) {
    // Query user_details table
    const {data: userDetails, error} = await supabase
      .from('user_details')
      .select('*')
      .eq('user_id', user.id)
      .single(); // Use `.single()` to fetch a single object instead of an array

    if (error) {
      console.error('Error fetching user details:', error.message);
      return USER_DETAILS_DEFAULT_DATA;
    }

    return {
      userId: user.id || userDetails?.user_id || '',
      firstName: userDetails?.first_name ?? '',
      lastName: userDetails?.last_name ?? '',
      email: user.email ?? '',
      role: '',
      profileImage: DummyProfileImage,
      phone: userDetails?.phone ?? '',
      address: {
        line1: userDetails?.address_line_1 ?? '',
        line2: userDetails?.address_line_2 ?? '',
        city: userDetails?.city ?? '',
        state: userDetails?.state ?? '',
        zip: userDetails?.zip_code ?? '',
      },
      annualIncome: userDetails?.annual_income ?? '',
      riskAppetite: userDetails?.risk_appetite ?? '',
      targetAssets: [],
    };
  }
  return USER_DETAILS_DEFAULT_DATA;
};
