
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  const baseClasses = "w-full text-center font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100";
  
  const variantClasses = {
    primary: 'bg-re-blue text-white hover:bg-opacity-90 focus:ring-re-blue',
    secondary: 'bg-re-gold text-re-blue hover:bg-opacity-90 focus:ring-re-gold',
    ghost: 'bg-transparent text-re-dark-gray hover:bg-gray-100'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  );
};
