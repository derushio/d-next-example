'use server';

import { PostCards } from '@/app/posts/PostCards';
import { DivSpinner } from '@/components/atom/general/toast/DivSpinner';
import { Suspense } from 'react';

/**
 * サーバーコンポーネント例
 */
export default async function PostsPage() {
  return (
    <div className='p-4'>
      <h2 className='text-2xl mb-2'>投稿</h2>
      {/* Streaming Server Component Rendering 例 */}
      <Suspense fallback={<DivSpinner />}>
        <PostCards />
      </Suspense>
    </div>
  );
}
