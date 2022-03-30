/**
 * Returns an iterator that iterates integers in [start, end).
 */
export function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}
