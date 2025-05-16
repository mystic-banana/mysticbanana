/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        accent: 'rgb(var(--color-accent))',
        highlight: 'rgb(var(--color-highlight))',
        background: 'rgb(var(--color-background))',
        surface: 'rgb(var(--color-surface))',
        error: 'rgb(var(--color-error))',
        success: 'rgb(var(--color-success))',
        warning: 'rgb(var(--color-warning))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'cosmic-pattern': "url('/src/assets/cosmic-pattern.png')",
        'stars': "url('/src/assets/stars.png')",
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.accent), 0 0 20px theme(colors.accent)',
      },
    },
  },
  plugins: [],
};