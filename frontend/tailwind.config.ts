import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#333333',
      'green-1': '#41B580',
      'green-2': '#448C6B',
      'green-3': '#37CC87',
      'green-4': '#CDE4BC',
      'yellow-1': '#FFDC60',
      'yellow-2': '#FFC736',
      'yellow-3': '#EFC223',
      'yellow-4': '#FFECA8',
      'yellow-5': '#D9AB0B',
      'blue-1': '#D6E3E4',
      'blue-2': '#4C7E82',
      'blue-3': '#49B5C9',
      'blue-4': '#6ED1E3',
      'red-1': '#F43F5E',
      'red-2': '#FB7185',
      'lightgray': '#F9F9F9',
    }
  },
  plugins: [],
}
export default config
