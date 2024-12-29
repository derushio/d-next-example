import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // Note: there should be no other properties in this object
    ignores: [
      // dependencies
      '/node_modules/*',
      '/.pnp',
      '.pnp.*',
      '.yarn/*',

      // testing
      '/coverage/*',

      // next.js
      '/.next/*',
      '/out/*',

      // production
      '/build/*',

      // misc
      '.DS_Store',
      '*.pem',

      // debug
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',

      // env files (can opt-in for committing if needed)
      '.env',

      // vercel
      '.vercel',

      // typescript
      '*.tsbuildinfo',
      'next-env.d.ts',

      // generated
      'src/data-accesses/infra/prisma/generated/*',
    ],

    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];

export default eslintConfig;
