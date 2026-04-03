import { lazy } from "react";
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {Briefcase,Building2,TrendingUp,Award} from 'lucide-react';

const Experience = forwardRef<HTMLDivElement, React.PropsWithChildren>(({}, ref) => {
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

  const stats = [
    { id: 1, label: 'Years Experience', value: 7, icon: Briefcase },
    { id: 2, label: 'Companies Worked', value: 5, icon: Building2 },
    { id: 3, label: 'Projects Completed', value: 30, icon: TrendingUp },
    { id: 4, label: 'Client Satisfaction (%)', value: 100, icon: Award },
  ];

  const experiences = [
    {
      title: 'Senior Fullstack Developer',
      company: 'TechSolutions Inc.',
      location: 'New York, USA',
      duration: 'Jan 2021 - Present',
      description: [
        'Led the development of scalable web applications using React, Node.js, and MySQL.',
        'Implemented robust RESTful APIs and integrated real-time features with Socket.IO.',
        'Mentored junior developers and conducted code reviews to ensure high code quality.',
      ],
    },
    {
      title: 'Fullstack Developer',
      company: 'InnovateX Labs',
      location: 'Bangalore, India',
      duration: 'Jul 2018 - Dec 2020',
      description: [
        'Developed and maintained client-side applications with React and Next.js.',
        'Designed and managed database schemas for various projects.',
        'Collaborated with cross-functional teams to define, design, and ship new features.',
      ],
    },
  ];

  return (
    <motion.section
      id="experience"
      ref={setRefs}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="section-padding bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0c766d19?auto=format&fit=crop&w=1600&q=90"
          alt="Team working in office"
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=90';
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12">
          My Journey & Achievements
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="bg-white/10 p-8 rounded-lg shadow-xl flex flex-col items-center justify-center"
            >
              <stat.icon className="text-indigo-300 mb-4" size={48} />
              <p className="text-5xl font-extrabold mb-2">
                {inView ? <CountUp end={stat.value} duration={2.5} suffix={stat.label.includes('%') ? '%' : ''} /> : '0'}
              </p>
              <h3 className="text-xl font-semibold text-indigo-100">{stat.label}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-left">
          <h3 className="text-2xl font-bold mb-6 text-indigo-100">Professional Background</h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 p-6 rounded-lg shadow-md hover:bg-white/20 transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h4 className="text-xl font-semibold">{exp.title}</h4>
                  <span className="text-indigo-200 text-sm">{exp.duration}</span>
                </div>
                <p className="text-indigo-100 mb-2">{exp.company} - {exp.location}</p>
                <ul className="list-disc list-inside text-indigo-50 space-y-1">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});

Experience.displayName = 'Experience';

export default Experience;