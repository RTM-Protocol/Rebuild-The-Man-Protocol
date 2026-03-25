import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tactical: {
          // Base blacks and grays (carbon/steel)
          black: '#0a0a0a',
          'carbon': '#0d0d0d',
          darkgray: '#1a1a1a',
          'steel': '#1f1f1f',
          gray: '#2a2a2a',
          'metal': '#333333',
          lightgray: '#3f3f3f',
          'chrome': '#4a4a4a',
          
          // Military greens
          green: '#3d4f2f',
          'green-dark': '#2d3a22',
          'green-bright': '#5a7043',
          'green-neon': '#7fa159',
          
          // Industrial oranges
          orange: '#cc6119',
          'orange-dark': '#a34d12',
          'orange-bright': '#e87528',
          'orange-hot': '#ff8c3a',
          
          // Accent colors
          'blue-steel': '#3d5a73',
          'red-alert': '#cc2936',
          'yellow-caution': '#d9a829',
        },
      },
      fontFamily: {
        'tactical': ['monospace', 'Courier New', 'Courier'],
        'display': ['Impact', 'Arial Black', 'sans-serif'],
        'brand': ['var(--font-brand)', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'tactical': '0 2px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'tactical-lg': '0 4px 0 rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.05)',
        'inset-tactical': 'inset 0 2px 4px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
