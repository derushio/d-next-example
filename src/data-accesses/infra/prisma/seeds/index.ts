import { seedTestUser } from '@/data-accesses/infra/prisma/seeds/seedTestUser';

export async function seed() {
  await seedTestUser();
}

void seed();
