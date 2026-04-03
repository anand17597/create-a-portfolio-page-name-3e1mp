import { lazy } from "react";
import React, { forwardRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {ExternalLink,Code2} from 'lucide-react'; // Code2 for GitHub link

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveLink: string;
  repoLink: string;
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'A full-featured online store with product listings, cart management, and secure payment integration.',
    image: 'https://images.unsplash.com/photo-1555952496-20f9f8b88500?auto=format&fit=crop&w=600&h=400&q=80',
    techStack: ['React', 'Node.js', 'Express', 'MySQL'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: 'project-2',
    title: 'Real-time Chat App',
    description: 'An instant messaging application with group chat, private messaging, and notification features.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&h=400&q=80',
    techStack: ['Node.js', 'Socket.IO', 'React', 'MongoDB'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: 'project-3',
    title: 'Task Management Dashboard',
    description: 'A comprehensive dashboard for managing tasks, projects, and team collaborations with intuitive UI.',
    image: 'https://images.unsplash.com/photo-1488590528527-9100ee3fd1fd?auto=format&fit=crop&w=600&h=400&q=80',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: 'project-4',
    title: 'Recipe Sharing Platform',
    description: 'A social platform for users to share, discover, and save recipes with rich media support.',
    image: 'https://images.unsplash.com/photo-1556910110-aadf17277735?auto=format&fit=crop&w=600&h=400&q=80',
    techStack: ['PHP', 'Laravel', 'Vue.js', 'MySQL'],
    liveLink: '#',
    repoLink: '#',
  },
];

const Projects = forwardRef<HTMLDivElement, React.PropsWithChildren>(({}, ref) => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      if (inViewRef) {
        if (typeof inViewRef === 'function') {
          inViewRef(node);
        } else {
          (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="projects"
      ref={setRefs}
      className="bg-slate-50 py-12 md:py-20 lg:py-28"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12" variants={itemVariants}>
          My Latest Projects
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              variants={itemVariants}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover object-center"
                loading="lazy"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90'; }}
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center">
                    Live Demo
                    <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700 text-sm inline-flex items-center">
                    <Code2 className="mr-1 w-4 h-4" />
                    Code
                  </a>
                </div>
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