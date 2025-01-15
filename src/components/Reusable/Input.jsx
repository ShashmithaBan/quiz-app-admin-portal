import React from 'react';

const Input = ({ type, value, onChange, placeholder, required = false, className = '' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
    />
  );
};

export default Input;