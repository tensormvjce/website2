import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/email';

const JoinClub = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    year: '',
    linkedinProfile: '',
    githubProfile: '',
    programmingLanguages: '',
    whyJoin: '',
    projectIdeas: '',
    expectations: '',
    commitment: '',
    reference: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(emailConfig.publicKey);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        emailConfig.serviceId,
        emailConfig.templateId,
        form.current!,
        emailConfig.publicKey
      );
      
      setSubmitStatus('success');
      // Clear form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        branch: '',
        year: '',
        linkedinProfile: '',
        githubProfile: '',
        programmingLanguages: '',
        whyJoin: '',
        projectIdeas: '',
        expectations: '',
        commitment: '',
        reference: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-20">
      <div className="noise" />
      <div className="grid-background fixed inset-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 glitch" data-text="Join Our Club">
              Join Our Club
            </h1>
            <p className="text-gray-400 terminal-text">
              Be part of our innovative community and shape the future of AI
            </p>
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-center"
            >
              <p className="text-green-400">
                Thank you for your application! We'll get back to you soon.
              </p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-center"
            >
              <p className="text-red-400">
                There was an error submitting your application. Please try again.
              </p>
            </motion.div>
          )}

          <form ref={form} onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">College/University *</label>
                  <input
                    type="text"
                    name="college"
                    required
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Branch/Major *</label>
                  <input
                    type="text"
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Year of Study *</label>
                  <select
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Links Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Professional Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">GitHub Profile</label>
                  <input
                    type="url"
                    name="githubProfile"
                    value={formData.githubProfile}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Technical Background Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Technical Background</h2>
              
              <div>
                <label className="block text-gray-300 mb-2">Programming Languages & Technologies *</label>
                <textarea
                  name="programmingLanguages"
                  required
                  value={formData.programmingLanguages}
                  onChange={handleChange}
                  placeholder="List the programming languages and technologies you're familiar with"
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors h-24"
                />
              </div>
            </div>

            {/* Club Interest Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Club Interest</h2>
              
              <div>
                <label className="block text-gray-300 mb-2">Why do you want to join our club? *</label>
                <textarea
                  name="whyJoin"
                  required
                  value={formData.whyJoin}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors h-32"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Do you have any project ideas you'd like to work on? *</label>
                <textarea
                  name="projectIdeas"
                  required
                  value={formData.projectIdeas}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors h-32"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">What are your expectations from the club? *</label>
                <textarea
                  name="expectations"
                  required
                  value={formData.expectations}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors h-32"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">How much time can you commit to club activities per week? *</label>
                <select
                  name="commitment"
                  required
                  value={formData.commitment}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                >
                  <option value="">Select Time Commitment</option>
                  <option value="1-3">1-3 hours</option>
                  <option value="4-6">4-6 hours</option>
                  <option value="7-10">7-10 hours</option>
                  <option value="10+">More than 10 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">How did you hear about us?</label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold shadow-lg shadow-purple-500/20 transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinClub;
