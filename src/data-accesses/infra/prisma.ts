import 'server-only';

import { PrismaClient } from '@/data-accesses/infra/prisma/generated';

export const prisma = new PrismaClient();
