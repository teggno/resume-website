import Duration from "./Duration";

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

  monthsUntil(to: Month) {
    return Month.diff(this, to);
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

  toString() {
    return this.month < 10
      ? `${this.year}/0${this.month}`
      : `${this.year}/${this.month}`;
  }

  name() {
    return MonthNames.byOneBasedIndex(this.month);
  }

  nameShort() {
    return MonthNames.byOneBasedIndexShort(this.month);
  }

  nameYear() {
    return `${this.name()} ${this.year}`;
  }

  nameYearShort() {
    return `${this.nameShort()} ${this.year}`;
  }

  static duration(from: Month, to: Month) {
    const diff = Month.diff(from, to) + 1;
    return new Duration(Math.floor(diff / 12), diff % 12);
  }

  static diff(from: Month, to: Month) {
    return to.totalMonths() - from.totalMonths();
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

  static min(a: Month, b: Month) {
    return a.totalMonths() < b.totalMonths() ? a : b;
  }

  static max(a: Month, b: Month) {
    return a.totalMonths() > b.totalMonths() ? a : b;
  }
}

class MonthNames {
  static byOneBasedIndex(index: number) {
    if (index < 1 || index > 12 || Math.round(index) !== index) {
      throw new Error("Only integers between 1 and 12 allowed.");
    }
    return this.monthNames[index - 1];
  }
  static byOneBasedIndexShort(index: number) {
    if (index < 1 || index > 12 || Math.round(index) !== index) {
      throw new Error("Only integers between 1 and 12 allowed.");
    }
    return this.monthNamesShort[index - 1];
  }
  private static monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "September"
  ];
  private static monthNamesShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Sep"
  ];
}
