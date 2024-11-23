import 'server-only';

import { upperzero } from '@/data-accesses/types/zod/utils';
import { z } from 'zod';

export const Env = z
  .object({
    TOKEN_SECRET: z.string(),
    TOKEN_MAX_AGE_MINUTES: upperzero(z.number()),
    TOKEN_UPDATE_AGE_MINUTES: upperzero(z.number()),
  })
  .parse({
    TOKEN_SECRET: process.env.TOKEN_SECRET ?? '',
    TOKEN_MAX_AGE_MINUTES: Number(process.env.TOKEN_MAX_AGE_MINUTES ?? ''),
    TOKEN_UPDATE_AGE_MINUTES: Number(
      process.env.TOKEN_UPDATE_AGE_MINUTES ?? '',
    ),
  });
