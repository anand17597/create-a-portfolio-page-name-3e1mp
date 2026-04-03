import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {Briefcase,Building2,TrendingUp,Award} from 'lucide-react'; // Added more icons

const companyNames = [
  "TechSolutions Inc.",
  "InnovateX Labs",
  "GlobalDev Corp.",
  "DigitalCraft Studios",
  "WebPioneers Co.",
  "Nexus Systems",
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
    <motion.section
      id="experience"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28 text-center"
    >
      <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-12">
        My Professional Journey
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
          <Briefcase className="text-indigo-600 mb-4" size={48} />
          <h3 className="text-5xl font-extrabold text-indigo-600 mb-2 counter-value">
            {inView && <CountUp end={7} duration={2.5} suffix="+" />}
          </h3>
          <p className="text-lg text-slate-600">Years of Experience</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
          <Building2 className="text-indigo-600 mb-4" size={48} />
          <h3 className="text-5xl font-extrabold text-indigo-600 mb-2 counter-value">
            {inView && <CountUp end={6} duration={2.5} />}
          </h3>
          <p className="text-lg text-slate-600">Companies Worked At</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
          <TrendingUp className="text-indigo-600 mb-4" size={48} />
          <h3 className="text-5xl font-extrabold text-indigo-600 mb-2 counter-value">
            {inView && <CountUp end={20} duration={2.5} suffix="+" />}
          </h3>
          <p className="text-lg text-slate-600">Projects Delivered</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
          <Award className="text-indigo-600 mb-4" size={48} />
          <h3 className="text-5xl font-extrabold text-indigo-600 mb-2 counter-value">
            {inView && <CountUp end={95} duration={2.5} suffix="%" />}
          </h3>
          <p className="text-lg text-slate-600">Client Satisfaction</p>
        </motion.div>
      </div>

      <motion.p variants={itemVariants} className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
        Throughout my career, I've had the privilege to contribute to various projects for companies like:
      </motion.p>
      <motion.div
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="flex flex-wrap justify-center gap-4 md:gap-6"
      >
        {companyNames.map((company, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block bg-indigo-100 text-indigo-800 text-sm md:text-base font-semibold px-4 py-2 rounded-full shadow-sm"
          >
            {company}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Experience;