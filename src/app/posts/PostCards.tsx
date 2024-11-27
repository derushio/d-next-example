'use server';

import { PostCard } from '@/app/posts/PostCard';
import { postData } from '@/data-accesses/queries/post/PostData';

export async function PostCards() {
  const posts = await postData.findManyAll({});

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {posts.map((post, i) => {
        return <PostCard key={i} post={post} />;
      })}
    </div>
  );
}
