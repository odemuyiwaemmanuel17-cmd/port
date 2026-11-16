/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#070a0f',
        graphite: '#0d1218',
        steel: '#1a222c',
        haze: '#8b98a7',
        ion: { DEFAULT: '#67e8f9', dim: '#22b8cf' },
        ember: '#f59e0b',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
