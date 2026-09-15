import React from 'react';

/**
 * NeuIconWell - Carved Concave Well for Icons & Avatars
 * 
 * Features:
 * - Concave inset depth (`shadow-neu-deep` or `shadow-neu-pressed`)
 * - Creates "drilled into card" sensation
 * - Monochromatic `#E0E5EC` surface
 */
export const NeuIconWell = ({
  children,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  shape = 'rounded-2xl', // 'rounded-2xl' | 'rounded-full' | 'rounded-xl'
  depth = 'deep', // 'deep' | 'standard' | 'subtle'
  className = '',
  accent = false,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const depthShadows = {
    deep: 'shadow-neu-deep',
    standard: 'shadow-neu-pressed',
    subtle: 'shadow-neu-inset-sm',
  };

  return (
    <div
      className={`
        shrink-0 flex items-center justify-center bg-[#E0E5EC]
        transition-all duration-300 ease-out
        ${shape}
        ${sizeStyles[size] || sizeStyles.md}
        ${depthShadows[depth] || depthShadows.deep}
        ${accent ? 'text-[#6C63FF]' : 'text-[#3D4852]'}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default NeuIconWell;
