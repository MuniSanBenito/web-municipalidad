import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        sanbenito: {
          primary: '#b6c544',
          'primary-content': '#160016',
          secondary: '#7bcbe2',
          'secondary-content': '#160016',
          accent: '#fbd300',
          'accent-content': '#001616',
          neutral: '#b6c544',
          'neutral-content': '#160016',
          'base-100': '#ffffff',
          'base-200': '#e6e6e6',
          'base-300': '#bebebe',
          'base-content': '#161616',
          info: '#076633',
          'info-content': '#e6e6e6',
          success: '#00ff00',
          'success-content': '#001600',
          warning: '#f59e0b',
          'warning-content': '#001600',
          error: '#ff0000',
          'error-content': '#160000',
        },
      },
    ],
    darkTheme: 'sanbenito',
  },
}
