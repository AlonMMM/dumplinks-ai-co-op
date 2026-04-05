import React from 'react';

interface TagProps {
  text: string;
  onClick?: () => void;
  isActive?: boolean;
  isStatic?: boolean;
}

export const Tag: React.FC<TagProps> = ({ text, onClick, isActive, isStatic = false }) => {
  const baseClasses = 'px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 border border-transparent';
  // Static tags (in card modal) -> Dark gray bg, light text
  const staticClasses = 'bg-gray-800 text-gray-300 border-white/10';
  // Interactive tags (if used for filtering later) -> Primary or Gray
  const interactiveClasses = `cursor-pointer ${isActive ? 'bg-primary-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'}`;

  return (
    <span
      className={`${baseClasses} ${isStatic ? staticClasses : interactiveClasses}`}
      onClick={!isStatic ? onClick : undefined}
    >
      #{text}
    </span>
  );
};