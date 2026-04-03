import React, { useState, useEffect } from 'react';
import {ArrowUp} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackToTopButtonProps {
  scrollTo: (id: string) => void;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({ scrollTo }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 400) { // Show button after scrolling 400px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    scrollTo('hero'); // Assuming 'hero' is the ID of your top section
  };

  return (
    <button
      onClick={handleScrollToTop}
      className={cn(
        "fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40",
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default BackToTopButton;