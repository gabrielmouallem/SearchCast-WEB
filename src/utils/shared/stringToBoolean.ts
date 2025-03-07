export function stringToBoolean(value: string): boolean {
  if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') {
          return true;
      } else if (value.toLowerCase() === 'false') {
          return false;
      }
  }
  return false;
}