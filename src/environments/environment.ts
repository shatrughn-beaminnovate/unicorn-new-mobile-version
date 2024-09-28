// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//  Unicorn Production Server URL Configuration
// export const environment = {
//   production: false,
//   apiUrl: 'https://fe01.beamcommerce.in',
//   imgUrl: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn',
//   cartUrl: 'https://payments.unicornstore.in',
//   paymentApiUrl: 'https://payments.unicornstore.in/public/api/v1/transactions',
//   isCheckoutUrlStatic: false,
//   customerIdAllowed: true,
//   customerId: 'unicorn',
//   useHash: false,
// };


//  Staging Server URL Configuration with Live BICS Checkout URL Configuration
// export const environment = {
//   production: false,
//   apiUrl: 'https://fe01.staging.beamcommerce.in',
//   imgUrl: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn',
//   cartUrl: 'https://payments.unicornstore.in',
//   paymentApiUrl: 'https://payments.unicornstore.in/public/api/v1/transactions',
//   // paymentApiUrl: 'http://192.168.1.164:8000/public/api/v1/transactions',
//   isCheckoutUrlStatic: false,
//   customerIdAllowed: true,
//   customerId: 'unicorn',
//   useHash: false,
// };


//  Staging Front + Staging Payment Server URL Configuration
export const environment = {
  production: false,
  apiUrl: 'https://fe01.staging.beamcommerce.in',
  imgUrl: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn',
  cartUrl: 'http://payments.beamcommerce.in',
  paymentApiUrl: 'http://payments.beamcommerce.in/public/api/v1/transactions',
  isCheckoutUrlStatic: false,
  customerIdAllowed: true,
  customerId: 'unicorn',
  useHash: false,
};


// Staging Server With Hrutik PC BICS Checkout URL Configuration
// export const environment = {
//   production: false,
//   apiUrl: 'https://fe01.staging.beamcommerce.in',
//   imgUrl: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn',
//   cartUrl: 'http://192.168.1.91:8000',
//   paymentApiUrl: 'http://192.168.1.91:8000/public/api/v1/transactions',
//   isCheckoutUrlStatic: false,
//   customerIdAllowed: true,
//   customerId: 'unicorn',
//   useHash: false,
// };


// Live Server With Hrutik PC BICS Checkout URL Configuration
// export const environment = {
//   production: false,
//   apiUrl: 'https://fe01.beamcommerce.in',
//   imgUrl: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn',
//   cartUrl: 'http://192.168.1.91:8000',
//   paymentApiUrl: 'http://192.168.1.91:8000/public/api/v1/transactions',
//   isCheckoutUrlStatic: true,
//   customerIdAllowed: true,
//   customerId: 'unicorn',
//   useHash: true,
// };

// Office Server URL Configuration
// export const environment = {
//   production: false,
//   apiUrl: 'http://mum01.beaminnovate.com/bics_front',
//   imgUrl: 'http://mum01.beaminnovate.com/beam_commerce_v1/public',
//   cartUrl: 'http://mum01.beaminnovate.com:9021',
//   paymentApiUrl: 'http://mum01.beaminnovate.com:9021/public/api/v1/transactions',
//   isCheckoutUrlStatic: true,
//   customerIdAllowed: true,
//   customerId: 'unicorn',
//   useHash: true,
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
