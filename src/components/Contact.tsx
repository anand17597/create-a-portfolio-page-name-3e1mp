import { lazy } from "react";
import React, { forwardRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {Mail,Phone} from 'lucide-react';

const Contact = forwardRef<HTMLDivElement, React.PropsWithChildren>(({}, ref) => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      if (inViewRef) {
        if (typeof inViewRef === 'function') {
          inViewRef(node);
        } else {
          (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }
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

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="contact"
      ref={setRefs}
      className="bg-white py-12 md:py-20 lg:py-28"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" variants={itemVariants}>
          Get in Touch
        </motion.h2>
        <motion.p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto" variants={itemVariants}>
          I'm always open to new opportunities, collaborations, and exciting projects. Feel free to reach out!
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
          <motion.div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" variants={itemVariants}>
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Email Me</h3>
            <a href="mailto:anandhan@pepul.com" className="text-blue-600 hover:text-blue-800 text-lg font-medium">anandhan@pepul.com</a>
          </motion.div>

          <motion.div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" variants={itemVariants}>
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Call Me</h3>
            <a href="tel:+917010190110" className="text-blue-600 hover:text-blue-800 text-lg font-medium">+91 70101 90110</a>
          </motion.div>
        </div>

        <motion.div className="mt-16" variants={itemVariants}>
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
            alt="Contact illustration"
            className="rounded-lg shadow-xl max-w-lg mx-auto h-auto transform hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90'; }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
});

Contact.displayName = 'Contact';

export default Contact;