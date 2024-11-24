import { User as PrismaUser } from '@/data-accesses/infra/prisma/generated';
import { DefaultSession } from 'next-auth';

type NextAuthUser = Omit<PrismaUser, 'passwordHash'> & {
  accessToken: string;
  resetToken: string;
};

declare module 'next-auth' {
  interface Session {
    user?: NextAuthUser & DefaultSession['user'];
  }
  interface User extends NextAuthUser {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  // "jwt"コールバックのtokenパラメータに任意のプロパティを追加します。
  interface JWT extends NextAuthUser {
    id: string;
  }
}
