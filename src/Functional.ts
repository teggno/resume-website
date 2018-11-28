export function applyOrDefault<TIn, TOut>(
  fn: (x: TIn) => TOut,
  x: TIn | null | undefined,
  defaultValue: TOut
) {
  return x === null || x === undefined ? defaultValue : fn(x);
}


export function by<TIn, TOut extends Sortable>(projection: (i: TIn) => TOut) {
  return (a: TIn, b: TIn) => {
    const a2 = projection(a),
      b2 = projection(b);
    return a2 === b2 ? 0 : (a2 < b2 ? -1 : 1);
  };
}

type Sortable = string | number | boolean;