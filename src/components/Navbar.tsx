import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
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
      className={cn(
        "fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md transition-all duration-300",
        isScrolled ? "shadow-lg" : "shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavLinkClick('hero'); }} className="text-2xl font-bold text-indigo-600">
          Anandhan V
        </a>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavLinkClick(link.id)}
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === link.id
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-600 hover:text-indigo-600"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
        <button
          className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-white/95 backdrop-blur-md py-4 shadow-lg border-t border-slate-100",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavLinkClick(link.id)}
              className={cn(
                "text-base font-medium transition-colors p-2 rounded-md",
                activeSection === link.id
                  ? "text-indigo-600 font-semibold bg-slate-50"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
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