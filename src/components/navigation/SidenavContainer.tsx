'use client';

import { BodyStateContext } from '@/components/navigation/BodyClient';
import { Sidenav } from '@/components/navigation/Sidenav';
import { useContext } from 'react';

/**
 * サイドバー描画領域
 */
export function SidenavContainer() {
  const { isSidenavOpen, setIsSidenavOpen } = useContext(BodyStateContext);

  return (
    <>
      {/* サイドバー表示時に他の箇所をクリックしたときにサイドバーを閉じるための判定エリア */}
      {isSidenavOpen && (
        <div
          className='fixed h-full w-full z-50'
          onClick={() => setIsSidenavOpen(false)}
        />
      )}

      <Sidenav />
    </>
  );
}
