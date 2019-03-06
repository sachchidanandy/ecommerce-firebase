const admin  = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey/serviceAccountKey.json');
const defaultData = require('./defaultData.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

for (const key in defaultData) {
    defaultData[key].map(documemtData => {
        return db.collection(key).add({...documemtData})
        .then((docRef) => {
            console.log(`Document written in ${key} collection with ID: `, docRef.id);
        }).catch(error => {
            console.error("Error adding document: ", error);
        });
    });
}