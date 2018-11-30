import { min, max } from "ramda";

export function fromToChart<TItem>(
  from: (item: TItem) => number,
  to: (item: TItem) => number,
  chartMin?: number,
  chartMax?: number
) {
  return (items: TItem[]) => {
    const [minFrom, maxTo] =
      chartMin === undefined || chartMax === undefined
        ? items.reduce(
            (prev, current) => {
              return [
                chartMin === undefined ? min(prev[0], from(current)) : chartMin,
                chartMax === undefined ? max(prev[1], to(current)) : chartMax
              ];
            },
            [Number.MAX_VALUE, Number.MIN_VALUE]
          )
        : [chartMin, chartMax];
    return {
      chartMin: minFrom,
      barFrom: from,
      barTo: to,
      chartMax: maxTo
    };
  };
}

export function zeroBasedCharts<TItem>(to: (item: TItem) => number) {
  return fromToChart(() => 0, to, 0);
}
