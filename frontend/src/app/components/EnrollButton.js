import React from 'react';
import { captureFingerprint } from '../utils/fingerprintSensor';
import { firestore } from '../utils/firebase';

const EnrollButton = ({ userId }) => {
  const handleEnroll = async () => {
    try {
      const fingerprintData = await captureFingerprint();
      await firestore.collection('users').doc(userId).update({
        fingerprint: fingerprintData
      });
      alert('Fingerprint enrolled successfully!');
    } catch (error) {
      console.error('Error enrolling fingerprint:', error);
      alert('Failed to enroll fingerprint.');
    }
  };

  return (
    <button onClick={handleEnroll}>
      Enroll Fingerprint
    </button>
  );
};

export default EnrollButton;
