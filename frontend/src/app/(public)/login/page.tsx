"use client";

import React, { useState } from 'react';
import { auth, database } from '../firebaseConfig'; 
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userRef = database.ref('users/' + user.uid);
      userRef.once('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          console.log('Login successful:', userData);
        } else {
          const newUser = {
            email: user.email,
            createdAt: new Date().toISOString(),
          };
          userRef.set(newUser);
          console.log('New user data created:', newUser);
        }
        // Save access token to local storage
        user.getIdToken().then((token) => {
          localStorage.setItem('accessToken', token);
          router.push('/dashboard'); // Redirect to dashboard
        });
      });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
