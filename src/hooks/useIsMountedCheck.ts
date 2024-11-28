import { differenceInMilliseconds } from 'date-fns';
import { useState } from 'react';
import { useInterval, useIsMounted } from 'usehooks-ts';

const fastSamplingRate = 100;
const slowSamplingRate = 1000;
const isMountedDelayMillis = 3000;

/**
 * useIsMountedが更新不良になるので対策を行う
 */
export function useIsMountedCheck() {
  const isMountedTs = useIsMounted();

  const [isMounted, setIsMounted] = useState(false);
  const [isMountedAt, setIsMountedAt] = useState<Date>();
  const [isMountedDelay, setIsMountedDelay] = useState(false);
  const [samplingRate, setSamplingRate] = useState(fastSamplingRate);

  useInterval(() => {
    if (!isMountedTs()) {
      if (!isMounted) {
        return;
      }

      // unmountの記録
      setIsMounted(false);
      setIsMountedAt(undefined);
      setIsMountedDelay(false);
      setSamplingRate(fastSamplingRate);
    }

    if (!isMounted) {
      // mountedの記録
      setIsMounted(true);
      setIsMountedAt(new Date());
      setSamplingRate(slowSamplingRate);
    }

    if (!isMountedDelay) {
      if (
        isMountedAt &&
        isMountedDelayMillis < differenceInMilliseconds(new Date(), isMountedAt)
      ) {
        // isMountedDelayの記録
        setIsMountedDelay(true);
      }
    }
  }, samplingRate);

  return { isMounted, isMountedDelay };
}
