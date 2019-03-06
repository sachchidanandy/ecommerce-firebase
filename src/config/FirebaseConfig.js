import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import { FirebaseConfig } from './FirebaseConfigKey';

firebase.initializeApp(FirebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots : true });

export default firebase;