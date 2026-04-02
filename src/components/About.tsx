import React from 'react';
import { Mail, Phone } from 'lucide-react';
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
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">About Me</h2>
        <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-4 leading-relaxed">
          With over 5 years of hands-on experience in fullstack development, I specialize in building robust and scalable web applications. My journey has equipped me with a deep understanding of both frontend and backend technologies, enabling me to deliver seamless digital experiences from conception to deployment.
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg text-slate-600 leading-relaxed">
          I am passionate about clean code, efficient solutions, and continuously learning new technologies to stay at the forefront of the industry. I thrive in dynamic environments where I can contribute to impactful projects and collaborate with talented teams.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8">
          <p className="text-md text-slate-600 flex items-center mb-2">
            <Mail className="mr-3 text-indigo-500" size={20} />
            <span className="font-medium">Email:</span> anandhan@pepul.com
          </p>
          <p className="text-md text-slate-600 flex items-center">
            <Phone className="mr-3 text-indigo-500" size={20} />
            <span className="font-medium">Phone:</span> +91 7010190110
          </p>
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants} className="md:order-first">
        <img
          src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1600&q=90"
          alt="Developer working on a laptop"
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90';
          }}
          className="rounded-lg shadow-xl w-full h-auto object-cover max-h-[500px]"
        />
      </motion.div>
    </motion.div>
  );
};

export default About;