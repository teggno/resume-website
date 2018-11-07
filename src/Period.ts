import Month from "./Month";

export default class Period {
  constructor(public readonly from: Month, public readonly to?: Month) {
    if (to && from.totalMonths() > to.totalMonths()) {
      throw new Error("from must be before or at the same time as to");
    }
  }

  overlaps(other: Period): boolean {
    return Period.overlap(this, other);
  }

  static overlap(a: Period, b: Period): boolean {
    // Cases for overlapping
    // Case 1
    // a ----------|------|------
    // b -------|-----|----------
    // Case 2
    // a -------|-----|----------
    // b ----------|------|------
    // Case 3
    // a -------|----------|------
    // b --------|-----|----------
    // Case 4
    // a --------|-----|----------
    // b -------|----------|------
    // Cases for not overlapping
    // Case 1: a.from > b.to
    // a ---------------|------|-
    // b -------|-----|----------
    // Case 2: a.to < b.from
    // a -------|-----|----------
    // b ---------------|------|-
    // => expressing not overlapping criteria is easier (a.from > b.to || a.to < b.from)

    return !(
      a.to &&
      b.to &&
      (a.from.totalMonths() > b.to.totalMonths() ||
        a.to.totalMonths() < b.from.totalMonths())
    );
  }
}
