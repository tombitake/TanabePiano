import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Teal is now the PRIMARY brand color (inspired by concert program)
        primary: {
          DEFAULT: '#4AADAD',
          light: '#C5E8E8',
          dark: '#2D8A8A',
        },
        teal: {
          DEFAULT: '#74C0BC',
          light: '#E0F5F3',
          dark: '#3E9090',
        },
        // Mustard/gold accent (botanical illustration)
        mustard: {
          DEFAULT: '#C9A840',
          light: '#F3E6A8',
          dark: '#9E8030',
        },
        // Pink as secondary accent
        rose: {
          DEFAULT: '#E8739A',
          light: '#FDE8F0',
          dark: '#C25A80',
        },
        cream: '#F5EDD8',
        'warm-bg': '#EDE0C4',
        'dark-text': '#1E2D2D',
        'muted-text': '#5A7272',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Noto Serif JP', 'serif'],
        sans: ['Noto Sans JP', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-teal': 'linear-gradient(160deg, #3E9090 0%, #4AADAD 40%, #74C0BC 100%)',
        'gradient-cream': 'linear-gradient(135deg, #F5EDD8 0%, #EDE0C4 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'float-delay2': 'float 6s ease-in-out 4s infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'peek': 'peek 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        peek: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
