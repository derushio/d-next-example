'use client';

import { useIsMountedCheck } from '@/hooks/useIsMountedCheck';
import { useBreakpoint } from '@/hooks/useMediaQuery';
import { Button, Toast } from 'flowbite-react';
import { ReactNode, createContext, useContext, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useInterval } from 'usehooks-ts';

/**
 * トーストステート、アニメの更新頻度
 */
const frameper = 50;

/**
 * トーストの表示時間
 */
const animMaxCount = 6000 / frameper;
/**
 * トーストの切り替え時間
 */
const animCount = 150 / frameper;

export type ToastStateContextType = {
  toasts: ReactNode[];
  setToasts: (toasts: ReactNode[]) => void;
  addToast: (toast: ReactNode) => void;
};

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

/**
 * トーストコンポーネント
 */
export function AppToast() {
  const { toasts, setToasts } = useContext(ToastStateContext);

  const [isMounted] = useIsMountedCheck();
  const { isSm } = useBreakpoint('sm');

  const [animCounter, setAnimCounter] = useState(0);
  const [currentToast, setCurrentToast] = useState<ReactNode>();

  /**
   * frameper時間ごとに以下のどちらかの動作を行う
   * 1. トーストステートから新しいトーストを取得しアニメーションを開始する
   * 2. トーストのアニメーションカウンタを+1する
   */
  useInterval(() => {
    if (currentToast && animCounter < animMaxCount) {
      setAnimCounter(animCounter + 1);
    } else {
      setCurrentToast(toasts[0]);
      setToasts(toasts.filter((_, i) => 0 < i));

      setAnimCounter(0);
    }
  }, frameper);

  /**
   * トーストのY座標を算出する
   */
  function toastTranslateY() {
    let y = '500%';
    if (animCounter < animCount) {
      // 表示するアニメーション
      y = '500%';
    } else if (animCounter < animMaxCount - animCount * 2) {
      // animCount * 2なのは隠してから隠してる状態をanimCountだけ維持させるため
      // 表示する
      y = '0';
    } else {
      // 隠すアニメーション
      y = '500%';
    }

    return y;
  }

  return (
    <div className='fixed z-30 top-0 left-0 right-0 h-full pointer-events-none ml-0 sm:ml-72'>
      <div className='relative top-0 left-0 w-full h-full'>
        {isMounted && isSm && (
          <div
            className='absolute bottom-4 -translate-x-1/2 px-2 w-full sm:w-auto'
            style={{
              left: isSm ? 'calc(50% - 26px - 0.125rem - 0.5rem)' : '50%',
            }}
          >
            <Toast
              className='pointer-events-auto transition-transform w-full max-w-full'
              style={{
                transform: `translateY(${toastTranslateY()})`,
              }}
            >
              <div className='w-full flex justify-between items-center gap-2'>
                {currentToast}
                <Button size='26px' color='gray'>
                  <IoCloseOutline
                    size='24px'
                    onClick={() => {
                      // 隠すアニメーションを即時起動
                      setAnimCounter(animMaxCount - animCount * 2);
                    }}
                  />
                </Button>
              </div>
            </Toast>
          </div>
        )}
      </div>
    </div>
  );
}
