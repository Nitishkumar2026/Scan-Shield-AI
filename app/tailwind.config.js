/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2467ec",
          foreground: "#ffffff",
          dark: "#1a4fb8",
          light: "#4a85f7",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "#ea384c",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#16cc79",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f7d785",
          foreground: "#1a1f36",
        },
        cyber: {
          dark: "#1a1f36",
          darker: "#0f1322",
          light: "#f0f5ff",
          blue: "#2467ec",
          cyan: "#00d4ff",
          red: "#ea384c",
          green: "#16cc79",
          yellow: "#f7d785",
          purple: "#8b5cf6",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        exo: ['Exo', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 20px rgba(36, 103, 236, 0.5)",
        "glow-red": "0 0 20px rgba(234, 56, 76, 0.5)",
        "glow-green": "0 0 20px rgba(22, 204, 121, 0.5)",
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.5)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(36, 103, 236, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(36, 103, 236, 0.8)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "risk-flash": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "data-flow": {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
        "marquee": "marquee 30s linear infinite",
        "risk-flash": "risk-flash 1s ease-in-out infinite",
        "data-flow": "data-flow 2s linear infinite",
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #1a1f36 0%, #0f1322 100%)",
        "grid-pattern": "linear-gradient(rgba(36, 103, 236, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(36, 103, 236, 0.1) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
