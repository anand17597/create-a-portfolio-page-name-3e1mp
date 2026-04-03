import React, { forwardRef, useCallback } from 'react';
import {Code2,FileCode,Database,Server,Atom,ArrowRightLeft,GitBranch,MessageSquare,LayoutDashboard,Cloud,Palette} from 'lucide-react'; // Removed ShieldCheck, added Cloud
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: React.ElementType;
}

const skills: Skill[] = [
  { name: 'HTML & CSS', icon: Code2 },
  { name: 'JavaScript (ES6+)', icon: FileCode },
  { name: 'React.js', icon: Atom },
  { name: 'Next.js', icon: ArrowRightLeft },
  { name: 'Node.js', icon: Server },
  { name: 'PHP', icon: GitBranch }, // Using GitBranch for PHP as a placeholder for backend tech
  { name: 'MySQL', icon: Database },
  { name: 'Socket.IO', icon: MessageSquare },
  { name: 'TypeScript', icon: Code2 },
  { name: 'Tailwind CSS', icon: Palette },
  { name: 'RESTful APIs', icon: LayoutDashboard },
  { name: 'Git & GitHub', icon: GitBranch },
];

const Skills = forwardRef<HTMLDivElement, React.PropsWithChildren>(({}, ref) => {
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
        staggerChildren: 0.05, // Stagger children for a nice reveal effect
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="skills"
      ref={setRefs}
      className="bg-slate-50 py-12 md:py-20 lg:py-28"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12" variants={itemVariants}>
          My Skills
        </motion.h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center text-center"
              variants={itemVariants}
            >
              <skill.icon className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-slate-800">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
});

Skills.displayName = 'Skills';

export default Skills;