import React from 'react';
import { Linkedin,Code2} from 'lucide-react';

interface FooterProps {
  scrollTo: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollTo }) => {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <button onClick={() => scrollTo('hero')} className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
            Anandhan V
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-sm text-slate-300">
          <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors min-h-[44px] leading-[44px] px-2">About</button>
          <button onClick={() => scrollTo('skills')} className="hover:text-white transition-colors min-h-[44px] leading-[44px] px-2">Skills</button>
          <button onClick={() => scrollTo('experience')} className="hover:text-white transition-colors min-h-[44px] leading-[44px] px-2">Experience</button>
          <button onClick={() => scrollTo('projects')} className="hover:text-white transition-colors min-h-[44px] leading-[44px] px-2">Projects</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors min-h-[44px] leading-[44px] px-2">Contact</button>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Linkedin size={24} />
          </a>
          <a href="#" aria-label="GitHub" className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Github size={24} />
          </a>
        </div>
        <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Anandhan V. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;