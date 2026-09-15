import React from 'react';

/**
 * NeuInput - Deep Concave Neumorphic Input Field
 * 
 * Features:
 * - 16px rounded corners (`rounded-2xl`)
 * - Deep inset carved well (`shadow-neu-deep`)
 * - Monochromatic surface `#E0E5EC`
 * - Focus state with `#6C63FF` ring offset by 2px with background color
 * - WCAG AAA compliant text `#3D4852`
 */
export const NeuInput = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  icon: Icon,
  error,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold text-[#6B7280] uppercase tracking-wider pl-1 select-none font-display"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 pointer-events-none text-[#6B7280]">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full min-h-[48px] rounded-2xl bg-[#E0E5EC] text-[#3D4852] font-semibold
            ${Icon ? 'pl-12 pr-4' : 'px-5'} py-3 text-sm
            shadow-neu-deep border-none outline-none
            placeholder:text-[#6B7280]/60 font-body
            transition-all duration-300 ease-out
            focus:ring-2 focus:ring-[#6C63FF] focus:ring-offset-2 focus:ring-offset-[#E0E5EC]
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <span className="text-xs text-[#FF4D79] font-medium pl-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default NeuInput;
