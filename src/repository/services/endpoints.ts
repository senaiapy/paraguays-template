
export const Endpoints: any = {
  
  module: "module",
  countries: "api/country-list",

  signIn: '/login',
  signUp: '/register',
  
  refreshToken: '/refresh/token',
  twoFaOtpVerification: '/otp-submit',
  user: '/user-info',
  updateProfile: '/profile-settings',
  resetPassword: '/forgot-password',
  verifyEmail: '/forgot-password/verify-code',
  resetPasswordSubmit: '/reset-password',
  changePassword: '/change-password',
  kycForm: '/kyc-form-data',
  kycFormSubmit: '/kyc-form',
  generateQr: '/generate-qrcode',
  settings: '/settings',
  dashboard: '/dashboard',
  //Withdraw
  withdrawList: '/withdraw-history',
  withdrawFrom: '/withdraw-money',
  methods: '/withdraw-methods?currency=',
  submitWithdraw: '/withdraw-money',
  //Support
  tickets: '/support/tickets',
  openTickets: '/open/support/ticket',
  ticketMessages: '/support/ticket/messages/',
  ticketReply: '/reply/ticket/',
  //2fa verification
  sendCode: '/send/two-step/verify-code',
  resendCode: '/resend/two-step/verify-code',
  enableVerification: '/two-step/verification',
  loginVerification: '/two-step/code/verify',
};
