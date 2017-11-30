// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB9KlKIUgF8glrBAq3l07DpCUUHmL61ZnE',
    authDomain: 'caveo-41efd.firebaseapp.com',
    databaseURL: 'https://caveo-41efd.firebaseio.com',
    projectId: 'caveo-41efd',
    storageBucket: 'caveo-41efd.appspot.com',
    messagingSenderId: '1058079604439'
  },
  node: {
    //Dev//
    // url: 'http://localhost:5001/caveo-41efd/us-central1/'
    //Prod//
    url: 'https://us-central1-caveo-41efd.cloudfunctions.net/'
  }
};
