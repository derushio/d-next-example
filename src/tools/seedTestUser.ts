import { upperzero } from '@/data-accesses/types/zod/utils';
import { PrismaClient } from '@prisma/client';
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
    upperzero(z.number()).parse(Number(process.env.SALT_ROUNDS)),
  );

  await prisma.user.create({
    data: {
      name: user.name,
      UserSecret: {
        create: {
          email: user.email,
          passwordHash: hash,
        },
      },
    },
  });
}

void main();
