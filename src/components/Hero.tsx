import { lazy, useCallback } from "react";
import React, { forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

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
    (node: HTMLSectionElement) => {
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="hero"
      ref={setRefs}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 min-h-screen flex items-center justify-center text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=90"
          alt="Abstract tech background"
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90';
          }}
        />
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
          Hi, I'm Anandhan V
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl mb-8 font-light">
          A passionate Fullstack Developer with 7+ years of experience building robust and scalable web applications.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={scrollToContact}
            className="bg-white text-indigo-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-100 transition-transform transform hover:scale-105 shadow-lg"
          >
            Get in Touch
          </button>
          <button
            onClick={scrollToProjects}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            View My Work
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
});

Hero.displayName = 'Hero';

export default Hero;