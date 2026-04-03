import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {Briefcase,Building2,TrendingUp,Award,Clock} from 'lucide-react'; // Added Clock for hours coded

const Experience = forwardRef<HTMLDivElement, React.PropsWithChildren>(({}, ref) => {
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const experienceData = [
    {
      title: 'Senior Fullstack Developer',
      company: 'Pepul Tech Solutions',
      duration: 'Jan 2020 - Present',
      responsibilities: [
        'Led the development of a real-time chat application using Node.js, Express, and Socket.IO, enhancing user engagement by 30%.',
        'Architected and implemented scalable RESTful APIs for mobile and web clients, handling over 1 million daily requests.',
        'Optimized database queries and schemas in MySQL, resulting in a 40% reduction in response times for critical operations.',
        'Mentored junior developers and conducted code reviews, ensuring high code quality and adherence to best practices.',
      ],
    },
    {
      title: 'Fullstack Developer',
      company: 'Innovate Solutions Inc.',
      duration: 'Aug 2017 - Dec 2019',
      responsibilities: [
        'Developed and maintained several client-facing web applications using React.js, PHP, and MySQL.',
        'Implemented responsive designs and optimized frontend performance for various devices and browsers.',
        'Collaborated with product managers and designers to translate requirements into technical specifications.',
        'Contributed to the migration of legacy systems to modern tech stacks, improving maintainability and scalability.',
      ],
    },
  ];

  return (
    <motion.section
      id="experience"
      ref={setRefs}
      className="bg-white py-12 md:py-20 lg:py-28"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12" variants={itemVariants}>
          My Journey & Achievements
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center" variants={itemVariants}>
            <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
            <p className="text-4xl font-extrabold text-blue-700">
              <CountUp start={0} end={7} duration={2.5} enableScrollSpy scrollSpyOnce />
            </p>
            <p className="text-lg font-medium text-slate-600">Years Experience</p>
          </motion.div>
          <motion.div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center" variants={itemVariants}>
            <Building2 className="w-12 h-12 text-blue-600 mb-4" />
            <p className="text-4xl font-extrabold text-blue-700">
              <CountUp start={0} end={5} duration={2.5} enableScrollSpy scrollSpyOnce />
            </p>
            <p className="text-lg font-medium text-slate-600">Companies Worked</p>
          </motion.div>
          <motion.div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center" variants={itemVariants}>
            <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
            <p className="text-4xl font-extrabold text-blue-700">
              <CountUp start={0} end={20} duration={2.5} enableScrollSpy scrollSpyOnce />
            </p>
            <p className="text-lg font-medium text-slate-600">Projects Completed</p>
          </motion.div>
          <motion.div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center" variants={itemVariants}>
            <Clock className="w-12 h-12 text-blue-600 mb-4" />
            <p className="text-4xl font-extrabold text-blue-700">
              <CountUp start={0} end={10000} duration={2.5} enableScrollSpy scrollSpyOnce separator="," />
            </p>
            <p className="text-lg font-medium text-slate-600">Hours Coded</p>
          </motion.div>
        </motion.div>

        <div className="text-left">
          <motion.h3 className="text-2xl font-bold text-slate-800 mb-8" variants={itemVariants}>
            Work Experience
          </motion.h3>

          <div className="space-y-8">
            {experienceData.map((job, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-start bg-slate-100 p-6 rounded-lg shadow-md"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 mr-6 mb-4 md:mb-0">
                  <span className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full">
                    <Briefcase className="w-6 h-6" />
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-1">{job.title}</h4>
                  <p className="text-blue-600 font-medium mb-2">{job.company} <span className="text-slate-500 text-sm">({job.duration})</span></p>
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
});

Experience.displayName = 'Experience';

export default Experience;