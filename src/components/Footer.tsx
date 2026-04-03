import React from 'react';
import {Code2,Link} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-bold text-indigo-400 mb-3">Anandhan V</h3>
          <p className="text-slate-400 text-sm">Fullstack Developer</p>
          <p className="text-slate-400 text-sm mt-1">Crafting seamless web experiences.</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">About</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Skills</a></li>
            <li><a href="#experience" onClick={(e) => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Experience</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Projects</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Contact</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
          <div className="flex space-x-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="GitHub Profile">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="LinkedIn Profile">
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-slate-400 text-sm mt-6">&copy; {new Date().getFullYear()} Anandhan V. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;