/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_color: "var(--primary_color)",
        secondary_color: "var(--secondary_color)",
        primary_text_color: "var(--primary_text_color)",
        secondary_text_color: "var(--secondary_text_color)",
        main_background: "var(--main_background)",
      },
      fontSize: {
        xs: "0.9rem",
        sm: "1.0rem",
        base: "1.2rem",
        lg: "1.3rem",
      },
    },
  },
  plugins: [],
};
