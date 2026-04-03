import React, { forwardRef, useCallback, useState } from 'react';
import {Mail,Phone,MapPin} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const Contact = forwardRef<HTMLDivElement, React.PropsWithChildren>(({}, ref) => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Merge the passed ref with the inViewRef
  const setRefs = useCallback(
    (node: HTMLDivElement) => {
      // Pass the node to the inViewRef
      if (inViewRef) {
        if (typeof inViewRef === 'function') {
          inViewRef(node);
        } else {
          (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }
      // Pass the node to the forwarded ref
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }
    },
    [inViewRef, ref]
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // In a real app, you'd send data to a backend here
      // e.g., console.log('Form submitted:', new FormData(e.currentTarget));
      e.currentTarget.reset(); // Clear form fields
    }, 1500);
  };

  return (
    <motion.section
      id="contact"
      ref={setRefs}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="section-padding bg-slate-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Let's Connect</h2>
          <p className="text-lg mb-8 text-slate-300">
            I'm always open to new opportunities, collaborations, and interesting projects. Feel free to reach out!
          </p>
          <div className="space-y-6">
            <div className="flex items-center">
              <Mail className="mr-4 text-indigo-400" size={28} />
              <a href="mailto:anandhan@pepul.com" className="text-xl text-white hover:text-indigo-400 transition-colors">anandhan@pepul.com</a>
            </div>
            <div className="flex items-center">
              <Phone className="mr-4 text-indigo-400" size={28} />
              <a href="tel:+917010190110" className="text-xl text-white hover:text-indigo-400 transition-colors">+91 7010190110</a>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-4 text-indigo-400" size={28} />
              <span className="text-xl text-white">Chennai, India</span>
            </div>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Send Me a Message</h3>
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate-700 text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-slate-700 text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Your message..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Sending...' : formStatus === 'success' ? 'Sent Successfully!' : 'Send Message'}
            </button>
            {formStatus === 'success' && (
              <p className="mt-4 text-center text-green-600">Your message has been sent!</p>
            )}
            {formStatus === 'error' && (
              <p className="mt-4 text-center text-red-600">Failed to send message. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
});

Contact.displayName = 'Contact';

export default Contact;