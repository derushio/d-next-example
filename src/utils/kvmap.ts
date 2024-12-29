import { objectkeys } from '@/utils/objectkeys';

/**
 * オブジェクトのキーと値をマッピングして新しい配列を作成します。
 */
export function kvmap<T, U>(
  obj: Record<string, T>,
  fn: (key: string, value: T, index: number) => U,
): U[] {
  return objectkeys(obj).map((key, i) => {
    return fn(key, obj[key], i);
  });
}
