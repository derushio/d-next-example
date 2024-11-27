import 'server-only';

import { prisma } from '@/data-accesses/infra/prisma';
import { Env } from '@/data-accesses/queries/env/Env';
import { HEADER_PATH } from '@/middleware';
import { lo } from '@/utils/lo';
import { uuidv4 } from '@/utils/uuidv4';
import bcrypt from 'bcrypt';
import { addMinutes } from 'date-fns';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * 新しいトークンとセッションを作成
 */
async function createNewTokenSession(userId: string) {
  const accessToken = uuidv4();
  const accessTokenExpireAt = addMinutes(new Date(), Env.TOKEN_MAX_AGE_MINUTES);
  const resetToken = uuidv4();
  const resetTokenExpireAt = addMinutes(
    new Date(),
    Env.TOKEN_MAX_AGE_MINUTES * 10,
  );

  // sessionを記録
  const session = await prisma.userSession.create({
    data: {
      userId,
      accessTokenHash: await bcrypt.hash(accessToken, Env.TOKEN_SALT_ROUNDS),
      accessTokenExpireAt,
      resetTokenHash: await bcrypt.hash(resetToken, Env.TOKEN_SALT_ROUNDS),
      resetTokenExpireAt,
    },
    include: {
      User: true,
    },
  });

  return {
    accessToken,
    accessTokenExpireAt,
    resetToken,
    resetTokenExpireAt,
    session,
  };
}

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: Env.TOKEN_MAX_AGE_MINUTES * 60,
    updateAge: Env.TOKEN_UPDATE_AGE_MINUTES * 60,
  },
  callbacks: {
    /**
     * JWTの組み立て
     */
    async jwt({ token, user: _user }) {
      const user = lo.cloneDeep(_user ?? token);

      token = {
        ...token,
        ...user,
        sub: user.id,
      };

      return token;
    },
    /**
     * セッションの確認
     */
    async session({ session, token, user: _user }) {
      const user = lo.cloneDeep(_user ?? token);

      if (!user.accessToken || !user.resetToken) {
        session.user = undefined;
        return session;
      }

      let { accessToken, accessTokenExpireAt, resetToken, resetTokenExpireAt } =
        user;

      let userSession = await prisma.userSession.findFirst({
        where: {
          userId: user.sub,
          id: user.sessionId,
        },
        orderBy: {
          accessTokenExpireAt: 'desc',
        },
        include: {
          User: true,
        },
      });
      if (!userSession) {
        session.user = undefined;
        return session;
      }

      // accessTokenの有効期限チェック
      if (userSession.accessTokenExpireAt.getTime() < new Date().getTime()) {
        // accessToken 有効期限OK
        if (
          !(await bcrypt.compare(user.accessToken, userSession.accessTokenHash))
        ) {
          // accessToken NG
          session.user = undefined;
          return session;
        }
      } else {
        // accessToken 有効期限NG
        if (userSession.resetTokenExpireAt.getTime() < new Date().getTime()) {
          // resetToken 有効期限OK
          if (
            await bcrypt.compare(user.resetToken, userSession.resetTokenHash)
          ) {
            // resetToken OK
            // Reset token 実行
            const newTokenSession = await createNewTokenSession(user.id);
            userSession = newTokenSession.session;
            accessToken = newTokenSession.accessToken;
            accessTokenExpireAt = newTokenSession.accessTokenExpireAt;
            resetToken = newTokenSession.resetToken;
            resetTokenExpireAt = newTokenSession.resetTokenExpireAt;
          }
        }
      }

      session.user = {
        ...session.user,

        sub: user.id,

        sessionId: userSession.id,
        accessToken: accessToken,
        accessTokenExpireAt: accessTokenExpireAt,
        resetToken: resetToken,
        resetTokenExpireAt: resetTokenExpireAt,
      };

      return session;
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

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (user == null) {
          return null;
        }

        if (await bcrypt.compare(password, user.passwordHash ?? '')) {
          // パスワード認証OK
          const { passwordHash, ...safeUser } = user;
          passwordHash;

          // セッションを生成
          const newTokenSession = await createNewTokenSession(user.id);

          return {
            ...safeUser,

            sub: safeUser.id,

            sessionId: newTokenSession.session.id,
            accessToken: newTokenSession.accessToken,
            accessTokenExpireAt: newTokenSession.accessTokenExpireAt,
            resetToken: newTokenSession.resetToken,
            resetTokenExpireAt: newTokenSession.resetTokenExpireAt,
          };
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
  return (await getServerSession(...args, authOptions))?.user;
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
