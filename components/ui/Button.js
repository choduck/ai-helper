import React from 'react';

const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  outline: 'bg-white border border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-800'
};

const sizes = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-md',
  lg: 'py-3 px-6 text-lg'
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''}
        font-medium rounded-lg focus:outline-none transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;