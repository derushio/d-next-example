'use client';

import { AppToast } from '@/components/atom/general/toast/AppToast';
import { Sidenav } from '@/components/navigation/Sidenav';
import { Header } from '@/components/navigation/header/Header';
import type { AuthType } from '@/data-accesses/infra/nextAuth';
import { ReactNode, createContext, useEffect, useState } from 'react';

type BodyStateContextType = {
  auth: AuthType;
  isSidenavOpen: boolean;
};

type ToastStateContextType = {
  toasts: ReactNode[];
  setToasts: (toasts: ReactNode[]) => void;
  addToast: (toast: ReactNode) => void;
};

/**
 * Body内全体で使用するステートコンテキスト
 */
export const BodyStateContext = createContext<BodyStateContextType>({
  auth: null,
  isSidenavOpen: false,
});

/**
 * トーストのステートコンテキスト
 */
export const ToastStateContext = createContext<ToastStateContextType>({
  toasts: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setToasts(toasts: ReactNode[]) {
    return;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToast(toast: ReactNode) {
    return;
  },
});

export function BodyContainer({
  children,
  auth,
}: {
  children: ReactNode;
  auth: AuthType;
}) {
  /**
   * Body内全体で使用するステート
   */
  const [bodyState, setBodyState] = useState<BodyStateContextType>({
    auth: null,
    isSidenavOpen: false,
  });

  /**
   * トーストのステートコンテキスト
   */
  const [toastState, setToastState] = useState<ToastStateContextType>({
    toasts: [],
    setToasts(toasts) {
      setToastState({
        ...toastState,
        toasts: toasts,
      });
    },
    addToast(toast) {
      setToastState({
        ...toastState,
        toasts: [...toastState.toasts, toast],
      });
    },
  });

  // authの変化をステートに反映
  useEffect(() => {
    setBodyState({
      ...bodyState,
      auth: auth,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <BodyStateContext.Provider value={bodyState}>
      <ToastStateContext.Provider value={toastState}>
        <div className='absolute'>
          {/* サイドバー表示時に他の箇所をクリックしたときにサイドバーを閉じるための判定エリア */}
          {bodyState.isSidenavOpen && (
            <div
              className='fixed h-full w-full z-30'
              onClick={() =>
                setBodyState({
                  ...bodyState,
                  isSidenavOpen: false,
                })
              }
            />
          )}
          <Sidenav />
        </div>

        <div className='relative h-full ml-0 sm:ml-72'>
          <Header
            onSidenavSwitch={() =>
              setBodyState({
                ...bodyState,
                isSidenavOpen: !bodyState.isSidenavOpen,
              })
            }
          />

          {/* ページ本体 */}
          <div className='h-full w-full overflow-x-hidden pt-14'>
            {children}
          </div>
        </div>

        <AppToast />
      </ToastStateContext.Provider>
    </BodyStateContext.Provider>
  );
}
