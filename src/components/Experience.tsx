import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const companyNames = [
  "TechSolutions Inc.",
  "InnovateX Labs",
  "GlobalDev Corp.",
  "DigitalCraft Studios",
];

const Experience: React.FC = () => {
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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
    >
      <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12">
        My Journey So Far
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="p-8 bg-white/10 rounded-lg shadow-md">
          <p className="text-5xl lg:text-6xl font-extrabold text-white mb-4">
            {inView ? <CountUp end={5} duration={2.5} suffix="+" /> : "0"}
          </p>
          <p className="text-xl font-medium text-indigo-100">Years Experience</p>
        </motion.div>
        <motion.div variants={itemVariants} className="p-8 bg-white/10 rounded-lg shadow-md">
          <p className="text-5xl lg:text-6xl font-extrabold text-white mb-4">
            {inView ? <CountUp end={15} duration={2.5} /> : "0"}
          </p>
          <p className="text-xl font-medium text-indigo-100">Projects Completed</p>
        </motion.div>
        <motion.div variants={itemVariants} className="p-8 bg-white/10 rounded-lg shadow-md">
          <p className="text-5xl lg:text-6xl font-extrabold text-white mb-4">
            {inView ? <CountUp end={3} duration={2.5} suffix="+" /> : "0"}
          </p>
          <p className="text-xl font-medium text-indigo-100">Companies Contributed</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mt-16">
        <h3 className="text-2xl font-semibold mb-6">Where I've Contributed</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {companyNames.map((company, index) => (
            <motion.div
              key={company}
              variants={itemVariants}
              className="p-4 bg-white/10 rounded-lg flex items-center justify-center text-lg font-medium shadow-sm"
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              {company}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Experience;