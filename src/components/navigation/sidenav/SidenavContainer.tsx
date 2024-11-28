'use client';

import { BodyStateContext } from '@/components/navigation/body/BodyClient';
import { Sidenav } from '@/components/navigation/sidenav/Sidenav';
import { getAuth } from '@/data-accesses/infra/nextAuth';
import { useContext } from 'react';

/**
 * サイドバー描画領域
 */
export function SidenavContainer({
  auth,
}: {
  auth: Awaited<ReturnType<typeof getAuth>>;
}) {
  const { isSidenavOpen, setIsSidenavOpen, isSidenavHide } =
    useContext(BodyStateContext);

  // // sidenavの状態をauthしていない場合は開かないようにする
  // useEffect(() => {
  //   setIsSidenavHide(auth == null);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth]);

  return (
    <>
      {/* サイドバー表示時に他の箇所をクリックしたときにサイドバーを閉じるための判定エリア */}
      {isSidenavOpen && !isSidenavHide && (
        <div
          className='fixed top-0 left-0 h-full w-full z-40'
          onClick={() => setIsSidenavOpen(false)}
        />
      )}

      <Sidenav auth={auth} />
    </>
  );
}
