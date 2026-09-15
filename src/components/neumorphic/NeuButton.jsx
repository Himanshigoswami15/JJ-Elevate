import React from 'react';

/**
 * NeuButton - Tactile Neumorphic Button Primitive
 * 
 * Features:
 * - 16px rounded corners (`rounded-2xl`)
 * - Touch-friendly target (min 48px height)
 * - Physical tactile displacement: -1px lift on hover, +0.5px press on active
 * - Dual opposing RGBA shadows switching to inset pressed state on click
 * - Accessible WCAG focus ring with 2px offset
 */
export const NeuButton = ({
  children,
  onClick,
  variant = 'clay', // 'clay' | 'primary' | 'teal' | 'inset'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  disabled = false,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const sizeStyles = {
    sm: 'h-10 px-4 text-xs font-semibold tracking-wide',
    md: 'min-h-[48px] px-6 py-3 text-sm font-bold tracking-normal',
    lg: 'min-h-[54px] px-8 py-4 text-base font-extrabold tracking-tight',
  };

  const variantStyles = {
    clay: 'bg-[#E0E5EC] text-[#3D4852] shadow-neu-flat hover:shadow-neu-hover active:shadow-neu-pressed hover:-translate-y-0.5 active:translate-y-0.5',
    primary: 'bg-[#6C63FF] text-white shadow-[9px_9px_16px_rgba(108,99,255,0.45),-9px_-9px_16px_rgba(255,255,255,0.7)] hover:bg-[#8B84FF] hover:shadow-[12px_12px_20px_rgba(108,99,255,0.55),-12px_-12px_20px_rgba(255,255,255,0.8)] active:shadow-neu-accent-pressed hover:-translate-y-0.5 active:translate-y-0.5',
    teal: 'bg-[#38B2AC] text-white shadow-[9px_9px_16px_rgba(56,178,172,0.45),-9px_-9px_16px_rgba(255,255,255,0.7)] hover:brightness-105 active:shadow-neu-accent-pressed hover:-translate-y-0.5 active:translate-y-0.5',
    inset: 'bg-[#E0E5EC] text-[#6C63FF] shadow-neu-pressed',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center gap-2.5 rounded-2xl
        font-display transition-all duration-300 ease-out select-none cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E0E5EC]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.clay}
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />}
    </button>
  );
};

export default NeuButton;
