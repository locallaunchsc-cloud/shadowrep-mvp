import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        ink: "#050507",
        veil: "#0a0a10",
        ghost: "#E7FFF6",
        acid: "#00FF85",
        "acid-2": "#39FF14",
        cyber: "#00F0FF",
        magenta: "#FF006E",
        iris: "#B19CFF",
      },
      fontFamily: {
        sans: ["var(--font-space)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-unbounded)", "var(--font-space)", "ui-sans-serif", "system-ui", "sans-serif"],
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
        acid: "0 0 60px rgba(0, 255, 133, 0.35), 0 0 120px rgba(0, 240, 255, 0.15)",
        cyber: "0 0 60px rgba(0, 240, 255, 0.35)",
        magenta: "0 0 60px rgba(255, 0, 110, 0.35)",
        card: "0 1px 0 rgba(255,255,255,0.06) inset, 0 30px 80px -20px rgba(0,0,0,0.9)",
        ring: "0 0 0 1px rgba(0, 255, 133, 0.35), 0 0 40px rgba(0, 255, 133, 0.25)",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "blob-1": "blob 18s ease-in-out infinite",
        "blob-2": "blob 22s ease-in-out infinite reverse",
        "blob-3": "blob 26s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "spin-conic": "spin 4s linear infinite",
        holo: "holo 6s ease infinite",
        drift: "drift 20s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
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
        holo: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(30px, -20px) scale(1.08)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
