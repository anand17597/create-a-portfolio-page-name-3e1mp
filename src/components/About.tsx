import React from 'react';
import {Mail,Phone} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="about"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 md:py-20 lg:py-28"
    >
      <motion.div variants={itemVariants} className="md:order-2">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">About Me</h2>
        <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-4 leading-relaxed">
          Hello! I'm Anandhan V, a dedicated Fullstack Developer with <span className="font-semibold text-indigo-600">7 years of experience</span> in crafting robust and user-friendly web applications. My journey in development has allowed me to work across the entire stack, from designing intuitive user interfaces to building powerful backend systems and managing databases.
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-4 leading-relaxed">
          I thrive on solving complex problems and am passionate about creating clean, efficient, and scalable code. Whether it's developing interactive frontends with React/Next.js or setting up performant APIs with Node.js/PHP and MySQL, I enjoy bringing ideas to life and continuously learning new technologies.
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-6 leading-relaxed">
          My goal is to deliver high-quality solutions that not only meet but exceed expectations, ensuring a seamless experience for both users and developers.
        </motion.p>
        <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-3">
          <Mail className="text-indigo-600" size={20} />
          <a href="mailto:anandhan@pepul.com" className="text-slate-700 hover:text-indigo-600 transition-colors">anandhan@pepul.com</a>
        </motion.div>
        <motion.div variants={itemVariants} className="flex items-center space-x-4">
          <Phone className="text-indigo-600" size={20} />
          <a href="tel:+917010190110" className="text-slate-700 hover:text-indigo-600 transition-colors">+91 7010190110</a>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="md:order-1 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600&h=600&q=80"
          alt="Anandhan V - Profile Picture"
          className="rounded-lg shadow-xl object-cover w-full max-w-sm md:max-w-md h-auto"
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&h=600&q=80';
          }}
        />
      </motion.div>
    </motion.section>
  );
};

export default About;