'use client';

import React, { useState } from 'react';
import Footer from '@/components/Footer';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    service: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  
    const response = await fetch('https://formspree.io/f/myzpnepd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        service: formData.service,
        notes: formData.notes,
      }),
    });
  
    if (response.ok) {
      setFormData({
        name: '',
        phone: '',
        address: '',
        service: '',
        notes: '',
      });
  
      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images.webp')" }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 w-full max-w-2xl bg-white bg-opacity-90 p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-2">Request a Free Quote</h1>
          <p className="text-center text-gray-700 mb-6">
            You'll get a personalized response within 24 hours. No spam, no subscriptions — just your quote.
          </p>

          {submitted && (
            <div className="bg-green-100 text-green-800 text-sm text-center p-4 rounded mb-4">
              Quote request submitted! We'll get back to you within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <input
              placeholder="Full Name"
              required
              className="w-full border border-gray-300 p-3 rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              placeholder="Phone Number"
              required
              className="w-full border border-gray-300 p-3 rounded"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              placeholder="Property Address"
              required
              className="w-full border border-gray-300 p-3 rounded"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <select
              required
              className="w-full border border-gray-300 p-3 rounded"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="">Select a service</option>
              <option value="Lawn Mowing">Lawn Mowing</option>
              <option value="Hardscaping">Hardscaping</option>
              <option value="Tree Service">Tree Service</option>
              <option value="Landscape Design and Installation">Landscape Design and Installation</option>
              <option value="Lawncare">Lawncare</option>
              <option value="Seasonal Cleanup">Seasonal Cleanup</option>
            </select>
            <textarea
              placeholder="Additional Notes (optional)"
              rows={3}
              className="w-full border border-gray-300 p-3 rounded"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-800 transition"
            >
              Submit Quote Request
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}