import type { Config } from 'tailwindcss';

/**
 * Tailwind カラートークンは CSS カスタムプロパティ経由で参照します。
 * 実際の値は lib/palettes.ts → app/layout.tsx → <style> タグで注入されます。
 *
 * rgb(var(--xxx) / <alpha-value>) 形式にすることで
 * bg-primary/50 のような opacity modifier が使えます。
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── Primary ────────────────────────────────────────
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          light:   'rgb(var(--primary-light) / <alpha-value>)',
          dark:    'rgb(var(--primary-dark) / <alpha-value>)',
        },
        // ─── Secondary (旧 teal / mauve ポジション) ─────────
        teal: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          light:   'rgb(var(--secondary-light) / <alpha-value>)',
          dark:    'rgb(var(--secondary-dark) / <alpha-value>)',
        },
        // ─── Accent (旧 mustard / amber ポジション) ──────────
        mustard: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          light:   'rgb(var(--accent-light) / <alpha-value>)',
          dark:    'rgb(var(--accent-dark) / <alpha-value>)',
        },
        // ─── Blush ───────────────────────────────────────────
        blush: {
          DEFAULT: 'rgb(var(--blush) / <alpha-value>)',
          light:   'rgb(var(--blush) / <alpha-value>)',
          dark:    'rgb(var(--blush) / <alpha-value>)',
        },
        // ─── Background neutrals ─────────────────────────────
        cream:      'rgb(var(--cream) / <alpha-value>)',
        'warm-bg':  'rgb(var(--warm-bg) / <alpha-value>)',
        // ─── Text ────────────────────────────────────────────
        'dark-text':  'rgb(var(--dark-text) / <alpha-value>)',
        'muted-text': 'rgb(var(--muted-text) / <alpha-value>)',
        // ─── Dark UI panels (Hero、CTA背景 など) ────────────
        'dark-ui':     'rgb(var(--dark-ui) / <alpha-value>)',
        'dark-ui-mid': 'rgb(var(--dark-ui-mid) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Noto Serif JP', 'serif'],
        sans:  ['Noto Sans JP', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-warm':  'linear-gradient(160deg, rgb(var(--primary-dark)) 0%, rgb(var(--primary)) 45%, rgb(var(--accent)) 100%)',
        'gradient-cream': 'linear-gradient(135deg, rgb(var(--cream)) 0%, rgb(var(--warm-bg)) 100%)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-delay':  'float 6s ease-in-out 2s infinite',
        'float-delay2': 'float 6s ease-in-out 4s infinite',
        'fade-in':      'fadeIn 0.6s ease-out',
        'slide-up':     'slideUp 0.6s ease-out',
        'peek':         'peek 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        peek: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
