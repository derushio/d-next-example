import * as flowbite from 'flowbite-react/tailwind';
import type { Config } from 'tailwindcss';

const gap = {
  '0.25em': '0.25em',
  '0.5em': '0.5em',
  '0.75em': '0.75em',
  '1em': '1em',
  '2em': '2em',
  '3em': '3em',
  '4em': '4em',
};

const widthHeight = {
  '128': '32rem',
  '256': '64rem',
  '1px': '1px',
  '2px': '2px',
  '0.1em': '0.1em',
  '0.2em': '0.2em',
  '4em': '4em',
  '8em': '8em',
  '14em': '14em',
  '16em': '16em',
  '18em': '18em',
  '40em': '40em',
  '10%': '10%',
  '20%': '20%',
  '30%': '30%',
  '40%': '40%',
  '50%': '50%',
  '60%': '60%',
  '70%': '70%',
  '80%': '80%',
  '90%': '90%',
};

const inset = {
  '10%': '10%',
  '20%': '20%',
  '30%': '30%',
  '40%': '40%',
  '50%': '50%',
  '60%': '60%',
  '70%': '70%',
  '80%': '80%',
  '90%': '90%',
};

const fontSize = {
  '50%': '0.500em',
  '75%': '0.750em',
  '80%': '0.800em',
  '85%': '0.850em',
  '100%': '1.000em',
  '110%': '1.100em',
  '120%': '1.200em',
  '130%': '1.300em',
  '150%': '1.500em',
  '160%': '1.600em',
  '170%': '1.700em',
  '180%': '1.800em',
  '190%': '1.900em',
  '200%': '2.000em',
  '250%': '2.500em',
  '300%': '3.000em',
  '400%': '4.000em',
  '500%': '5.000em',
};

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
        paper: 'var(--paper)',
      },
      transitionProperty: {
        width: 'width',
        margin: 'margin',
      },
      width: widthHeight,
      height: widthHeight,
      maxWidth: {
        '128': '32rem',
        '192': '45rem',
        '256': '64rem',
        '512': '128rem',
      },
      inset: inset,
      aspectRatio: {
        a4: '1 / 1.41421356',
      },
      fontSize: fontSize,
      gap: gap,
      padding: gap,
      margin: gap,
      letterSpacing: fontSize,
    },
  },
  plugins: [flowbite.plugin()],
} satisfies Config;
