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
        // ─── New Feminine Palette ───────────────────────
        // #F28379 coral/salmon  → primary brand colour
        primary: {
          DEFAULT: '#F28379',
          light: '#FDF0EF',
          dark: '#D96B61',
        },
        // #A68F86 muted mauve   → replaces teal as the mid-tone
        teal: {
          DEFAULT: '#A68F86',
          light: '#EDE5E2',
          dark: '#7D6960',
        },
        // #F2CA80 warm amber    → replaces mustard
        mustard: {
          DEFAULT: '#F2CA80',
          light: '#FDF5E4',
          dark: '#D4A845',
        },
        // #D9C7C1 dusty rose    → blush accent / section bg
        blush: {
          DEFAULT: '#D9C7C1',
          light: '#F5EFED',
          dark: '#B8A09A',
        },
        // kept for occasional use
        rose: {
          DEFAULT: '#E8739A',
          light: '#FDE8F0',
          dark: '#C25A80',
        },
        // ─── Base neutrals ──────────────────────────────
        cream: '#F2E7C4',     // #F2E7C4 warm cream  → main bg
        'warm-bg': '#D9C7C1', // dusty rose sections
        'dark-text': '#2C1F1C',
        'muted-text': '#A68F86',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Noto Serif JP', 'serif'],
        sans: ['Noto Sans JP', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(160deg, #D96B61 0%, #F28379 45%, #F2CA80 100%)',
        'gradient-cream': 'linear-gradient(135deg, #F2E7C4 0%, #D9C7C1 100%)',
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
