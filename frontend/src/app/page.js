import Image from "next/image";
import { FaFingerprint, FaShieldAlt, FaMobileAlt } from "react-icons/fa";
import { MdSecurity, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="flex items-center space-x-3">
            <FaFingerprint className="text-4xl text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Smart Recognition</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-blue-50 to-white">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4 text-center max-w-4xl">
            IOT based Smart Recognition using Biometric (Fingerprints)
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl text-center">
            Secure and reliable biometric recognition system for modern applications.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold">
            Get Started
          </button>
        </div>

        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <FaFingerprint className="text-5xl text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">Biometric Authentication</h3>
                <p className="text-gray-700">Secure fingerprint recognition for reliable access control.</p>
              </div>
              <div className="p-8 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <FaShieldAlt className="text-5xl text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">Enhanced Security</h3>
                <p className="text-gray-700">Advanced encryption and security protocols.</p>
              </div>
              <div className="p-8 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <FaMobileAlt className="text-5xl text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">IoT Integration</h3>
                <p className="text-gray-700">Seamless integration with IoT devices and systems.</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1663789669038-ba180c8c155a?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="About Us"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
              <p className="text-xl text-gray-700 mb-4">
                Welcome to Smart Recognition, your trusted partner in biometric security solutions. Our cutting-edge technology ensures the highest level of security for modern applications, using reliable biometric authentication methods.
              </p>
              <p className="text-xl text-gray-700">
                Our team of experts is dedicated to providing advanced security solutions, seamless IoT integration, and top-notch customer support. Join us in embracing the future of secure biometric recognition and stay ahead in the ever-evolving tech landscape.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-900 py-20 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center bg-gray-800 p-6 rounded-lg">
                <MdEmail className="text-3xl text-blue-400 mr-3" />
                <p className="text-lg">contact@smartrecognition.com</p>
              </div>
              <div className="flex items-center justify-center bg-gray-800 p-6 rounded-lg">
                <MdPhone className="text-3xl text-blue-400 mr-3" />
                <p className="text-lg">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center justify-center bg-gray-800 p-6 rounded-lg">
                <MdLocationOn className="text-3xl text-blue-400 mr-3" />
                <p className="text-lg">123 Tech Street, Silicon Valley</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">&copy; 2023 Smart Recognition. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}