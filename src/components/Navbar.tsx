import React, { useState, useEffect, useRef } from 'react';
import {Menu,X} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
  label: string;
  id: string;
}

interface NavbarProps {
  navLinks: NavLink[];
  scrollTo: (id: string) => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ navLinks, scrollTo, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (id: string) => {
    scrollTo(id);
    setIsMenuOpen(false); // Close mobile menu on click
  };

  return (
    <nav
      ref={navRef}
      id="navbar"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 py-4 md:py-6",
        isScrolled ? "bg-slate-950 shadow-lg" : "bg-slate-900/80 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleNavLinkClick('hero')} className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
          Anandhan V
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(link.id);
              }}
              className={cn(
                "text-white hover:text-indigo-400 transition-colors font-medium",
                activeSection === link.id && "text-indigo-400 border-b-2 border-indigo-400 pb-1"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-slate-900 shadow-lg py-4 transition-all duration-300 ease-in-out",
          isMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(link.id);
              }}
              className={cn(
                "text-white text-lg hover:text-indigo-400 transition-colors font-medium py-2",
                activeSection === link.id && "text-indigo-400"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;