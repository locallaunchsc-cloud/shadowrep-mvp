import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        ink: "#050505",
        coal: "#0a0a0a",
        graphite: "#141416",
        steel: "#1f1f23",
        iron: "#2a2a30",
        silver: "#c0c0c8",
        chrome: "#e6e6ec",
        mirror: "#f5f5f7",
        ghost: "#ffffff",
        iris: "#B19CFF",
        "iris-deep": "#7C5CFA",
      },
      fontFamily: {
        sans: ["var(--font-space)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-unbounded)",
          "var(--font-space)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        chrome:
          "0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px -20px rgba(0,0,0,0.9), 0 0 60px rgba(255,255,255,0.04)",
        iris:
          "0 0 0 1px rgba(177,156,255,0.3), 0 0 50px rgba(177,156,255,0.25)",
        card: "0 1px 0 rgba(255,255,255,0.06) inset, 0 30px 80px -20px rgba(0,0,0,0.9)",
        ring: "0 0 0 1px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.05)",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "blob-1": "blob 22s ease-in-out infinite",
        "blob-2": "blob 26s ease-in-out infinite reverse",
        "blob-3": "blob 30s ease-in-out infinite",
        marquee: "marquee 50s linear infinite",
        "spin-slow": "spin 14s linear infinite",
        "chrome-shine": "chrome-shine 8s linear infinite",
        drift: "drift 24s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blob: {
          "0%, 100%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            transform: "translate(0, 0) rotate(0deg) scale(1)",
          },
          "33%": {
            borderRadius: "30% 70% 60% 40% / 50% 60% 40% 50%",
            transform: "translate(40px, -30px) rotate(120deg) scale(1.05)",
          },
          "66%": {
            borderRadius: "50% 50% 40% 60% / 40% 50% 60% 50%",
            transform: "translate(-30px, 40px) rotate(240deg) scale(0.95)",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "chrome-shine": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(30px, -20px) scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
