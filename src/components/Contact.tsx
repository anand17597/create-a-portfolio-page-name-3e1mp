import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Form data:', formData);
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' }); // Clear form
      setTimeout(() => setIsSubmitted(false), 5000); // Hide success message after 5 seconds
    }, 1500);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
    >
      <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-12">
        Get in Touch
      </motion.h2>
      <motion.div variants={itemVariants} className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-lg shadow-xl">
        <p className="text-lg text-slate-600 mb-8">Have a project in mind or just want to chat? Feel free to reach out!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 min-h-[44px]"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 min-h-[44px]"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 min-h-[44px]"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg min-h-[44px]",
              isSubmitting && "opacity-70 cursor-not-allowed"
            )}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {isSubmitted && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
              Thank you for your message! I'll get back to you soon.
            </div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;