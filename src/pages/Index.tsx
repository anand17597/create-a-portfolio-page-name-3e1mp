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
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Get navbar height dynamically
      const navbar = document.getElementById('navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      window.scrollTo({
        top: element.offsetTop - navbarHeight + 1, // +1 to ensure it's slightly below navbar
        behavior: 'smooth',
      });
    }
  }, []);

  const [activeSection, setActiveSection] = useState<string>('hero');
  const sectionRefs = useRef<Record<string, HTMLDivElement | HTMLSectionElement | null>>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50% 0px', // Adjust this margin if sections are too short or tall
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    navLinks.forEach((link) => {
      const ref = sectionRefs.current[link.id];
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      // Disconnect observer on component unmount
      navLinks.forEach((link) => {
        const ref = sectionRefs.current[link.id];
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [navLinks]);

  const scrollToContact = useCallback(() => scrollTo('contact'), [scrollTo]);
  const scrollToProjects = useCallback(() => scrollTo('projects'), [scrollTo]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navLinks={navLinks} scrollTo={scrollTo} activeSection={activeSection} />
      <main className="flex-grow">
        <Hero
          ref={(el) => (sectionRefs.current['hero'] = el)}
          scrollToContact={scrollToContact}
          scrollToProjects={scrollToProjects}
        />
        <About ref={(el) => (sectionRefs.current['about'] = el)} />
        <Skills ref={(el) => (sectionRefs.current['skills'] = el)} />
        <Experience ref={(el) => (sectionRefs.current['experience'] = el)} />
        <Projects ref={(el) => (sectionRefs.current['projects'] = el)} />
        <Contact ref={(el) => (sectionRefs.current['contact'] = el)} />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Index;