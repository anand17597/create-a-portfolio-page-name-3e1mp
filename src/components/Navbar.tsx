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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 shadow-lg backdrop-blur-sm h-14" : "bg-transparent h-16"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Logo */}
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavLinkClick('hero'); }} className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors">
          Anandhan V
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavLinkClick(link.id)}
              className={cn(
                "relative text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full",
                activeSection === link.id ? "text-blue-600 after:w-full" : "text-slate-700 hover:text-blue-600"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-white/95 backdrop-blur-sm shadow-lg py-4 absolute top-full left-0 right-0 z-40 transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavLinkClick(link.id)}
              className={cn(
                "text-base py-2 w-full text-center transition-colors",
                activeSection === link.id ? "text-blue-600 font-bold" : "text-slate-700 hover:text-blue-600 font-medium"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;