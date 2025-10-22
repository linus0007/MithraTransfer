import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          500: '#0ea5a0'
        },
        brand: {
          100: '#e0f2f1',
          500: '#1572A1'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 118, 110, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
