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
      id: 'm8kpy32b06shqbw7x5pgtaan',
      name: user.name,
      email: user.email,
      passwordHash: hash,
    } satisfies Prisma.UserCreateInput;

    await t.user.upsert({
      where: {
        id: userData.id,
      },
      create: userData,
      update: userData,
    });

    const postsData = [
      {
        id: 'v12ztbdv8uv54ejetpy48rdq',
        title: 'ひとつめのきじ',
        body: 'ないようがないようです。',
        user: {
          connect: {
            id: userData.id,
          },
        },
      },
      {
        id: 'gsp42mf5zv3n9ju0ondvs7k6',
        title: 'ふたつめのきじ',
        body: 'ないようがどうやらあるようです。',
        user: {
          connect: {
            id: userData.id,
          },
        },
      },
    ] satisfies Prisma.PostCreateInput[];

    for (const postData of postsData) {
      await t.post.upsert({
        where: {
          id: postData.id,
        },
        create: postData,
        update: postData,
      });
    }
  });
}

void main();
