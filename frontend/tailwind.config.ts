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
        'gradient-green': 'linear-gradient(95deg, #37CC87 0%, #41B580 100%)',
        'gradient-yellow': 'linear-gradient(95deg, #FFDC60 0%, #EFC223 100%)',
        'gradient-blue': 'linear-gradient(95deg, #49B5C9 0%, #25949D 100%)',
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
      'yellow-6': '#A48104',
      'blue-1': '#D6E3E4',
      'blue-2': '#4C7E82',
      'blue-3': '#49B5C9',
      'blue-4': '#6ED1E3',
      'blue-5': '#F2F7F8',
      'red-1': '#F43F5E',
      'red-2': '#FB7185',
      'lightgray-1': '#F9F9F9',
      'lightgray-2': '#F3F3F3',
      'lightgray-3': '#E9E9E9',
    }
  },
  plugins: [],
}
export default config
