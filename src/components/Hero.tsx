import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface HeroProps {
  scrollToContact: () => void;
  scrollToProjects: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToContact, scrollToProjects }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 min-h-screen flex items-center justify-center text-white py-20 md:py-0"
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&q=80"
          alt="Abstract code background"
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542831371-29b0f74f9d13?auto=format&fit=crop&w=1920&q=80';
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
          Hi, I'm Anandhan V
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl font-light mb-8 max-w-3xl mx-auto drop-shadow-md">
          A passionate Fullstack Developer with 7 years of experience building scalable and efficient web applications.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={scrollToProjects}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-indigo-700 bg-white hover:bg-indigo-50 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            View My Work
          </button>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-full shadow-lg text-white hover:bg-white hover:text-indigo-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;