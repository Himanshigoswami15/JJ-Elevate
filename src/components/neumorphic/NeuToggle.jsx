import React from 'react';

/**
 * NeuToggle - Tactile Neumorphic Switch Primitive
 * 
 * Features:
 * - Carved pill track (`shadow-neu-inset-sm`)
 * - Extruded thumb puck (`shadow-neu-sm`)
 * - Smooth 300ms transition with physics-inspired easing
 * - WCAG accessible with keyboard interaction
 */
export const NeuToggle = ({
  checked,
  onChange,
  label,
  description,
  id,
  disabled = false,
  className = '',
}) => {
  const toggleId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <label
      htmlFor={toggleId}
      className={`inline-flex items-center gap-3.5 select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <input
        id={toggleId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />

      {/* Tactile Concave Pill Track */}
      <div
        className={`
          relative w-14 h-8 rounded-full bg-[#E0E5EC] shadow-neu-inset-sm
          transition-colors duration-300 ease-out shrink-0
          peer-focus-visible:ring-2 peer-focus-visible:ring-[#6C63FF] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#E0E5EC]
        `}
      >
        {/* Extruded Tactile Thumb */}
        <div
          className={`
            absolute top-1 left-1 w-6 h-6 rounded-full shadow-neu-sm
            transition-transform duration-300 ease-out flex items-center justify-center
            ${checked 
              ? 'translate-x-6 bg-[#6C63FF] text-white shadow-[2px_2px_6px_rgba(108,99,255,0.4)]' 
              : 'translate-x-0 bg-[#E0E5EC] text-[#6B7280]'
            }
          `}
        >
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${checked ? 'bg-white' : 'bg-[#6B7280]/40'}`} />
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-semibold text-[#3D4852] leading-tight font-display">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[#6B7280] mt-0.5 leading-normal font-body">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};

export default NeuToggle;
