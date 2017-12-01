const functions = require('firebase-functions');
const https = require('https');
// // Create and Deploy Your First Cloud Functions

/*https://firebase.google.com/docs/functions/write-firebase-functions*/

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const api = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const placesApiKey = 'AIzaSyAbNq1iFLnZLkUZU5WFGRb-PXR_s9Ssjyo';
admin.initializeApp(functions.config().firebase);
// Add headers

exports.places = functions.https.onRequest((request, response) => {
  // response.header('Content-Type','application/json');
  response.header('Access-Control-Allow-Origin', '*');
  // response.header('Access-Control-Allow-Headers', 'Content-Type');
  const url = api + '?query=' + request.query.address + '&key=' + placesApiKey;
  let body = '';
  https.get(url, res => {
    res.on("data", chunk => {
      body += chunk;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      response.send(body);
    });
  });
});


