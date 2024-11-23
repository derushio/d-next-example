import { authOptions } from '@/data-accesses/infra/nextAuth';
import NextAuth from 'next-auth';

/**
 * next-authのpage, apiなどを生成
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
