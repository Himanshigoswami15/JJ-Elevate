/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        '3xl': '1600px'
      },
      colors: {
        // JJ Elevate Original Palette
        'jj-pink': '#FF1E56',
        'jj-pink-light': '#FF4D79',
        'jj-yellow': '#FFDE00',
        'jj-yellow-gold': '#FACC15',
        'jj-gold': '#FFDE00',
        'jj-bg': '#FAF9F7',
        'jj-cream': '#F5F3EF',
        'jj-offwhite': '#F7F5F2',
        'jj-warm-gray': '#EDE9E3',
        'jj-dark': '#0B0C10',
        'jj-dark-card': '#12131C',
        'jj-gray': '#64748B',

        // Neumorphism (Soft UI) Design System Tokens
        'neu-base': '#E0E5EC',
        'neu-text': '#3D4852',
        'neu-muted': '#6B7280',
        'neu-accent': '#6C63FF',
        'neu-accent-light': '#8B84FF',
        'neu-teal': '#38B2AC'
      },
      boxShadow: {
        // Dual Opposing RGBA Shadows
        'neu-flat': '9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5)',
        'neu-hover': '12px 12px 20px rgba(163, 177, 198, 0.7), -12px -12px 20px rgba(255, 255, 255, 0.6)',
        'neu-sm': '5px 5px 10px rgba(163, 177, 198, 0.6), -5px -5px 10px rgba(255, 255, 255, 0.5)',
        'neu-pressed': 'inset 6px 6px 10px rgba(163, 177, 198, 0.6), inset -6px -6px 10px rgba(255, 255, 255, 0.5)',
        'neu-deep': 'inset 10px 10px 20px rgba(163, 177, 198, 0.7), inset -10px -10px 20px rgba(255, 255, 255, 0.6)',
        'neu-inset-sm': 'inset 3px 3px 6px rgba(163, 177, 198, 0.6), inset -3px -3px 6px rgba(255, 255, 255, 0.5)',
        'neu-accent-pressed': 'inset 4px 4px 8px rgba(0, 0, 0, 0.25), inset -4px -4px 8px rgba(255, 255, 255, 0.2)',
      },
      borderRadius: {
        'neu-card': '32px',
        'neu-btn': '16px',
        'neu-inner': '12px',
      },
      fontFamily: {
        display: ['Oswald', 'Anton', 'Archivo Narrow', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        outfit: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        // Neumorphic System Fonts
        'neu-display': ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        'neu-body': ['DM Sans', 'Plus Jakarta Sans', 'sans-serif'],
      },
      lineHeight: {
        'tight-heading': '0.92'
      },
      letterSpacing: {
        'tight-heading': '-0.03em',
        'super-wide': '0.15em'
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'neu-float': 'neuFloat 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' }
        },
        neuFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
}
