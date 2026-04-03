import React from 'react';
import {Link,Code2,Mail} from 'lucide-react'; // Code2 for GitHub

interface NavLink {
  label: string;
  id: string;
}

const navLinks: NavLink[] = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="text-3xl font-extrabold text-blue-400 hover:text-blue-300 transition-colors">
            Anandhan V
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="hover:text-blue-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://www.linkedin.com/in/anandhanv" // Placeholder LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-blue-400 transition-colors"
            aria-label="LinkedIn profile"
          >
            <Link className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/anandhanv" // Placeholder GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-blue-400 transition-colors"
            aria-label="GitHub profile"
          >
            <Code2 className="w-6 h-6" />
          </a>
          <a
            href="mailto:anandhan@pepul.com"
            className="text-slate-300 hover:text-blue-400 transition-colors"
            aria-label="Email Anandhan V"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <p className="text-sm text-slate-400">&copy; {currentYear} Anandhan V. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;