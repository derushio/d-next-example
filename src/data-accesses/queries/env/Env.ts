import 'server-only';

import { upperzero } from '@/data-accesses/types/zod/utils';
import { z } from 'zod';

export const Env = z
  .object({
    SALT_ROUNDS: upperzero(z.number()),

    TOKEN_SECRET: z.string(),
    TOKEN_MAX_AGE_MINUTES: upperzero(z.number()),
    TOKEN_UPDATE_AGE_MINUTES: upperzero(z.number()),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  })
  .parse({
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS ?? ''),

    TOKEN_SECRET: process.env.TOKEN_SECRET ?? '',
    TOKEN_MAX_AGE_MINUTES: Number(process.env.TOKEN_MAX_AGE_MINUTES ?? ''),
    TOKEN_UPDATE_AGE_MINUTES: Number(
      process.env.TOKEN_UPDATE_AGE_MINUTES ?? '',
    ),

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
  });
