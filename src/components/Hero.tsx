import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'; // Using framer-motion here for a bit more advanced intro animation

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
      className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 text-white section-padding pt-28 md:pt-40 lg:pt-52 pb-24 md:pb-32 lg:pb-40"
    >
      <div className="absolute inset-0 bg-pattern opacity-10"></div> {/* Placeholder for subtle pattern */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.img
          variants={itemVariants}
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=90"
          alt="Anandhan V portrait"
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90';
          }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-6"
        />
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4">
          Anandhan V
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl sm:text-2xl lg:text-3xl font-light mb-8">
          Fullstack Developer | Crafting Digital Experiences
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors shadow-lg min-h-[44px]"
          >
            Get in Touch
          </button>
          <button
            onClick={scrollToProjects}
            className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 transition-colors shadow-lg min-h-[44px]"
          >
            View My Work
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;