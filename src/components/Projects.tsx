import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {ExternalLink,Code2} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with user authentication, product catalog, shopping cart, and order processing.",
    image: "https://images.unsplash.com/photo-1483985988355-f77ceebad86e?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Node.js", "Express", "MySQL", "Stripe (UI-only)"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 2,
    title: "Real-time Chat Application",
    description: "A real-time chat application featuring direct messaging, group chats, and online status using Socket.IO.",
    image: "https://images.unsplash.com/photo-1611606131379-37326847844a?auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "Socket.IO", "Node.js", "MongoDB (UI-only)"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 3,
    title: "Task Management Dashboard",
    description: "An intuitive dashboard for managing tasks, projects, and team collaboration with drag-and-drop functionality.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca8849d1?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "TypeScript", "Tailwind CSS", "PHP", "MySQL"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 4,
    title: "Portfolio Website Template",
    description: "A modern, responsive portfolio template built for developers and designers to showcase their work.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2f092d2b7?auto=format&fit=crop&w=800&q=80",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 5,
    title: "Blog Content Management",
    description: "A custom CMS for creating, publishing, and managing blog posts with rich text editing capabilities.",
    image: "https://images.unsplash.com/photo-1504711432028-ee69c95405a2?auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "GraphQL (UI-only)", "PostgreSQL (UI-only)"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 6,
    title: "Recipe Sharing App",
    description: "A community-driven platform for users to share, discover, and save their favorite recipes.",
    image: "https://images.unsplash.com/photo-1543339308-edfe198f196c?auto=format&fit=crop&w=800&q=80",
    technologies: ["React Native (UI-only)", "Firebase (UI-only)"],
    liveLink: "#",
    githubLink: "#",
  },
];

const Projects: React.FC = () => {
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
      id="projects"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28 text-center"
    >
      <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-12">
        My Latest Projects
      </motion.h2>

      <motion.div
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80`;
                }}
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{project.title}</h3>
              <p className="text-slate-600 text-base mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-start gap-4 mt-auto">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.preventDefault()} // Keep as UI-only
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors group"
                  >
                    Live Demo
                    <ExternalLink className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.preventDefault()} // Keep as UI-only
                    className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium transition-colors group"
                  >
                    GitHub
                    <Github className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Projects;