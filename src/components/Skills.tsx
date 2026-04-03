import React, { forwardRef, useCallback } from 'react';
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
        staggerChildren: 0.05, // Stagger children for a nice fade-in effect
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="skills"
      ref={setRefs}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="section-padding bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-12">
          My Skills
        </motion.h2>
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center"
            >
              <skill.icon className="text-indigo-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-slate-700">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
});

Skills.displayName = 'Skills';

export default Skills;