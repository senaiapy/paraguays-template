
//const baseUrl = 'https://cleantech.geniusocean.net/wallet-laravel-10';
// export const baseUrl= "https://dbrbank.digital";
//const userType = 'user'; // agent, merchant, user
//signIn: '/login',

export const URL = {
  // ########### WALLET ######################

  //googleAuthenticatorAppLinkAndroid: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en',
  //googleAuthenticatorAppLinkIos: 'https://apps.apple.com/us/app/google-authenticator/id388497605',
  //paginate: 16,

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
  module: '/api/module', // without user
  dashboard: '/dashboard',
  //Withdraw
  withdrawList: '/withdraw-history',
  withdrawFrom: '/withdraw-money',
  methods: '/withdraw-methods?currency = ',
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

  // ONLY IN USER

  //Deposit
  depositFrom: '/deposit',
  submitDeposit: '/deposit/submit',
  depositGateways: '/gateway-methods?currency_id = ',
  depositHistory: '/deposit/history',

  //Invoice
  invoice: '/create-invoice',
  invoiceUpdate: '/invoices-update/',
  invoiceSendEmail: '/invoice/send-mail/',
  cancelInvoice: '/invoice-cancel/',
  invoices: '/invoices',
  invoiceDetails: '/invoice/view/',
  changePaymentStatus: '/invoice/pay-status',
  changePublishStatus: '/invoice/publish-status',

  //Escrow
  escrowData: '/make-escrow',
  myEscrow: '/my-escrow',
  pendingEscrow: '/escrow-pending',
  escrowDispute: '/escrow-dispute/',
  escrowRelease: '/release-escrow/',

  //Transactions
  // allTransactions = (remark: string, search: string, page: number):>
  //  '/transactions?remark=${remark ?? ''}&search=${search ?? ''}&page=${page}',

  //Transaction
  transferLog: '/transfer-money/history',
  requestMoneyLog: '/sent-money-requests',
  receivedRequestLog: '/received-money-requests',
  transferMoneyFrom: '/transfer-money',
  requestMoneyFrom: '/request-money',
  acceptRequestMoney: '/accept-money-request',
  rejectRequestMoney: '/reject-money-request',
  checkReceiver: '/check-receiver',
  submitTransfer: '/transfer-money',
  submitRequest: '/request-money',

  //Exchange
  exchangeData: '/exchange-money',
  exchangeList: '/exchange-money/history',

  //Payment
  paymentFrom: '/make-payment',
  checkMerchant: '/check-merchant',
  merchantPaymentHistory: '/payment/history',

  //Voucher
  voucherData: '/create-voucher',
  voucherList: '/vouchers',
  redeemVoucherData: '/redeem-voucher',
  redeemHistory: '/redeemed-history',

  //CashOut
  cashOutFrom: '/cash-out',
  agentCheck: '/check/agent',

  //############### AGENT ################
  //############### AGENT ################
  //############### AGENT ################

  signInAgent: '/login',
  signUpAgent: '/register',
  countriesAgent: '/api/country-list', // without user
  verifyUserEmailAgent: '/verify-email',
  emailVerificationResendCodeAgent: '/resend/verify-email/code',
  refreshTokenAgent: '/refresh/token',
  twoFaOtpVerificationAgent: '/otp-submit',
  userAgent: '/agent-info',
  updateProfileAgent: '/profile-setting',
  resetPasswordAgent: '/forgot-password',
  verifyEmailAgent: '/forgot-password/verify-code',
  resetPasswordSubmitAgent: '/reset-password',
  changePasswordAgent: '/change-password',
  kycFormAgent: '/kyc-form-data',
  kycFormSubmitAgent: '/kyc-form',
  generateQrAgent: '/generate-qrcode',
  settingsAgent: '/settings',
  moduleAgent: '/api/module',
  dashboardAgent: '/dashboard',

  // allTransactionsAgent = (remark: string, search: string, page: number):>
  //  '/transactions?remark=${remark ?? ''}&search=${search ?? ''}&page=${page}',

  withdrawListAgent: '/withdraw-history',
  withdrawFromAgent: '/withdraw-money',
  submitWithdrawAgent: '/withdraw-money',

  sendCodeAgent: '/two-step/send-code',
  resendCodeAgent: '/resend/two-step/verify-code',
  enableVerificationAgent: '/two-step/verification',
  loginVerificationAgent: '/two-step/verify',

 // ONLY FOR AGENT

  cashInFromAgent: '/cash-in',
  checkAgentReceiverAgent: '/check-user',
  submitCashInRequestAgent: '/cash-in',

  cardWithdrawAgent: '/card-withdraw',

  fundsListAgent: '/fund-requests',
  createFundAgent: '/fund-request/submit',

  //############### MERCHANT ################
  //############### MERCHANT ################
  //############### MERCHANT ################

  signInMerchant: '/login',
  signUpMerchant: '/register',
  countriesMerchant: '/api/country-list', // without user
  verifyUserEmailMerchant: '/verify-email',
  emailVerificationResendCodeMerchant: '/resend/verify-email/code',
  refreshTokenMerchant: '/refresh/token',
  twoFaOtpVerificationMerchant: '/otp-submit',
  userMerchant: '/details/merchant',
  updateProfileMerchant: '/profile-settings',
  resetPasswordMerchant: '/forgot-password',
  verifyEmailMerchant: '/forgot-password/verify-code',
  resetPasswordSubmitMerchant: '/reset-password',
  changePasswordMerchant: '/change-password',
  kycFormMerchant: '/kyc-form-data',
  kycFormSubmitMerchant: '/kyc-form',
  generateQrMerchant: '/generate-qrcode',
  //  settings: '/settings',
  //  module: '/api/module',

  dashboardMerchant: '/dashboard',

  // Transactions
  // allTransactionsMerchant = (remark: string | undefined, search: string | undefined, page: number):> {
  //  return '/transactions?remark=${remark ?? ''}&search=${search ?? ''}&page=${page}',
  //},

  // Withdraw
  withdrawListMerchant: '/withdraw-history',
  withdrawFromMerchant: '/withdraw-money',
  // methodsMerchant: '/withdraw-methods?currency=',
  submitWithdrawMerchant: '/withdraw-money',

  // Support
  ticketsMerchant: '/support/tickets',
  openTicketsMerchant: '/open/support/ticket',
  ticketMessagesMerchant: '/support/ticket/messages/',
  ticketReplyMerchant: '/reply/ticket/',

  // 2fa verification
  sendCodeMerchant: '/two-step/send-code',
  resendCodeMerchant: '/resend/two-step/verify-code',
  enableVerificationMerchant: '/two-step/verification',
  loginVerificationMerchant: '/two-step/verify',

  // ONLY FOR MERCHANT

  // API key
  changeModeMerchant: '/service-mode',
  generateNewMerchant: '/generate-api-key',

};
