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
          secondary: '#5a81fa',
          'secondary-content': '#f2f5ff',
          accent: '#2c3d8f',
          neutral: '#dcdcdc',
          'neutral-content': '#1f1f1f',
          'base-100': '#ffffff',
          'base-200': '#eeeeee',
          'base-300': '#f2f5ff',
          'base-content': '#1f1f1f',
          info: '#dcdcdc',
          'info-content': '#666666',
          success: '#00ff00',
          warning: '#00ff00',
          error: '#ff0000',
        },
      },
    ],
  },
  plugins: [daisyui],
};
