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
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton'; // Added
import { cn } from '@/lib/utils'; // Assuming you have this utility

interface NavLink {
  label: string;
  id: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const Index: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const heroRef = useRef<HTMLSectionElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useRef<Record<string, React.RefObject<HTMLElement>>>({
    hero: heroRef,
    about: aboutRef,
    skills: skillsRef,
    experience: experienceRef,
    projects: projectsRef,
    contact: contactRef,
  });

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToContact = useCallback(() => scrollTo('contact'), [scrollTo]);
  const scrollToProjects = useCallback(() => scrollTo('projects'), [scrollTo]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px', // Adjust these values to control when a section becomes 'active'
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);


  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
      <Navbar navLinks={navLinks} scrollTo={scrollTo} activeSection={activeSection} />

      <Hero ref={heroRef} scrollToContact={scrollToContact} scrollToProjects={scrollToProjects} />
      <About ref={aboutRef} />
      <Skills ref={skillsRef} />
      <Experience ref={experienceRef} />
      <Projects ref={projectsRef} />
      <Contact ref={contactRef} />
      <Footer />
      <BackToTopButton scrollTo={scrollTo} />
      <FloatingWhatsAppButton phoneNumber="917010190110" />
    </div>
  );
};

export default Index;