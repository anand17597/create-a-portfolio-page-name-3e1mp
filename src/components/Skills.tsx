import React from 'react';
import { Code2, FileCode, Database, Server, ReactIcon, ArrowRightLeft, GitBranch, MessageSquare } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: React.ElementType;
}

const skills: Skill[] = [
  { name: 'HTML & CSS', icon: Code2 },
  { name: 'JavaScript', icon: FileCode },
  { name: 'MySQL', icon: Database },
  { name: 'Node.js', icon: Server },
  { name: 'React.js', icon: ReactIcon },
  { name: 'Next.js', icon: ArrowRightLeft }, // Using ArrowRightLeft for Next.js as a concept of routing/flow
  { name: 'PHP', icon: GitBranch },
  { name: 'Socket.IO', icon: MessageSquare },
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
        My Skills
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <Icon className="text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-slate-700">{skill.name}</h3>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Skills;