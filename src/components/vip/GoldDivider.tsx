import React from 'react';

interface GoldDividerProps {
  className?: string;
  width?: string;
}

const GoldDivider: React.FC<GoldDividerProps> = ({ className = '', width = 'w-48' }) => {
  return (
    <div className={`gold-divider ${width} mx-auto my-6 ${className}`} />
  );
};

export default GoldDivider;
