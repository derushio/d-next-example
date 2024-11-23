import 'server-only';

import { Env } from '@/data-accesses/queries/env/Env';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: Env.GOOGLE_CLIENT_ID,
      clientSecret: Env.GOOGLE_CLIENT_SECRET,
      // for work around oauth error
      checks: ['none'],
    }),
  ],
  secret: Env.TOKEN_SECRET,
  session: {
    maxAge: Env.TOKEN_MAX_AGE_MINUTES * 60,
    updateAge: Env.TOKEN_UPDATE_AGE_MINUTES * 60,
  },
} satisfies NextAuthOptions;

/**
 * Use it in server contexts
 */
export async function getAuth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return await getServerSession(...args, authOptions);
}

export const NotAuthError = 'NotAuthError';

export async function guardAuth() {
  const auth = await getAuth();

  if (!auth) {
    throw new Error(NotAuthError);
  }

  return auth;
}

export type AuthType = Awaited<ReturnType<typeof getAuth>>;
