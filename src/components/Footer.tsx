import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
      window.scrollTo({
        top: element.offsetTop - navbarHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-slate-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg mb-4">&copy; {year} Anandhan V. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="text-slate-400 hover:text-indigo-400 transition-colors">Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="text-slate-400 hover:text-indigo-400 transition-colors">About</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;