export function trying<T>(fun: () => T, verbose = true) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    return fun();
  } catch (e) {
    if (verbose) {
      console.error(e);
    }
    return undefined;
  }
}
