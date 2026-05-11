import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", ".dark-mode"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
        },
        success: {
          DEFAULT: "var(--color-success)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
        },
        error: {
          DEFAULT: "var(--color-error)",
        },
        info: {
          DEFAULT: "var(--color-info)",
        },
        surface: {
          DEFAULT: "var(--color-bg-container)",
          layout: "var(--color-bg-layout)",
          elevated: "var(--color-bg-elevated)",
        },
        content: {
          DEFAULT: "var(--color-text)",
          secondary: "var(--color-text-secondary)",
        },
        border: {
          DEFAULT: "var(--color-border)",
        },
      },
      borderRadius: {
        base: "8px",
      },
      fontFamily: {
        sans: [
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover":
          "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
