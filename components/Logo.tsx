
import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="mx-auto mb-3 h-16 w-16 group" aria-label="PropTech Survey Logo">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Banana Roof */}
        <path
          className="origin-center transition-transform group-hover:animate-wiggle"
          d="M 30 100 C 50 50, 150 50, 170 100"
          stroke="#D4AF37" // re-gold
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
        />
        {/* House Base */}
        <path
          d="M 50 100 L 50 170 L 150 170 L 150 100 Z"
          fill="#0A2240" // re-blue
        />
        {/* Door */}
        <rect
          x="85"
          y="120"
          width="30"
          height="50"
          fill="#F3F4F6" // re-light-gray
        />
      </svg>
    </div>
  );
};