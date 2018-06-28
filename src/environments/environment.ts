// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebase : {
    apiKey: 'AIzaSyDMWSY0ZSgdyQT-ZJJmHn9j5VJLwX7aTS0',
    authDomain: 'bolsatec-b5cc1.firebaseapp.com',
    databaseURL: 'https://bolsatec-b5cc1.firebaseio.com',
    projectId: 'bolsatec-b5cc1',
    storageBucket: 'bolsatec-b5cc1.appspot.com',
    messagingSenderId: '967094683489'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
