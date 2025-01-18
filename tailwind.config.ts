import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serifDisplay: ['DM Serif Display', 'serif'], // Nome da fonte e fallback
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        azul: {
          primario: 'rgb(11, 82, 153)',
          medio: '#093765',
          grad: '#090f18'
        }
      },

   
    },
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;
