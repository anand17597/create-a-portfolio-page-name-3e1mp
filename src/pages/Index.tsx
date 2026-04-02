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
import { cn } from '@/lib/utils'; // Assuming you have this utility

const Index: React.FC = () => {
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
      window.scrollTo({
        top: element.offsetTop - navbarHeight,
        behavior: 'smooth',
      });
    }
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

  // Observer for active section highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px', // Adjust these values to control when a section becomes active
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

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

  const setSectionRef = useCallback((id: string) => (node: HTMLElement | null) => {
    sectionRefs.current[id] = node;
  }, []);

  const scrollToContact = useCallback(() => scrollTo('contact'), [scrollTo]);
  const scrollToProjects = useCallback(() => scrollTo('projects'), [scrollTo]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 text-slate-700 min-h-screen">
      <Navbar navLinks={navLinks} scrollTo={scrollTo} activeSection={activeSection} />

      <main>
        <div ref={setSectionRef('hero')}>
          <Hero scrollToContact={scrollToContact} scrollToProjects={scrollToProjects} />
        </div>
        <div ref={setSectionRef('about')} className="section-padding">
          <About />
        </div>
        <div ref={setSectionRef('skills')} className="section-padding bg-slate-100">
          <Skills />
        </div>
        <div ref={setSectionRef('experience')} className="section-padding">
          <Experience />
        </div>
        <div ref={setSectionRef('projects')} className="section-padding bg-slate-100">
          <Projects />
        </div>
        <div ref={setSectionRef('contact')} className="section-padding">
          <Contact />
        </div>
      </main>

      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Index;