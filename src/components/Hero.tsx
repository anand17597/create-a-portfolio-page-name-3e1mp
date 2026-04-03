import { lazy } from "react";
import React, { forwardRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {ArrowRight,Code2} from 'lucide-react'; // Added Code2 for projects button

interface HeroProps {
  scrollToContact: () => void;
  scrollToProjects: () => void;
}

const Hero = forwardRef<HTMLSectionElement, HeroProps>(({ scrollToContact, scrollToProjects }, ref) => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Merge the passed ref with the inViewRef
  const setRefs = useCallback(
    (node: HTMLSectionElement | null) => {
      // Pass the node to the inViewRef
      if (inViewRef) {
        if (typeof inViewRef === 'function') {
          inViewRef(node);
        } else {
          (inViewRef as React.MutableRefObject<HTMLSectionElement | null>).current = node;
        }
      }
      // Pass the node to the forwarded ref
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as React.MutableRefObject<HTMLSectionElement | null>).current = node;
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
      id="hero"
      ref={setRefs}
      className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-28 lg:py-36"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
        <div className="max-w-xl">
          <motion.h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-4" variants={itemVariants}>
            Hi, I'm <span className="text-blue-600">Anandhan V</span>
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-slate-600 mb-8" variants={itemVariants}>
            A passionate <span className="font-semibold text-blue-600">Fullstack Developer</span> with 7+ years of experience building robust and scalable web applications.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4" variants={itemVariants}>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Hire Me
              <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
            </button>
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-base font-medium rounded-full text-blue-600 bg-transparent hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              My Projects
              <Code2 className="ml-2 -mr-1 w-5 h-5" />
            </button>
          </motion.div>
        </div>
        <motion.div className="mt-12 md:mt-0 md:ml-12" variants={itemVariants}>
          <img
            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80"
            alt="Developer working on a laptop"
            className="rounded-lg shadow-2xl max-w-full h-auto mx-auto md:max-w-md lg:max-w-lg transform hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90'; }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
});

Hero.displayName = 'Hero';

export default Hero;