"use client";

import React, { useState } from 'react';
import { auth, database } from '../firebaseConfig';
import Link from 'next/link';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const generateUserId = () => {
    return Math.floor(Math.random() * 127) + 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = generateUserId();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await database.ref('users/' + userId).set({
        name,
        email,
        password
      });
      console.log('Signup successful:', { name, email, userId });
      setNotification('Signup successful!');
      setName('');
      setEmail('');
      setPassword('');
      window.location.reload();
    } catch (error) {
      console.error('Error signing up:', error);
      setNotification('Error signing up. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
        {notification && <div className="mb-4 text-center text-red-500">{notification}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">Already have an account?</p>
          <Link href="/login" legacyBehavior>
            <a className="text-blue-500 hover:underline">Log in</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
