export function applyOrDefault<TIn, TOut>(
  fn: (x: TIn) => TOut,
  x: TIn | null | undefined,
  defaultValue: TOut
) {
  return x === null || x === undefined ? defaultValue : fn(x);
}

export function applyToOrDefault<T, TOut>(
  fnOrNot: ((x: T) => TOut) | null | undefined,
  x: T,
  defaultValue: TOut
) {
  return fnOrNot ? fnOrNot(x) : defaultValue;
}

function by<TIn, TOut extends Sortable>(projection: (i: TIn) => TOut, ltOrGt: (a:TOut, b:TOut) => boolean){
  return (a: TIn, b: TIn) => {
    const a2 = projection(a),
      b2 = projection(b);
    return a2 === b2 ? 0 : (ltOrGt(a2, b2) ? -1 : 1);
  };
}

export function byAsc<TIn, TOut extends Sortable>(projection: (i: TIn) => TOut) {
  return by(projection, lt);
}

export function byDesc<TIn, TOut extends Sortable>(projection: (i: TIn) => TOut) {
  return by(projection, gt);
}

function gt(a: Sortable, b: Sortable){
  return a > b;
}

function lt(a: Sortable, b: Sortable){
  return a < b;
}

type Sortable = string | number | boolean;