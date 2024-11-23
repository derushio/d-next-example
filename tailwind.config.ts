import * as flowbite from 'flowbite-react/tailwind';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        primary2: 'var(--primary2)',
        error: 'var(--error)',
        error2: 'var(--error2)',
        warn: 'var(--warn)',
        warn2: 'var(--warn2)',
      },
      transitionProperty: {
        width: 'width',
      },
      width: {
        '128': '32rem',
        '256': '64rem',
      },
      maxWidth: {
        '128': '32rem',
        '192': '45rem',
        '256': '64rem',
        '512': '128rem',
      },
      inset: {},
    },
  },
  plugins: [flowbite.plugin()],
} satisfies Config;
