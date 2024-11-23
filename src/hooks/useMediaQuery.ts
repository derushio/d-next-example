import { fullTailwindConfig } from '@/data-accesses/infra/tailwind';
import { useMediaQuery } from 'react-responsive';

const breakpoints = fullTailwindConfig.theme.screens;

type BreakpointKey = keyof typeof breakpoints;

/**
 * breakpointを解決
 */
export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
