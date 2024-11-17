import 'server-only';

import { upperzero } from '@/data-access/types/zod/utils';
import { z } from 'zod';

export const Env = z
  .object({
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DB_HOST: z.string(),
    DB_PORT: upperzero(z.number()),

    DATABASE_URL: z.string(),

    JWT_SECRET: z.string(),
    JWT_ALG: z.string(),
    JWT_EXPIRATION_TIME: z.string(),

    SALT_ROUNDS: upperzero(z.number()),

    TOKEN_COOKIE_DOMAIN: z.string(),
  })
  .parse({
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),

    DATABASE_URL: process.env.DATABASE_URL,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ALG: process.env.JWT_ALG,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,

    SALT_ROUNDS: Number(process.env.SALT_ROUNDS),

    TOKEN_COOKIE_DOMAIN: process.env.TOKEN_COOKIE_DOMAIN,
  });
