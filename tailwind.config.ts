const plugin = require('tailwindcss/plugin');

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
        './src/page/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': 'black',
      'gray': 'gray',
      'white': 'white',
      'red': 'red',
      'purple': 'purple',
      'green': 'green',
      'yellow': 'yellow',
      'blue': 'blue',
      'aqua': 'aqua',
      'skyblue': 'skyblue',
      'pink': 'pink'
    },
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
}
export default config