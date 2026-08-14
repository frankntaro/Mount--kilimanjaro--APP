import React from 'react';
import { IMAGES } from '../images';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-16 h-16 md:w-20 md:h-20',
    lg: 'w-24 h-24 md:w-32 md:h-32',
    xl: 'w-36 h-36 md:w-48 md:h-48',
  };

  return (
    <div className={`flex items-center justify-center shrink-0 ${className}`}>
      <div className={`relative ${sizeClasses[size]} select-none transition-transform duration-300 hover:scale-105 overflow-hidden`}>
        <img src={IMAGES.logoSvg} alt="Vamos Kilimanjaro" className="w-full h-full object-contain drop-shadow-xs" />
      </div>
    </div>
  );
};
