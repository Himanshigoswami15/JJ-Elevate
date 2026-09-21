import React from 'react';
import { cn } from '../../lib/utils';
import './arrow-fill-button.css';

/**
 * ArrowFillButton - Inspired by Hyperiux Vault & 21st.dev
 * 
 * Pill button with a border and circular arrow fill that smoothly expands
 * across the button on hover, transitioning colors and sliding the arrow icon.
 */
export function ArrowFillButton({
  btnText,
  children,
  className = "",
  variant = "pink", // 'pink' | 'pink-solid' | 'pink-outline' | 'dark' | 'dark-solid' | 'orange' | 'gold' | 'white' | 'outline'
  size = "md", // 'sm' | 'md' | 'lg'
  iconType = "right", // 'right' | 'diagonal'
  bgColor,
  textColor,
  borderColor,
  borderWidth,
  fillBgColor,
  fillTextColor,
  hoverFillBgColor,
  hoverFillTextColor,
  arrowColor,
  hoverArrowColor,
  as: asProp,
  style = {},
  ...props
}) {
  const label = btnText !== undefined ? btnText : (children !== undefined ? children : "Explore");
  const Component = asProp || (props.href ? "a" : "button");
  // Variant preset styling
  const variantStyles = {
    pink: {
      // Solid JJ Elevate Pink with White Circle and Pink Right Arrow (matching Image 2)
      bgColor: '#FF1E56',
      textColor: '#FFFFFF',
      borderColor: '#FF1E56',
      fillBgColor: '#FFFFFF',
      fillTextColor: '#FF1E56',
      hoverFillBgColor: '#FFFFFF',
      hoverFillTextColor: '#FF1E56',
      arrowColor: '#FF1E56',
      hoverArrowColor: '#FF1E56',
    },
    'pink-solid': {
      bgColor: '#FF1E56',
      textColor: '#FFFFFF',
      borderColor: '#FF1E56',
      fillBgColor: '#FFFFFF',
      fillTextColor: '#FF1E56',
      hoverFillBgColor: '#FFFFFF',
      hoverFillTextColor: '#FF1E56',
      arrowColor: '#FF1E56',
      hoverArrowColor: '#FF1E56',
    },
    'pink-outline': {
      bgColor: 'transparent',
      textColor: '#FF1E56',
      borderColor: '#FF1E56',
      fillBgColor: '#FF1E56',
      fillTextColor: '#FFFFFF',
      hoverFillBgColor: '#FF1E56',
      hoverFillTextColor: '#FFFFFF',
      arrowColor: '#FFFFFF',
      hoverArrowColor: '#FFFFFF',
    },
    dark: {
      bgColor: '#0B0C10',
      textColor: '#FFFFFF',
      borderColor: '#0B0C10',
      fillBgColor: '#FFFFFF',
      fillTextColor: '#0B0C10',
      hoverFillBgColor: '#FFFFFF',
      hoverFillTextColor: '#0B0C10',
      arrowColor: '#0B0C10',
      hoverArrowColor: '#0B0C10',
    },
    'dark-solid': {
      bgColor: '#0B0C10',
      textColor: '#FFFFFF',
      borderColor: '#0B0C10',
      fillBgColor: '#FF1E56',
      fillTextColor: '#FFFFFF',
      hoverFillBgColor: '#FF1E56',
      hoverFillTextColor: '#FFFFFF',
      arrowColor: '#FFFFFF',
      hoverArrowColor: '#FFFFFF',
    },
    orange: {
      // 21st.dev hyperiux preset matching Image 2
      bgColor: '#FF6B00',
      textColor: '#FFFFFF',
      borderColor: '#FF6B00',
      fillBgColor: '#FFFFFF',
      fillTextColor: '#FF6B00',
      hoverFillBgColor: '#FFFFFF',
      hoverFillTextColor: '#FF6B00',
      arrowColor: '#FF6B00',
      hoverArrowColor: '#FF6B00',
    },
    gold: {
      bgColor: '#FFDE00',
      textColor: '#0B0C10',
      borderColor: '#FFDE00',
      fillBgColor: '#FFFFFF',
      fillTextColor: '#0B0C10',
      hoverFillBgColor: '#FFFFFF',
      hoverFillTextColor: '#0B0C10',
      arrowColor: '#0B0C10',
      hoverArrowColor: '#0B0C10',
    },
    white: {
      bgColor: '#FFFFFF',
      textColor: '#0B0C10',
      borderColor: '#FFFFFF',
      fillBgColor: '#FF1E56',
      fillTextColor: '#FFFFFF',
      hoverFillBgColor: '#FF1E56',
      hoverFillTextColor: '#FFFFFF',
      arrowColor: '#FFFFFF',
      hoverArrowColor: '#FFFFFF',
    },
    outline: {
      bgColor: 'transparent',
      textColor: 'currentColor',
      borderColor: 'currentColor',
      fillBgColor: 'currentColor',
      fillTextColor: '#FFFFFF',
      hoverFillBgColor: 'currentColor',
      hoverFillTextColor: '#FFFFFF',
      arrowColor: '#FFFFFF',
      hoverArrowColor: '#FFFFFF',
    }
  };

  const currentVariant = variantStyles[variant] || variantStyles.pink;

  const resolvedBg = bgColor || currentVariant.bgColor;
  const resolvedText = textColor || currentVariant.textColor;
  const resolvedBorder = borderColor || currentVariant.borderColor;
  const resolvedFillBg = fillBgColor || currentVariant.fillBgColor;
  const resolvedFillText = fillTextColor || currentVariant.fillTextColor;
  const resolvedHoverFillBg = hoverFillBgColor || currentVariant.hoverFillBgColor;
  const resolvedHoverFillText = hoverFillTextColor || currentVariant.hoverFillTextColor;
  const resolvedArrow = arrowColor || currentVariant.arrowColor;
  const resolvedHoverArrow = hoverArrowColor || currentVariant.hoverArrowColor;

  const cssVariables = {
    '--btn-bg': resolvedBg,
    '--btn-text': resolvedText,
    '--btn-border': resolvedBorder,
    '--btn-border-width': borderWidth || '1.5px',
    '--btn-fill-bg': resolvedFillBg,
    '--btn-fill-text': resolvedFillText,
    '--btn-fill-bg-hover': resolvedHoverFillBg,
    '--btn-fill-text-hover': resolvedHoverFillText,
    '--btn-arrow': resolvedArrow,
    '--btn-arrow-hover': resolvedHoverArrow,
    ...style,
  };

  const sizeClass = `arrow-fill-btn--${size}`;

  return (
    <Component
      type={Component === "button" ? (props.type || "button") : undefined}
      className={cn("arrow-fill-btn", sizeClass, className)}
      style={cssVariables}
      {...props}
    >
      {/* Base resting text */}
      <span className="arrow-fill-btn__text">
        {label}
      </span>

      {/* Expanding circular overlay with mirrored label */}
      <div aria-hidden="true" className="arrow-fill-btn__circle">
        <span>{label}</span>
      </div>

      {/* Dedicated Arrow Icon Box sitting on top of the circle */}
      <div aria-hidden="true" className="arrow-fill-btn__icon-box">
        {iconType === 'diagonal' ? (
          // Exact ArrowUpRight icon matching Image 2 with smooth up-right diagonal translation on hover
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="arrow-fill-btn__icon arrow-fill-btn__icon--diagonal"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        ) : (
          // Horizontal right arrow
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="arrow-fill-btn__icon arrow-fill-btn__icon--right"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        )}
      </div>
    </Component>
  );
}

export default ArrowFillButton;
