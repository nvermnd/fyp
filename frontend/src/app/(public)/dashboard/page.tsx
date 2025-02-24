"use client";

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAjJFAFiDbOGWP_mRF0kzG6ohDzZ1jliVE",
  authDomain: "ronit-2bc1f.firebaseapp.com",
  projectId: "ronit-2bc1f",
  storageBucket: "ronit-2bc1f.firebasestorage.app",
  messagingSenderId: "514506676854",
  appId: "1:514506676854:web:b7e51ee234d02233b95d57",
  databaseURL: "https://ronit-2bc1f-default-rtdb.asia-southeast1.firebasedatabase.app"
};

let database;

const DashboardPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    const auth = getAuth(app);

    // Example sign-in process
    signInWithEmailAndPassword(auth, 'user@example.com', 'password')
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User signed in:', user);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error signing in:', error);
      });
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Sidebar</h2>
        </div>
        <nav className="flex-1 p-6">
          <ul>
            <li className="mb-6">
              <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
            </li>
            <li className="mb-6">
              <a href="/profile" className="hover:text-gray-300">Profile</a>
            </li>
            <li>
              <a href="/user" className="hover:text-gray-300">User</a>
            </li>
          </ul>
        </nav>
        <div className="p-6 mt-auto">
          <a href="/logout" className="hover:text-gray-300">Log Out</a>
        </div>
      </aside>
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
          <p className="text-lg text-center">Welcome to your dashboard!</p>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
