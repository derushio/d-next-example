import { useState } from 'react';
import { useInterval, useIsMounted } from 'usehooks-ts';

const fastSamplingRate = 100;
const slowSamplingRate = 1000;

/**
 * useIsMountedが更新不良になるので対策を行う
 */
export function useIsMountedCheck() {
  const isMountedTs = useIsMounted();

  const [isMounted, setIsMounted] = useState(false);
  const [samplingRate, setSamplingRate] = useState(fastSamplingRate);

  useInterval(() => {
    if (!isMountedTs()) {
      if (!isMounted) {
        return;
      }

      setIsMounted(false);
      setSamplingRate(fastSamplingRate);
    }

    if (!isMounted) {
      setIsMounted(true);
      setSamplingRate(slowSamplingRate);
    }
  }, samplingRate);

  return [isMounted];
}
