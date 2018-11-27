export function applyOrDefault<TIn, TOut>(
  fn: (x: TIn) => TOut,
  x: TIn | null | undefined,
  defaultValue: TOut
) {
  return x === null || x === undefined ? defaultValue : fn(x);
}