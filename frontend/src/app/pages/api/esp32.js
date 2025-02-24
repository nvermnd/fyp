// pages/api/esp32.js
import { firestore } from '../../firebaseAdmin'; // Adjust the path to your Firebase Admin initialization file

const cors = require('cors')({
  origin: true,
});

export default async function handler(req, res) {
  return cors(req, res, async () => {
    if (req.method === 'POST') {
      const { action, id, name, email, password } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'ID is required' });
      }

      const userRef = firestore.collection('users').doc(id);

      try {
        if (action === 'enroll') {
          // Check if the user already exists
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            return res.status(400).json({ message: 'ID is already used. Please choose a different ID.' });
          }

          // Enroll new user
          await userRef.set({
            name,
            email,
            password,
            checkType: 'check-in',
            lastCheck: new Date().toISOString()
          });

          return res.status(200).json({ message: 'Enrollment successful' });
        } else if (action === 'toggle') {
          const userDoc = await userRef.get();
          if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
          }

          const userData = userDoc.data();
          let newCheckType = 'check-in';
          if (userData.checkType === 'check-in') {
            newCheckType = 'check-out';
          }

          await userRef.update({
            checkType: newCheckType,
            lastCheck: new Date().toISOString()
          });

          return res.status(200).json({ message: `${newCheckType} successful for user ID ${id}` });
        } else if (action === 'addFingerprint') {
          const userDoc = await userRef.get();
          if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
          }

          // Add fingerprint ID to the user's record
          await userRef.update({
            fingerprintID: id // Or store fingerprint template if needed
          });

          return res.status(200).json({ message: `Fingerprint added for user ID ${id}` });
        } else {
          return res.status(400).json({ message: 'Invalid action' });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error updating user data', error });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  });
}
