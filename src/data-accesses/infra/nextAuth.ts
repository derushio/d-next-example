import 'server-only';

import { prisma } from '@/data-accesses/infra/prisma';
import { Env } from '@/data-accesses/queries/env/Env';
import bcrypt from 'bcrypt';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: Env.TOKEN_MAX_AGE_MINUTES * 60,
    updateAge: Env.TOKEN_UPDATE_AGE_MINUTES * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      } else {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        token.sub = dbUser?.id;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials, req) {
        req;

        const email = credentials?.email;
        const password = credentials?.password ?? '';
        if (email == null) {
          return null;
        }

        const userSecret = await prisma.user.findUnique({
          where: { email },
        });
        if (userSecret == null) {
          return null;
        }

        if (await bcrypt.compare(password, userSecret.passwordHash ?? '')) {
          const { passwordHash, ...user } = userSecret;
          passwordHash;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: Env.TOKEN_SECRET,
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
