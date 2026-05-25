/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sp: {
          bg:            '#0a0e1a',
          'bg-elev-1':   '#0e1320',
          'bg-elev-2':   '#131a2b',
          surface:       '#182238',
          border:        '#1f2a44',
          'border-strong': '#2c3a5c',
          hairline:      'rgba(255,255,255,0.06)',
          ink:           '#eef1f8',
          'ink-soft':    '#b8c0d4',
          'ink-mute':    '#7a849e',
          'ink-faint':   '#4a5573',
          teal:          '#64ffda',
          'teal-soft':   'rgba(100,255,218,0.14)',
          'teal-glow':   'rgba(100,255,218,0.45)',
          blue:        '#a5c8ff',
          'blue-soft': 'rgba(165,200,255,0.16)',
          amber:         '#ffb088',
          'amber-soft':  'rgba(255,176,136,0.14)',
        },
      },
      fontFamily: {
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--ink-soft)',
            a: { color: 'var(--teal)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            h1: { color: 'var(--ink)', fontWeight: '500' },
            h2: { color: 'var(--ink)', fontWeight: '500' },
            h3: { color: 'var(--ink)', fontWeight: '500' },
            h4: { color: 'var(--ink)', fontWeight: '500' },
            strong: { color: 'var(--ink)' },
            code: { color: 'var(--teal)', fontFamily: 'var(--font-mono)' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            blockquote: { color: 'var(--ink-mute)', borderLeftColor: 'var(--border-strong)' },
            hr: { borderColor: 'var(--hairline)' },
            'ol > li::marker': { color: 'var(--ink-mute)' },
            'ul > li::marker': { color: 'var(--ink-mute)' },
            thead: { borderBottomColor: 'var(--border)' },
            'tbody tr': { borderBottomColor: 'var(--hairline)' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
