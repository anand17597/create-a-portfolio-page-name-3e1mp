import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "A full-featured online store with secure payment integration, user authentication, and product management.",
    imageUrl: "https://images.unsplash.com/photo-1579783902671-d28c310c1315?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Real-time Chat Application",
    description: "Built with Socket.IO, offering instant messaging, group chats, and notification features.",
    imageUrl: "https://images.unsplash.com/photo-1549692520-acc6669e2fde?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Project Management Dashboard",
    description: "An intuitive dashboard for task tracking, team collaboration, and progress visualization.",
    imageUrl: "https://images.unsplash.com/photo-1522204523234-87295a7833cd?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Blog Content Management System",
    description: "A robust CMS for creating, managing, and publishing blog posts with rich text editing capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1499914485622-a88fac536978?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Recipe Sharing Platform",
    description: "A community-driven platform for users to share, discover, and rate recipes with advanced search.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Task Automation Tool",
    description: "Developed a tool to automate repetitive tasks, improving efficiency and reducing manual effort.",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1600&q=90",
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
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
    >
      <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-12">
        My Recent Work
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            style={{ transitionDelay: `${index * 0.05}s` }}
          >
            <img
              src={project.imageUrl}
              alt={`Project: ${project.title}`}
              loading="lazy"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90';
              }}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{project.title}</h3>
              <p className="text-slate-600 text-sm">{project.description}</p>
              <a href="#contact" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium text-sm min-h-[44px] leading-[44px]">
                Learn More &rarr;
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;