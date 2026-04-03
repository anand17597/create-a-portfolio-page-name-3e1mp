import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {Mail,Phone,MapPin} from 'lucide-react';

const Contact: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend.
    // For this static site, we'll just simulate success.
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000); // Reset success message after 5 seconds
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28"
    >
      <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 text-center mb-12">
        Get in Touch
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-slate-800 mb-6">Send Me a Message</h3>
          {isSubmitted ? (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Success!</p>
              <p>Your message has been sent. I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="your@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-slate-800 mb-6">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-center">
              <Mail className="text-indigo-600 mr-4 flex-shrink-0" size={24} />
              <div>
                <p className="text-slate-500 text-sm">Email me at</p>
                <a href="mailto:anandhan@pepul.com" className="text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">anandhan@pepul.com</a>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="text-indigo-600 mr-4 flex-shrink-0" size={24} />
              <div>
                <p className="text-slate-500 text-sm">Call me at</p>
                <a href="tel:+917010190110" className="text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors">+91 7010190110</a>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="text-indigo-600 mr-4 flex-shrink-0" size={24} />
              <div>
                <p className="text-slate-500 text-sm">Location</p>
                <p className="text-lg font-medium text-slate-700">Chennai, Tamil Nadu, India</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <img
              src="https://images.unsplash.com/photo-1596558450268-ad29864d783b?auto=format&fit=crop&w=600&h=400&q=80"
              alt="Contact office"
              className="rounded-lg w-full h-auto object-cover shadow-sm"
              loading="lazy"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1587560440307-e83783856b3e?auto=format&fit=crop&w=600&h=400&q=80';
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;