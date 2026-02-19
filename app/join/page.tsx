'use client';

import { useState } from 'react';
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

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is ${MAX_FILE_SIZE_MB}MB.`;
    }

    // Check file extension (more reliable than MIME type on mobile)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitStatus('idle');

    const formDataToSend = new FormData();
    formDataToSend.append('First Name', formData.firstName);
    formDataToSend.append('Last Name', formData.lastName);
    formDataToSend.append('Email', formData.email);
    formDataToSend.append('Phone', formData.phone);
    formDataToSend.append('Drivers License', formData.driversLicense);
    formDataToSend.append('Residence', formData.residence);
    formDataToSend.append('Availability', formData.availability);
    formDataToSend.append('Experience', formData.experience || 'Not provided');

    if (resumeFile) {
      // Validate again before sending
      const fileError = validateFile(resumeFile);
      if (fileError) {
        setErrorMessage(fileError);
        setIsSubmitting(false);
        return;
      }
      formDataToSend.append('Resume', resumeFile, resumeFile.name);
    }

    try {
      const res = await fetch('https://formspree.io/f/xkgzqppy', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          driversLicense: '',
          residence: '',
          availability: '',
          experience: '',
        });
        setResumeFile(null);
      } else {
        // Try to get error details from Formspree
        let detail = '';
        try {
          const errorData = await res.json();
          if (errorData.errors) {
            detail = errorData.errors.map((err: { message?: string }) => err.message).join('. ');
          }
        } catch {
          // Couldn't parse error response
        }

        // If file upload failed, suggest submitting without file
        if (resumeFile && (res.status === 413 || detail.toLowerCase().includes('file') || detail.toLowerCase().includes('upload'))) {
          setErrorMessage(`The file upload failed. Try submitting without the resume, or email it directly to brightonroadlandscaping@gmail.com`);
        } else {
          setErrorMessage(detail || 'Something went wrong. Please try again or call us at (484) 535-1936.');
        }
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
            </div>
          )}

          {submitStatus !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-5 sm:p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  placeholder="First Name"
                  required
                  className="border border-gray-300 p-3 rounded-lg w-full text-base"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <input
                  placeholder="Last Name"
                  required
                  className="border border-gray-300 p-3 rounded-lg w-full text-base"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
                className="border border-gray-300 w-full p-3 rounded-lg text-base"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <input
                type="tel"
                placeholder="Phone"
                required
                autoComplete="tel"
                className="border border-gray-300 w-full p-3 rounded-lg text-base"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <select
                required
                className="border border-gray-300 w-full p-3 rounded-lg text-base bg-white"
                value={formData.driversLicense}
                onChange={(e) => setFormData({ ...formData, driversLicense: e.target.value })}
              >
                <option value="">Do you have a valid Drivers License?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <input
                placeholder="Where is your primary residence?"
                required
                autoComplete="address-level2"
                className="border border-gray-300 w-full p-3 rounded-lg text-base"
                value={formData.residence}
                onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
              />

              <input
                placeholder="What's your availability?"
                required
                className="border border-gray-300 w-full p-3 rounded-lg text-base"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              />

              <textarea
                placeholder="Tell us about your related work experience (optional)"
                rows={4}
                className="border border-gray-300 w-full p-3 rounded-lg text-base"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Attach Resume (Optional)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="border border-gray-300 w-full p-3 rounded-lg text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500 mt-1">PDF or Word documents up to {MAX_FILE_SIZE_MB}MB</p>
                {resumeFile && (
                  <p className="text-sm text-green-600 mt-1">
                    Selected: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(1)}MB)
                  </p>
                )}
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg text-sm">
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
