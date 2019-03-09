const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Ecommerce Firebase!");
});

exports.addCartAndProductCollection = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
        return snap.ref.update({
            inCart : []
        }).then(() => snap.ref.collection('ordered').add({}))
        .catch(({message}) => console.log(message));
    });