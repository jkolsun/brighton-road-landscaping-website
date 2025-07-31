'use client';

import { Mail, Phone, MessageSquare } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12 text-green-800">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
        {/* Phone */}
        <div className="bg-white shadow-md p-6 flex flex-col items-center text-center rounded">
          <Phone className="text-green-700 mb-2" size={28} />
          <h2 className="font-semibold mb-1">Call us:</h2>
          <p>(484) 535-1936</p>
        </div>

        {/* Email */}
        <div className="bg-white shadow-md p-6 flex flex-col items-center text-center rounded">
          <Mail className="text-green-700 mb-2" size={28} />
          <h2 className="font-semibold mb-1">Email:</h2>
          <p>brightonroadlandscaping@gmail.com</p>
        </div>

        {/* Question Box */}
        <div className="bg-white shadow-md p-6 flex flex-col items-center text-center rounded">
          <MessageSquare className="text-green-700 mb-2" size={28} />
          <h2 className="font-semibold mb-2">Got a question?</h2>
          <input
            type="text"
            placeholder="What's your question?"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-10">
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-green-800 hover:text-green-600 transition-transform duration-300 hover:scale-110"
        >
          <FaLinkedinIn size={32} />
        </a>
        <a
          href="https://www.facebook.com/BrightonRoadLandscaping"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-green-800 hover:text-green-600 transition-transform duration-300 hover:scale-110"
        >
          <FaFacebookF size={32} />
        </a>
      </div>
    </section>
  );
}


