import React, { useState, useEffect } from 'react';
import {ArrowUp} from 'lucide-react';
import { cn } from '@/lib/utils';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 z-50",
        isVisible ? "opacity-100 flex items-center justify-center" : "opacity-0 hidden"
      )}
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default BackToTopButton;