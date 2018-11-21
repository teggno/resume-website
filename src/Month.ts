export default class Month {
  /**
   *
   * @param year A year (e.g. 2018)
   * @param month A number between 1 and 12
   */
  constructor(public readonly year: number, public readonly month: number) {
    if (month < 1 || month > 12)
      throw new Error("Month must be between 1 and 12.");
  }

  /**
   *
   * @param month a string in the format yyyy-mm
   */
  static parse(month: string): Month {
    if (month === undefined) throw new Error("month is undefined");
    if (month === null) throw new Error("month is null");
    return new Month(
      parseInt(month.substr(0, 4)),
      parseInt(month.substr(5, 2))
    );
  }

  static minValue = new Month(0, 1);

  static maxValue = new Month(9999, 1);

  totalMonths() {
    return Month.totalMonths(this);
  }

  add(months: number) {
    return Month.fromTotalMonths(this.totalMonths() + months);
  }

  durationUntil(to: Month) {
    return Month.duration(this, to);
  }

  startTime() {
    return new Date(this.year, this.month - 1);
  }

  endTime() {
    const next = this.add(1);
    return new Date(new Date(next.year, next.month - 1).valueOf() - 1);
  }

  static duration(from: Month, to: Month) {
    const diff = to.totalMonths() - from.totalMonths() + 1;
    return {
      years: Math.floor(diff / 12),
      months: diff % 12
    };
  }

  static fromDate(date: Date) {
    return new Month(date.getFullYear(), date.getMonth() + 1);
  }

  static fromTotalMonths(totalMonths: number) {
    return new Month(
      Math.floor(totalMonths / 12),
      totalMonths % 12 === 0 ? 12 : totalMonths % 12
    );
  }

  static totalMonths(month: Month) {
    return month.year * 12 + month.month;
  }
}

export function formatDateAsYearMonth(d: Date) {
  return `${d.getFullYear()}/${d.getMonth() + 1}`;
}