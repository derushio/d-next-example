import * as flowbite from 'flowbite-react/tailwind';
import type { Config } from 'tailwindcss';

const numbers1_1 = [
  '5',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
  '60',
  '65',
  '70',
  '75',
  '80',
  '85',
  '90',
  '95',
  '100',
  '110',
  '120',
  '125',
  '130',
  '140',
  '150',
  '160',
  '170',
  '175',
  '180',
  '190',
  '200',
  '250',
  '300',
  '400',
  '450',
  '500',
] as const;

const numbers1_2 = [
  '0.05',
  '0.1',
  '0.15',
  '0.2',
  '0.25',
  '0.3',
  '0.35',
  '0.4',
  '0.45',
  '0.5',
  '0.55',
  '0.6',
  '0.65',
  '0.7',
  '0.75',
  '0.8',
  '0.85',
  '0.9',
  '0.95',
  '1',
  '1.1',
  '1.2',
  '1.25',
  '1.3',
  '1.4',
  '1.5',
  '1.6',
  '1.7',
  '1.75',
  '1.8',
  '1.9',
  '2',
  '2.5',
  '3',
  '4',
  '4.5',
  '5',
] as const;

const numbers2 = [
  '0.25em',
  '0.5em',
  '0.75em',
  '1em',
  '1.1em',
  '1.2em',
  '1.25em',
  '1.3em',
  '1.4em',
  '1.5em',
  '2em',
  '3em',
  '4em',
  '8em',
  '12em',
  '16em',
  '24em',
  '32em',
  '48em',
  '64em',
  '96em',
  '128em',
] as const;

const percent = numbers1_1.map((v) => `${v}%` as const);
const em1 = numbers1_2.map((v) => `${v}em` as const);

const em1Dict = numbers1_1.reduce(
  (prev, v, i) => {
    prev[percent[i]] = em1[i];
    return prev;
  },
  {} as Record<string, string>,
) as Record<(typeof percent)[number], (typeof em1)[number]>;

const percentDict = percent.reduce(
  (prev, v) => {
    prev[v] = v;
    return prev;
  },
  {} as Record<string, string>,
) as Record<(typeof percent)[number], (typeof percent)[number]>;

const em2dict = numbers2.reduce(
  (prev, v) => {
    prev[v] = v;
    return prev;
  },
  {} as Record<string, string>,
) as Record<(typeof numbers2)[number], (typeof numbers2)[number]>;

const all = {
  ...percentDict,
  ...em2dict,
};

const widthHeight = {
  '100vw': '100vw',
  '100vh': '100vh',
  ...all,
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
      maxWidth: widthHeight,
      maxHeight: widthHeight,
      inset: all,
      aspectRatio: {
        a4: '1 / 1.41421356',
        a4l: '1.41421356 / 1',
        '16/9': '16 / 9',
        '4/3': '4 / 3',
        '5/3': '5 / 3',
      },
      fontSize: em1Dict,
      gap: em2dict,
      padding: em2dict,
      margin: em2dict,
      space: em2dict,
      borderRadius: all,
      letterSpacing: em1Dict,
    },
  },
  plugins: [flowbite.plugin()],
} satisfies Config;
