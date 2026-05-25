/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:            '#F5F0E8',
        parchment:        '#E0D8CC',
        terracotta:       '#C4633A',
        'terracotta-dark':'#8A4527',
        ink:              '#111111',
        'mid-gray':       '#666666',
        rule:             '#D0C8BC',
        // legacy aliases — kept so no existing className breaks
        'warm-brown': '#111111',
        'warm-gray':  '#666666',
        mustard:      '#D4A843',
      },
      fontFamily: {
        sans:    ['Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      typography: (theme) => ({
        bauhaus: {
          css: {
            '--tw-prose-body':          theme('colors.ink'),
            '--tw-prose-headings':      theme('colors.ink'),
            '--tw-prose-lead':          theme('colors.mid-gray'),
            '--tw-prose-links':         theme('colors.terracotta'),
            '--tw-prose-bold':          theme('colors.ink'),
            '--tw-prose-counters':      theme('colors.mid-gray'),
            '--tw-prose-bullets':       theme('colors.terracotta'),
            '--tw-prose-hr':            theme('colors.rule'),
            '--tw-prose-quotes':        theme('colors.ink'),
            '--tw-prose-quote-borders': theme('colors.terracotta'),
            '--tw-prose-captions':      theme('colors.mid-gray'),
            '--tw-prose-code':          theme('colors.terracotta'),
            '--tw-prose-pre-code':      theme('colors.cream'),
            '--tw-prose-pre-bg':        theme('colors.ink'),
            '--tw-prose-th-borders':    theme('colors.rule'),
            '--tw-prose-td-borders':    theme('colors.rule'),
            fontFamily: theme('fontFamily.sans').join(', '),
            h1: { fontWeight: '700', letterSpacing: '-0.02em' },
            h2: { fontWeight: '700', letterSpacing: '-0.01em' },
            h3: { fontWeight: '600' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
