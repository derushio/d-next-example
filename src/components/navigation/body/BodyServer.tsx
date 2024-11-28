'use server';

import { UserEmail } from '@/components/atom/user/UserEmail';
import { Header } from '@/components/navigation/header/Header';
import { SidenavServer } from '@/components/navigation/sidenav/SidenavServer';
import { Spinner } from 'flowbite-react';
import { ReactNode, Suspense } from 'react';

/**
 * BodyClientからServer Componentに戻すためのコンポーネント
 */
export async function BodyServer({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='z-50'>
        <Suspense>
          <SidenavServer />
        </Suspense>
      </div>

      <div className='relative h-full z-0'>
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
