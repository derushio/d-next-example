import 'server-only';

import { PrismaClient } from '@/data-accesses/prisma/generated';

export const prisma = new PrismaClient();
