import 'server-only';

import { guardAuth } from '@/data-accesses/infra/nextAuth';
import { prisma } from '@/data-accesses/infra/prisma';

class PostData {
  public async findManyAll({ afterId }: { afterId?: string }) {
    await guardAuth();

    const posts = await prisma.post.findMany({
      cursor: afterId
        ? {
            id: afterId,
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts;
  }
}

export const postData = new PostData();
