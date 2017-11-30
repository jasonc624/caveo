const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions

/*https://firebase.google.com/docs/functions/write-firebase-functions*/

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!")
})

exports.fuckoff = functions.https.onRequest((request, response) => {
  response.send("Fuckooff firebase!")
})

const placesApiKey = 'AIzaSyAg5fbmKi4vfVuDQwOwU-sF1KjTFXfrQC8';
