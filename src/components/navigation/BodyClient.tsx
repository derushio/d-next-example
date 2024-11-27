'use client';

import {
  ToastStateContext,
  ToastStateContextType,
} from '@/components/atom/general/toast/AppToast';
import { ReactNode, createContext, useState } from 'react';

type BodyStateContextType = {
  isSidenavOpen: boolean;
  setIsSidenavOpen: (value: boolean) => void;
};

/**
 * Body内全体で使用するステートコンテキスト
 */
export const BodyStateContext = createContext<BodyStateContextType>({
  isSidenavOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsSidenavOpen(value) {
    return;
  },
});

/**
 * 全体向けContextを生成するためのコンポーネント
 */
export function BodyClient({ children }: { children: ReactNode }) {
  /**
   * Body内全体で使用するステート
   */
  const [bodyState, setBodyState] = useState<BodyStateContextType>({
    isSidenavOpen: false,
    setIsSidenavOpen(value) {
      setBodyState({
        ...bodyState,
        isSidenavOpen: value,
      });
    },
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

  return (
    <BodyStateContext.Provider value={bodyState}>
      <ToastStateContext.Provider value={toastState}>
        {children}
      </ToastStateContext.Provider>
    </BodyStateContext.Provider>
  );
}
