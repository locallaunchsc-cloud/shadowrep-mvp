import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080812",
        veil: "#111827",
        ghost: "#D7F9FF",
        plasma: "#8B5CF6"
      },
      boxShadow: {
        glow: "0 0 60px rgba(139, 92, 246, 0.25)"
      }
    },
  },
  plugins: [],
};
export default config;
