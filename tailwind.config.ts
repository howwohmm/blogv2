import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        'border-light': 'var(--border-light)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        highlight: 'var(--highlight)',
        'highlight-foreground': 'var(--highlight-foreground)',
        'nav-button': 'var(--nav-button)',
        'button-text': 'var(--button-text)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1a1f36',
            h2: {
              color: '#1a1f36',
              fontWeight: '300',
              fontSize: '32px',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              marginTop: '48px',
              marginBottom: '24px',
            },
            p: {
              marginTop: '24px',
              marginBottom: '24px',
              lineHeight: '1.6',
            },
            a: {
              color: '#635bff',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config 