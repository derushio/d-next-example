import { Prisma, PrismaClient } from '@/data-accesses/prisma/generated';
import { upperzero } from '@/data-accesses/types/zod/utils';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient();

const user = {
  name: 'テストユーザー',
  email: 'test@example.com',
  password: 'password',
};

async function main() {
  console.log(user);
  const hash = await bcrypt.hash(
    user.password,
    upperzero(z.number()).parse(Number(process.env.TOKEN_SALT_ROUNDS)),
  );

  await prisma.$transaction(async (t) => {
    const userData = {
      name: user.name,
      email: user.email,
      passwordHash: hash,
    } satisfies Prisma.UserCreateInput;

    await t.user.upsert({
      where: {
        email: userData.email,
      },
      create: userData,
      update: userData,
    });

    const postsData = [] satisfies Prisma.PostCreateInput[];
  });
}

void main();
