import { lazy } from "react";
import React, { forwardRef, useCallback } from 'react';
import {ArrowRight} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce solution with product listings, shopping cart, user authentication, and payment integration. Built with Next.js, Node.js, and MongoDB.',
    image: 'https://images.unsplash.com/photo-1550439062-609e1d88a282?auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    link: '#',
  },
  {
    id: 2,
    title: 'Real-time Chat Application',
    description: 'A real-time chat application featuring direct messages, group chats, and online presence indicators. Built with React, Node.js, and Socket.IO.',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80',
    technologies: ['React.js', 'Node.js', 'Socket.IO', 'TypeScript'],
    link: '#',
  },
  {
    id: 3,
    title: 'Project Management Tool',
    description: 'A collaborative project management application with task assignment, progress tracking, and notification features. Built with PHP, Laravel, and MySQL.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4cd085?auto=format&fit=crop&w=800&q=80',
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
    link: '#',
  },
];

const Projects = forwardRef<HTMLDivElement, React.PropsWithChildren>(({}, ref) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="projects"
      ref={setRefs}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="section-padding bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-12">
          My Recent Projects
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-slate-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1507238691740-adfd8121b611?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="p-6 text-left">
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  onClick={(e) => e.preventDefault()}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center group-hover:underline"
                >
                  View Project
                  <ArrowRight className="ml-1" size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
});

Projects.displayName = 'Projects';

export default Projects;