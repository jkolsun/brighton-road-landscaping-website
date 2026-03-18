'use client';

import { useState, useRef } from 'react';
import Footer from '@/components/Footer';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export default function JoinPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    driversLicense: '',
    residence: '',
    availability: '',
    experience: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [resumeNote, setResumeNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is ${MAX_FILE_SIZE_MB}MB.`;
    }

    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
    if (!hasValidExtension) {
      return 'Please upload a PDF or Word document (.pdf, .doc, .docx).';
    }

    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setErrorMessage('');

    if (file) {
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
        e.target.value = '';
        setResumeFile(null);
        return;
      }
    }

    setResumeFile(file);
  };

  const resetForm = () => {
    setFormData({
      firstName: '', lastName: '', email: '', phone: '',
      driversLicense: '', residence: '', availability: '', experience: '',
    });
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Basic phone validation - at least 7 digits
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitStatus('idle');
    setResumeNote('');

    const buildFormData = (includeFile: boolean) => {
      const fd = new FormData();
      fd.append('First Name', formData.firstName);
      fd.append('Last Name', formData.lastName);
      fd.append('Email', formData.email);
      fd.append('Phone', formData.phone);
      fd.append('Drivers License', formData.driversLicense);
      fd.append('Residence', formData.residence);
      fd.append('Availability', formData.availability);
      fd.append('Experience', formData.experience || 'Not provided');
      if (includeFile && resumeFile) {
        fd.append('Resume', resumeFile, resumeFile.name);
      } else if (resumeFile) {
        fd.append('Resume Note', `Applicant attached "${resumeFile.name}" but file upload was not supported. They were asked to email it directly.`);
      }
      return fd;
    };

    try {
      // First attempt: try with file if one was attached
      let res = await fetch('https://formspree.io/f/xkgzqppy', {
        method: 'POST',
        body: buildFormData(!!resumeFile),
        headers: { 'Accept': 'application/json' }
      });

      // If failed with file, auto-retry WITHOUT the file
      if (!res.ok && resumeFile) {
        res = await fetch('https://formspree.io/f/xkgzqppy', {
          method: 'POST',
          body: buildFormData(false),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          setSubmitStatus('success');
          setResumeNote(`Your application was submitted! However, the resume couldn't be attached. Please email "${resumeFile.name}" to brightonroadlandscaping@gmail.com`);
          resetForm();
          setIsSubmitting(false);
          return;
        }
      }

      if (res.ok) {
        setSubmitStatus('success');
        setResumeNote('');
        resetForm();
      } else {
        setErrorMessage('Something went wrong. Please try again or call us at (484) 535-1936.');
        setSubmitStatus('error');
      }
    } catch {
      setErrorMessage('Network error - please check your connection and try again, or call us at (484) 535-1936.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        className="relative min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 text-gray-900"
        style={{ backgroundImage: "url('/images.webp')" }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">Join Our Team</h1>
          <p className="text-center mb-8 px-2">
            We&apos;re always looking for hardworking, reliable team members to help us
            keep lawns looking their best. Fill out the form below to apply.
          </p>

          {submitStatus === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-800 text-center p-4 rounded-lg mb-6">
              <p className="font-bold text-lg">Application Submitted!</p>
              <p className="mt-1">Thanks for applying to Brighton Road Landscaping. We&apos;ll reach out within 24 hours.</p>
              {resumeNote && (
                <p className="mt-3 text-sm bg-yellow-50 border border-yellow-300 text-yellow-800 p-3 rounded-lg">
                  {resumeNote}
                </p>
              )}
            </div>
          )}

          {submitStatus !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-5 sm:p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    placeholder="First Name"
                    required
                    autoComplete="given-name"
                    className="border border-gray-300 p-3 rounded-lg w-full text-base"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    placeholder="Last Name"
                    required
                    autoComplete="family-name"
                    className="border border-gray-300 p-3 rounded-lg w-full text-base"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="border border-gray-300 w-full p-3 rounded-lg text-base"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  required
                  autoComplete="tel"
                  className="border border-gray-300 w-full p-3 rounded-lg text-base"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="driversLicense" className="block text-sm font-medium text-gray-700 mb-1">
                  Driver&apos;s License <span className="text-red-500">*</span>
                </label>
                <select
                  id="driversLicense"
                  required
                  className="border border-gray-300 w-full p-3 rounded-lg text-base bg-white"
                  value={formData.driversLicense}
                  onChange={(e) => setFormData({ ...formData, driversLicense: e.target.value })}
                >
                  <option value="">Do you have a valid Driver&apos;s License?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label htmlFor="residence" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Residence <span className="text-red-500">*</span>
                </label>
                <input
                  id="residence"
                  placeholder="City, State"
                  required
                  autoComplete="address-level2"
                  className="border border-gray-300 w-full p-3 rounded-lg text-base"
                  value={formData.residence}
                  onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability <span className="text-red-500">*</span>
                </label>
                <input
                  id="availability"
                  placeholder="e.g. Weekdays, Weekends, Full-time"
                  required
                  className="border border-gray-300 w-full p-3 rounded-lg text-base"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Experience <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="experience"
                  placeholder="Tell us about your related work experience"
                  rows={4}
                  className="border border-gray-300 w-full p-3 rounded-lg text-base"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                  Resume <span className="text-gray-400 font-normal">(optional - PDF or Word)</span>
                </label>
                <input
                  id="resume"
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 file:cursor-pointer cursor-pointer border border-gray-300 rounded-lg"
                />
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg text-sm" role="alert">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-green-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
