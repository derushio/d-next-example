'use server';

import { Post } from '@/data-accesses/infra/prisma/generated';
import { japaneseDateTimeLocaleFormats } from '@/utils/dfUtils';
import { format } from 'date-fns';
import { Card } from 'flowbite-react';

export async function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <div>{post.title}</div>
      <hr className='h-px bg-gray-200 border-0 dark:bg-gray-700' />
      <div className='text-right'>
        {format(post.createdAt, ...japaneseDateTimeLocaleFormats)}
      </div>
      <div className='min-h-64'>{post.body}</div>
    </Card>
  );
}
