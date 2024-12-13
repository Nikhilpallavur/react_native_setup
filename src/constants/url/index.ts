export const PATH_URL = {
  login: 'login',
  home: 'home',
  feed: 'feed',
  feedDetail: 'feedDetail',
  dashboard: 'dashboard',
  settings: 'settings',
  profile: 'profile',
  logout: 'logout',
  expenses: 'expenses',
  budget: 'budget',
  checks: 'checks',
  bookmark: 'bookmark',
  personalInfo: 'personalInfo',
  financialInfo: 'financialInfo',
  imageUpload: 'imageUpload',
  connectPlaidScreen: 'connectPlaidScreen',
  forgotPassword: 'forgotPassword',
  resetPassword: 'resetPassword',
  otpScreen: 'otpScreen',
};

export const APP_DEEP_LINK_BASE_URL = {
  home: `dolfin://${PATH_URL.home}`,
  feedDetail: `dolfin://${PATH_URL.feedDetail}`,
  resetPassword: `dolfin://${PATH_URL.resetPassword}`,
};
