// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:4000",
  firebase:{
    apiKey: "AIzaSyBAzVlRwotQRVhbXmp3siVh0Ku129fW9LY",
    authDomain: "cumc-inventory-c547a.firebaseapp.com",
    databaseURL: "https://cumc-inventory-c547a.firebaseio.com",
    projectId: "cumc-inventory-c547a",
    storageBucket: "",
    messagingSenderId: "444194207308"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
