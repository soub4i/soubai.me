/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Terminal theme colors (amber/orange on dark)
        "terminal-bg": "var(--terminal-bg)",
        "terminal-bg-secondary": "var(--terminal-bg-secondary)",
        "terminal-text": "var(--terminal-text)",
        "terminal-text-secondary": "var(--terminal-text-secondary)",
        "terminal-accent": "#ffb347",
        "terminal-border": "var(--terminal-border)",
        "terminal-cursor": "#ffb347",
        // Extended greys for better light mode
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          750: '#2d3748',
          800: '#1f2937',
          900: '#111827',
        },
        // Legacy colors
        "neon-orange": "#f92300",
      },
      fontFamily: {
        'mono': ['var(--font-mono)', 'Fira Code', 'JetBrains Mono', 'Monaco', 'Cascadia Code', 'monospace'],
        'sans': ['var(--font-sans)', 'Open Sans', 'system-ui', 'sans-serif'],
        'display': ['var(--font-mono)', 'Fira Code', 'Open Sans', 'system-ui', 'sans-serif'],
        'body': ['var(--font-mono)', 'Fira Code', 'Merriweather', 'Georgia', 'serif'],
      },
      fontSize: {
        "7xl": "4.5rem",
      },
      spacing: {
        14: "3.375rem",
      },
      animation: {
        'blink': 'blink 1s infinite',
        'type': 'type 3s steps(40, end)',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        type: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
      },
    },
    typography: (theme) => ({
      DEFAULT: {
        css: {
          color: theme("colors.terminal-text"),
          '[data-theme="light"] &': {
            color: theme("colors.gray.900"),
          },
          blockquote: {
            borderLeftColor: theme("colors.terminal-accent"),
          },
          'ol > li::before': {
            color: theme("colors.terminal-accent"),
          },
          'ul > li::before': {
            backgroundColor: theme("colors.terminal-accent"),
          },
          a: {
            color: theme("colors.terminal-accent"),
            '&:hover': {
              color: theme("colors.terminal-text"),
            },
          },
          code: {
            color: theme("colors.terminal-accent"),
            backgroundColor: theme("colors.terminal-bg"),
          },
          'code::before': {
            content: 'none',
          },
          'code::after': {
            content: 'none',
          },
        },
      },
    }),
  },
  plugins: [require("@tailwindcss/typography")],
};
