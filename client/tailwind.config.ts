import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cornsilk: "#FEFAE0",
        pakistan_green: "#283618",
        moss_green: "#606C38",
        earth_yellow: "#DDA15E",
        app_blue: "#3772FF",
        app_orange: "#FB8B24",
      },
    },
  },
  plugins: [],
} satisfies Config;
