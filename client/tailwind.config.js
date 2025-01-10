/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        customPurple: '#1a1257',
        customRed: '#f13223',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
