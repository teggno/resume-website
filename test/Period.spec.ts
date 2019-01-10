import { expect } from "chai";
import Period from "../src/app/Period";
import Month from "../src/app/Month";

describe("Period", () => {
  it("should initialize from calling the constructor with from and to", () => {
    const period = new Period(new Month(2018, 2), new Month(2018, 4));
    expect(period.from).to.eql(new Month(2018, 2));
    expect(period.to).to.eql(new Month(2018, 4));
  });

  it("should throw if to is before from", () => {
    expect(() => new Period(new Month(2018, 2), new Month(2017, 4))).to.throw;
  });

  it("should initialize from calling the constructor with from only", () => {
    const period = new Period(new Month(2018, 2));
    expect(period.from).to.eql(new Month(2018, 2));
    expect(period.to).to.equal(undefined);
  });

  it("should determine two consecutive periods with a gap in between don't overlap", () => {
    const period1 = new Period(new Month(2017, 3), new Month(2018, 2));
    const period2 = new Period(new Month(2018, 4), new Month(2018, 6));
    expect(period1.overlaps(period2)).to.be.false;
  });

  it("should determine two consecutive periods with no gap in between don't overlap", () => {
    const period1 = new Period(new Month(2017, 3), new Month(2018, 2));
    const period2 = new Period(new Month(2018, 3), new Month(2018, 6));
    expect(period1.overlaps(period2)).to.be.false;
  });

  it("should determine two intersecting periods to overlap", () => {
    const period1 = new Period(new Month(2017, 3), new Month(2018, 2));
    const period2 = new Period(new Month(2017, 12), new Month(2018, 6));
    expect(period1.overlaps(period2)).to.be.true;
  });

  it("should determine two periods where the first fully contains the second to overlap", () => {
    const period1 = new Period(new Month(2015, 3), new Month(2018, 2));
    const period2 = new Period(new Month(2017, 12), new Month(2018, 1));
    expect(period1.overlaps(period2)).to.be.true;
  });

  it("should determine two periods where the second fully contains the second to overlap", () => {
    const period1 = new Period(new Month(2015, 3), new Month(2018, 2));
    const period2 = new Period(new Month(2017, 12), new Month(2018, 1));
    expect(period2.overlaps(period1)).to.be.true;
  });
});
