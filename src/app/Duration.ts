export default class Duration {
  constructor(
    public readonly years: number,
    public readonly months: number = 0
  ) {}

  text() {
    return Duration.text(this.years, this.months);
  }

  static text(years: number, months: number = 0) {
    return `${years ? `${years} year${years === 1 ? "" : "s"}` : ""}${
      years && months ? " " : ""
    }${months ? `${months} month${months === 1 ? "" : "s"}` : ""}`;
  }
}
