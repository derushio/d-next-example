import 'server-only';

import { prisma } from '@/data-accesses/infra/prisma';
import { Env } from '@/data-accesses/queries/env/Env';
import { HEADER_PATH } from '@/middleware';
import { uuidv4 } from '@/utils/uuidv4';
import bcrypt from 'bcrypt';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import {
  NextAuthOptions,
  User as NextAuthUser,
  getServerSession,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: Env.TOKEN_MAX_AGE_MINUTES * 60,
    updateAge: Env.TOKEN_UPDATE_AGE_MINUTES * 60,
  },
  callbacks: {
    /**
     * jwtの処理時にユーザを紐付ける
     */
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
          sub: user.id,
        };
      } else {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        if (!dbUser) {
          throw new Error('dbUser is null');
        }

        const { passwordHash, ...safeDbUser } = dbUser;
        passwordHash;
        token = {
          ...token,
          ...safeDbUser,
          sub: safeDbUser?.id,
        };
      }
      return token;
    },
    /**
     * セッションの確認
     */
    async session({ session, token }) {
      console.log(token);
      // TODO: sessionの確認、resetToken
      // TODO: ここでtokenを無効化する方法
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials, req): Promise<NextAuthUser | null> {
        req;

        const email = credentials?.email;
        const password = credentials?.password ?? '';
        if (email == null) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (user == null) {
          return null;
        }

        if (await bcrypt.compare(password, user.passwordHash ?? '')) {
          const { passwordHash, ...safeUser } = user;
          passwordHash;

          const accessToken = uuidv4();
          const resetToken = uuidv4();

          // sessionを記録
          await prisma.userSession.create({
            data: {
              userId: user.id,
              accessTokenHash: await bcrypt.hash(
                accessToken,
                Env.TOKEN_SALT_ROUNDS,
              ),
              resetTokenHash: await bcrypt.hash(
                resetToken,
                Env.TOKEN_SALT_ROUNDS,
              ),
            },
          });

          return { ...safeUser, accessToken, resetToken };
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

export async function guardAuth() {
  const auth = await getAuth();

  if (!auth) {
    if (!auth) {
      const path = (await headers()).get(HEADER_PATH);
      redirect(`/api/auth/signin?callbackUrl=${path}`);
    }
  }

  return auth;
}

export type AuthType = Awaited<ReturnType<typeof getAuth>>;
