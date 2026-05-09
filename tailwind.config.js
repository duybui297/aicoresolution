import typography from '@tailwindcss/typography';
import { adminColors } from './src/styles/adminColors';
import { adminFontFamily, adminFontSize, adminFontWeight } from './src/styles/adminTypography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        ...adminFontFamily
      },
      fontSize: {
        ...adminFontSize
      },
      fontWeight: {
        ...adminFontWeight
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        admin: adminColors
      }
    },
  },
  plugins: [
    typography,
  ],
};
