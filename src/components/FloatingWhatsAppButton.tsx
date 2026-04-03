import React from 'react';
import {MessageCircle} from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  phoneNumber: string; // e.g., "917010190110"
  message?: string; // Optional default message
}

const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneNumber,
  message = "Hello, I'd like to know more about your services.",
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-20 md:right-6 md:bottom-20 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default FloatingWhatsAppButton;