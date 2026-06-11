/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        highlight: 'var(--highlight)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        bgDark: 'var(--bg-dark)',
        bgLight: 'var(--bg-light)',
        surface: 'var(--surface)',
        storyAnswer: 'var(--story-answer)',
        storyQuestion: 'var(--story-question)',
        textPrimary: 'var(--text-primary)',
        textMuted: 'var(--text-muted)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        story: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
