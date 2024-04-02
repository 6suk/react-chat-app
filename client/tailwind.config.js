/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#cddeff',
          'primary-content': '#5a81fa',
          // secondary: '#2c3d8f',
          // 'secondary-content': '#f2f5ff',
          secondary: '#5a81fa',
          'secondary-content': '#f2f5ff',
          accent: '#00ffff',
          neutral: '#eeeeee',
          'neutral-content': '#1f1f1f',
          'base-100': '#ffffff',
          'base-200': '#f8f9fd',
          'base-300': '#f2f5ff',
          'base-content': '#1f1f1f',
          info: '#0000ff',
          success: '#00ff00',
          warning: '#00ff00',
          error: '#ff0000',
        },
      },
      'light',
      'dark',
    ],
  },
  plugins: [daisyui],
};
