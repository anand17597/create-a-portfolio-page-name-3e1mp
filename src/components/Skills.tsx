import React from 'react';
import {Code2,FileCode,Database,Server,Atom,ArrowRightLeft,GitBranch,MessageSquare,LayoutDashboard,Cloud,Palette,ShieldCheck} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: React.ElementType;
}

const skills: Skill[] = [
  { name: 'HTML & CSS', icon: Code2 },
  { name: 'JavaScript (ES6+)', icon: FileCode },
  { name: 'React.js', icon: Atom }, // Using Atom for React.js
  { name: 'Next.js', icon: ArrowRightLeft },
  { name: 'Node.js', icon: Server },
  { name: 'PHP', icon: GitBranch },
  { name: 'MySQL', icon: Database },
  { name: 'Socket.IO', icon: MessageSquare },
  { name: 'TypeScript', icon: Code2 }, // Reusing Code2 for TypeScript
  { name: 'Tailwind CSS', icon: Palette },
  { name: 'RESTful APIs', icon: LayoutDashboard }, // Using LayoutDashboard for API concepts
  { name: 'Git & GitHub', icon: GitBranch }, // Reusing GitBranch for Git
  { name: 'Cloud Deployment', icon: Cloud },
  { name: 'Security Best Practices', icon: ShieldCheck },
];

const Skills: React.FC = () => {
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
      id="skills"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28 text-center"
    >
      <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-12">
        My Skills & Expertise
      </motion.h2>

      <motion.div
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <skill.icon className="text-indigo-600 mb-3" size={36} />
            <p className="text-lg font-medium text-slate-800">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Skills;