import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import { FirebaseConfig } from './FirebaseConfigKey';

firebase.initializeApp(FirebaseConfig);

export const firestore = firebase.firestore();
export const firebaseAuth = firebase.auth();

export default firebase;