import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAjJFAFiDbOGWP_mRF0kzG6ohDzZ1jliVE",
  authDomain: "ronit-2bc1f.firebaseapp.com",
  projectId: "ronit-2bc1f",
  storageBucket: "ronit-2bc1f.firebasestorage.app",
  messagingSenderId: "514506676854",
  appId: "1:514506676854:web:b7e51ee234d02233b95d57"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

firestore.settings({
  ignoreUndefinedProperties: true,
});

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, firestore };
