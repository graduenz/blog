module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
      'mono': ['"Fira Mono"', 'monospace'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
