
import firebase from 'firebase/app';

import fb from 'firebase';

import config from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


const db = fb.firestore();

export default db;