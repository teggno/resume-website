/**
 * Creates a compare function from two pairs of (projection, sortDirection)
 * functions.
 * @param p1 Function returning the value to consider first when sorting.
 * @param d1 First sort order
 * @param p2 Function returning the value to consider second when sorting.
 * @param d2 Second sort order
 */
export function comparer<T, TP1, TP2>(
  p1: (t: T) => TP1,
  d1: (p: (t: T) => TP1) => ((a: T, b: T) => number),
  p2: (t: T) => TP2,
  d2: (p: (t: T) => TP2) => ((a: T, b: T) => number)
) {
  return (a: T, b: T) => (p1(a) === p1(b) ? d2(p2)(a, b) : d1(p1)(a, b));
}
