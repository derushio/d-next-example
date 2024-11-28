'use client';

import {
  ToastStateContext,
  ToastStateContextType,
} from '@/components/atom/general/toast/AppToast';
import { useIsMountedCheck } from '@/hooks/useIsMountedCheck';
import { ReactNode, createContext, useEffect, useState } from 'react';

type BodyStateContextType = {
  isSidenavOpen: boolean;
  isSidenavHide: boolean;
  /** sidenav分のmargin */
  sidenavMargin: string;
};

/**
 * Body内全体で使用するステートコンテキスト
 */
export const BodyStateContext = createContext<
  BodyStateContextType & {
    setIsSidenavOpen: (value: boolean) => void;
    setIsSidenavHide: (value: boolean) => void;
  }
>({
  isSidenavOpen: false,
  isSidenavHide: false,
  sidenavMargin: 'sm:ml-72',

  setIsSidenavOpen(value) {
    value;
    return;
  },
  setIsSidenavHide(value) {
    value;
    return;
  },
});

/**
 * 全体向けContextを生成するためのコンポーネント
 */
export function BodyClient({ children }: { children: ReactNode }) {
  const { isMountedDelay } = useIsMountedCheck();

  /**
   * Body内全体で使用するステート
   */
  const [bodyState, setBodyState] = useState<BodyStateContextType>({
    isSidenavOpen: false,
    isSidenavHide: false,
    sidenavMargin: 'sm:ml-72',
  });

  function setIsSidenavOpen(value: boolean) {
    setBodyState({
      ...bodyState,
      isSidenavOpen: value,
    });
  }
  function setIsSidenavHide(value: boolean) {
    setBodyState({
      ...bodyState,
      isSidenavHide: value,
    });
  }

  /**
   * トーストのステートコンテキスト
   */
  const [toastState, setToastState] = useState<ToastStateContextType>({
    toasts: [],
  });

  function setToasts(toasts: ReactNode[]) {
    setToastState({
      ...toastState,
      toasts: toasts,
    });
  }
  function addToast(toast: ReactNode) {
    setToastState({
      ...toastState,
      toasts: [...toastState.toasts, toast],
    });
  }

  // sidenav分のmarginを更新
  useEffect(() => {
    setBodyState({
      ...bodyState,
      sidenavMargin: bodyState.isSidenavHide ? 'sm:ml-0' : 'sm:ml-72',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyState.isSidenavHide]);

  return (
    <BodyStateContext.Provider
      value={{ ...bodyState, setIsSidenavOpen, setIsSidenavHide }}
    >
      <ToastStateContext.Provider
        value={{ ...toastState, setToasts, addToast }}
      >
        <div
          className={`h-full ml-0 ${isMountedDelay ? 'transition-margin' : ''} ${bodyState.sidenavMargin}`}
        >
          {children}
        </div>
      </ToastStateContext.Provider>
    </BodyStateContext.Provider>
  );
}
