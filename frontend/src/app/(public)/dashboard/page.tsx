"use client";

import React from 'react';

const DashboardPage = () => {
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
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
