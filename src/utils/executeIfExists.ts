export function executeIfExists<T>(
  value: T | null | undefined,
  callback: (value: T) => void,
): void {
  if (!!value) {
    callback(value);
  }
}
