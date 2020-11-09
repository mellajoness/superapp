// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,  
  // profileUrl: 'https://dtptest.fidelitybank.ng/truprofile/api/',
  profileUrl: 'https://dtptest.fidelitybank.ng/LimitlessAPIGateway/api/TruProfile/',
  // profileUrl: 'https://digital.fidelitybank.ng/truprofile/api/',
  // investmentUrl: 'https://dtptest.fidelitybank.ng/MoneyZipapp/api/',
  investmentUrl: 'https://dtptest.fidelitybank.ng/LimitlessAPIGateway/api/',
  digitalLoanUrl: 'http://80.248.12.41:6780/digitalloanapi/',
  billsPaymentUrl: 'https://dtptest.fidelitybank.ng/billpayment/api',
  walletUrl: 'https://dtptest.fidelitybank.ng/eWalletAPI/api/Wallet/v1/',
  // digiInvestUrl: 'https://dtptest.fidelitybank.ng/DigitalInvestments/investboard',
  digiInvestUrl: 'https://dtptest.fidelitybank.ng/LimitlessAPIGateway/api/',
  // travelPaymentUrl: 'https://dtptest.fidelitybank.ng/digitaltravels/api/',
  // travelPaymentUrl: 'https://cors-anywhere.herokuapp.com/https://dtptest.fidelitybank.ng/digitaltravels/api/'
  travelPaymentUrl: 'https://dtptest.fidelitybank.ng/digitaltravels/api/',
  // travelPaymentUrl: 'https://cors-anywhere.herokuapp.com/https://dtptest.fidelitybank.ng/digitaltravels/api/',
  digitalLoanExtensionUrl: 'https://dtptest.fidelitybank.ng/LimitlessAPIGateway/api/Loan/',
  // digitalLoanExtensionUrl: 'https://dtptest.fidelitybank.ng/dlapi/',
  digitalLoanUrlMigo: 'http://80.248.12.41:9008/',
  profileCustomerUrl: 'https://dtptest.fidelitybank.ng/truprofileAPI/api/'
};

export const apiKeys = {
  digitalInvestment: '5fb5a00b-1f75-45ff-9490-ad02e0745ef0',
  moneyZip: '490512e6-cdee-4d4d-b2fb-07c79cedbad8',
  truprofile: 'fd5be1e7-3201-4a51-83fd-571ebf26bf6c'
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
