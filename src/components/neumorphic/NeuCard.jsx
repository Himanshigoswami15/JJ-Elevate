import React from 'react';

/**
 * NeuCard - Tactile Neumorphic Container Primitive
 * 
 * Features:
 * - 32px hyper-rounded corners (`rounded-[32px]`)
 * - Monochromatic `#E0E5EC` surface molded from background
 * - Dual opposing RGBA shadows (top-left pure white light, bottom-right cool clay shadow)
 * - Subtle lift on hover with smooth 300ms ease-out transitions
 * - Zero borders (shadows define all edges)
 */
export const NeuCard = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  as: Component = 'div',
  inset = false,
  ...props
}) => {
  const baseShadow = inset ? 'shadow-neu-pressed' : 'shadow-neu-flat';
  const hoverClasses = hoverEffect && !inset
    ? 'hover:-translate-y-1 hover:shadow-neu-hover active:translate-y-0.5 active:shadow-neu-pressed cursor-pointer'
    : '';

  return (
    <Component
      onClick={onClick}
      className={`
        bg-[#E0E5EC] text-[#3D4852] rounded-[32px]
        transition-all duration-300 ease-out
        ${baseShadow}
        ${hoverClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default NeuCard;
