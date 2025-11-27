import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9ECD87",
        secondary: "#F8FAF8",
        accent: "#7DBA5E",
        base: "#ECFFE3",
      },
      fontFamily: {},
      fontSize: {},
    },
  },
} satisfies Config;
