'use server';

import { Posts } from '@/app/posts/Posts';
import { DivSpinner } from '@/components/atom/general/toast/DivSpinner';
import { Suspense } from 'react';

export default async function PostsPage() {
  return (
    <div className='p-4'>
      <h2 className='text-2xl mb-2'>投稿</h2>
      <Suspense fallback={<DivSpinner />}>
        <Posts />
      </Suspense>
    </div>
  );
}
