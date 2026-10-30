/** @type {import('tailwindcss').Config} */
import containerQueries from '@tailwindcss/container-queries';

export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0755E8',
          50: '#EEF4FF',
          100: '#DCE7FE',
          200: '#B6CDFC',
          500: '#2A6EF0',
          600: '#0755E8',
          700: '#0645BD',
          800: '#0A3A94',
        },
        navy: {
          DEFAULT: '#10244D',
          900: '#0B1A39',
          800: '#10244D',
          700: '#1B3366',
        },
        sun: {
          DEFAULT: '#FFD600',
          300: '#FFE466',
          400: '#FFDD33',
          500: '#FFD600',
          600: '#E6C000',
        },
        surface: '#F4F7FC',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,36,77,.06), 0 8px 24px -12px rgba(16,36,77,.18)',
        lift: '0 2px 4px rgba(16,36,77,.06), 0 18px 40px -16px rgba(16,36,77,.30)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'none' } },
        pulse_ring: {
          '0%': { boxShadow: '0 0 0 0 rgba(37,211,102,.55)' },
          '80%,100%': { boxShadow: '0 0 0 16px rgba(37,211,102,0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .5s ease-out both',
        ring: 'pulse_ring 2.2s ease-out infinite',
      },
    },
  },
  plugins: [containerQueries],
};

