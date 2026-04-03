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

  return (
    <motion.section
      id="about"
      ref={setRefs}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 md:py-20 lg:py-28 bg-white"
    >
      <motion.div variants={itemVariants} className="md:order-2">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">About Me</h2>
        <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-6">
          With 7 years of dedicated experience in fullstack web development, I thrive on crafting elegant solutions that bring ideas to life. My journey has equipped me with a strong foundation in both front-end and back-end technologies, allowing me to build comprehensive, high-performance applications from concept to deployment.
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-6">
          I specialize in creating dynamic, responsive, and user-friendly interfaces while ensuring robust, scalable, and secure server-side logic. I'm passionate about clean code, continuous learning, and contributing to impactful projects.
        </motion.p>
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center text-slate-700">
            <Mail className="mr-3 text-indigo-500" />
            <span>anandhan@pepul.com</span>
          </div>
          <div className="flex items-center text-slate-700">
            <Phone className="mr-3 text-indigo-500" />
            <span>+91 7010190110</span>
          </div>
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants} className="md:order-1">
        <img
          src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80"
          alt="Developer working on laptop"
          className="rounded-lg shadow-xl w-full h-auto object-cover max-h-[500px]"
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542362567-b07e5435526e?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </motion.div>
    </motion.section>
  );
});

About.displayName = 'About';

export default About;