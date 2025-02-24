// firebaseAdmin.js
import * as admin from 'firebase-admin';
import serviceAccount from './path/to/your/serviceAccountKey.json'; // Ensure you have the service account key file

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-database-name.firebaseio.com"
  });
}

const firestore = admin.firestore();

export { admin, firestore };
