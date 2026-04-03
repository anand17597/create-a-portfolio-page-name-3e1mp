import { lazy } from "react";
import React, { forwardRef, useCallback } from 'react';
import {Mail,Phone} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const About = forwardRef<HTMLDivElement, React.PropsWithChildren>(({}, ref) => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Merge the passed ref with the inViewRef
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
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
      id="about"
      ref={setRefs}
      className="bg-white py-12 md:py-20 lg:py-28"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <motion.div className="lg:w-1/2" variants={itemVariants}>
          <img
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
            alt="Anandhan V professional portrait"
            className="rounded-lg shadow-xl w-full h-auto max-w-md lg:max-w-full mx-auto transform hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90'; }}
          />
        </motion.div>
        <motion.div className="lg:w-1/2 text-center lg:text-left" variants={itemVariants}>
          <motion.h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" variants={itemVariants}>
            About Me
          </motion.h2>
          <motion.p className="text-lg text-slate-600 mb-6 leading-relaxed" variants={itemVariants}>
            Hello! I'm Anandhan V, a dedicated Fullstack Developer with 7 years of hands-on experience in crafting dynamic and high-performance web applications. I thrive on bringing innovative ideas to life, from conceptualization to deployment, ensuring a seamless user experience and robust backend functionality.
          </motion.p>
          <motion.p className="text-lg text-slate-600 mb-6 leading-relaxed" variants={itemVariants}>
            My expertise spans across modern frontend frameworks like React.js and Next.js, complemented by strong backend skills in Node.js and PHP, coupled with database management using MySQL. I am passionate about clean code, scalable architectures, and continuously learning new technologies to deliver cutting-edge solutions.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8" variants={itemVariants}>
            <a href="mailto:anandhan@pepul.com" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md">
              <Mail className="w-5 h-5 mr-2" />
              Email Me
            </a>
            <a href="tel:+917010190110" className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-full text-blue-600 hover:bg-blue-50 transition-colors duration-300 shadow-md">
              <Phone className="w-5 h-5 mr-2" />
              Call Me
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
});

About.displayName = 'About';

export default About;