'use client';

import { useState } from 'react';

export default function JoinPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    residence: '',
    transportation: '',
    availability: '',
    experience: '',
    resume: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('First Name', formData.firstName);
    formDataToSend.append('Last Name', formData.lastName);
    formDataToSend.append('Email', formData.email);
    formDataToSend.append('Phone', formData.phone);
    formDataToSend.append('Position', formData.position);
    formDataToSend.append('Residence', formData.residence);
    formDataToSend.append('Availability', formData.availability);
    formDataToSend.append('Experience', formData.experience);
    if (formData.resume) {
      formDataToSend.append('Resume', formData.resume);
    }
  
    const res = await fetch('https://formspree.io/f/xkgzqppy', {
      method: 'POST',
      body: formDataToSend,
    });
  
    if (res.ok) {
      alert('Application Submitted! Thanks for applying to Brighton Road Landscaping. We will reach out within 24 hours.');
      window.location.reload();
    } else {
      alert('Something went wrong. Please try again.');
    }
  };
  

  return (

    <section
      className="relative min-h-screen bg-cover bg-center py-12 px-6 text-gray-900"
      style={{ backgroundImage: "url('/images.webp')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

      {/* Form Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Join Our Team</h1>
        <p className="text-center mb-8">
          We're always looking for hardworking, reliable team members to help us
          keep lawns looking their best. Fill out the form below to apply.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="First Name"
              required
              className="border p-3 rounded"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              placeholder="Last Name"
              required
              className="border p-3 rounded"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            required
            className="border w-full p-3 rounded"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            type="tel"
            placeholder="Phone"
            required
            className="border w-full p-3 rounded"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <select
            required
            className="border w-full p-3 rounded"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          >
            <option value="">Do you have a valid Drivers License?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <input
            placeholder="Where is your primary residence?"
            required
            className="border w-full p-3 rounded"
            value={formData.residence}
            onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
          />

  

          <input
            placeholder="What's your availability?"
            required
            className="border w-full p-3 rounded"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          />

          <textarea
            placeholder="Tell us about your related work experience (optional)"
            rows={4}
            className="border w-full p-3 rounded"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          />


<div className="mt-4 text-left">
  <label className="block text-gray-700 font-semibold mb-2">
    Attach Resume (Optional)
  </label>
  <input
    type="file"
    accept=".pdf,.doc,.docx"
    className="border w-full p-3 rounded"
    onChange={(e) =>
      setFormData({ ...formData, resume: e.target.files?.[0] || null })
    }
  />
</div>



          <button
            type="submit"
            className="bg-green-700 text-white font-bold px-6 py-3 rounded hover:bg-green-800"
          >
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}