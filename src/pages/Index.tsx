import React, { useCallback, useRef, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils'; // Assuming you have this utility

const Index: React.FC = () => {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const [activeSection, setActiveSection] = useState<string>('hero');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -70% 0px', // Adjust this to make sections active when they are more in the middle of the viewport
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const addSectionRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      sectionRefs.current[node.id] = node;
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 text-slate-700">
      <Navbar navLinks={navLinks} scrollTo={scrollTo} activeSection={activeSection} />

      <section id="hero" ref={addSectionRef}>
        <Hero scrollToContact={() => scrollTo('contact')} scrollToProjects={() => scrollTo('projects')} />
      </section>

      <section id="about" ref={addSectionRef} className="section-padding bg-white">
        <About />
      </section>

      <section id="skills" ref={addSectionRef} className="section-padding bg-indigo-50">
        <Skills />
      </section>

      <section id="experience" ref={addSectionRef} className="section-padding bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <Experience />
      </section>

      <section id="projects" ref={addSectionRef} className="section-padding bg-white">
        <Projects />
      </section>

      <section id="contact" ref={addSectionRef} className="section-padding bg-indigo-50">
        <Contact />
      </section>

      <Footer scrollTo={scrollTo} />
      <BackToTopButton scrollTo={() => scrollTo('hero')} />
    </div>
  );
};

export default Index;