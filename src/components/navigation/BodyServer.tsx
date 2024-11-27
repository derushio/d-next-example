'use server';

import { UserEmail } from '@/components/atom/user/UserEmail';
import { SidenavContainer } from '@/components/navigation/SidenavContainer';
import { Header } from '@/components/navigation/header/Header';
import { Spinner } from 'flowbite-react';
import { ReactNode, Suspense } from 'react';

/**
 * BodyClientからServer Componentに戻すためのコンポーネント
 */
export async function BodyServer({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='absolute z-50'>
        <SidenavContainer />
      </div>

      <div className='relative h-full ml-0 sm:ml-72 z-0'>
        <Header
          UserEmail={
            <Suspense fallback={<Spinner />}>
              <UserEmail />
            </Suspense>
          }
        />

        {/* ページ本体 */}
        <div className='relative z-0 h-full w-full overflow-x-hidden pt-14'>
          {children}
        </div>
      </div>
    </>
  );
}
