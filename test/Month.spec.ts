import Month from "../src/app/Month";
import { expect } from "chai";

describe("Month", () => {
  it("should have initialize correctly from constructor", () => {
    const month = new Month(2018, 5);
    expect(month.year).to.eql(2018);
    expect(month.month).to.eql(5);
  });

  it("should parse a string in the format yyyy-mm correctly", () => {
    const month = Month.parse("2018-05");
    expect(month.year).to.eql(2018);
    expect(month.month).to.eql(5);
  });

  it("should initialize correctly from a number of months since B of C", () => {
    expect(Month.fromTotalMonths(2)).eql(new Month(0, 2));
  });

  it("should initialize correctly from a number of months since A of C if December", () => {
    const { ...act } = Month.fromTotalMonths(24108);
    expect(act).eql({ year: 2008, month: 12 });
  });

  it("should initialize correctly from a number of months since A of C if not December", () => {
    const { ...act } = Month.fromTotalMonths(24107);
    expect(act).eql({ year: 2008, month: 11 });
  });

  it("should calculate the correct totalMonths B of C", () => {
    const month = new Month(1, 5);
    expect(month.totalMonths()).to.eql(17);
  });

  it("should calculate the correct totalMonths A of C", () => {
    const month = new Month(2008, 11);
    expect(month.totalMonths()).to.eql(24107);
  });

  it("should return the correct startTime", () => {
    const month = new Month(2018, 5);
    const startTime = month.startTime();
    expect(startTime.toISOString()).to.eql("2018-04-30T22:00:00.000Z");
  });

  it("should return the correct endTime", () => {
    const month = new Month(2018, 5);
    const endTime = month.endTime();
    expect(endTime.toISOString()).to.eql("2018-05-31T21:59:59.999Z");
  });

  it("should calculate the durationUntil correctly if it's less than 12 months", () => {
    const month = new Month(2017, 5);
    const { years, months } = month.durationUntil(new Month(2017, 7));
    expect({ years, months }).to.eql({ years: 0, months: 3 });
  });

  it("should calculate the durationUntil correctly if it's more than 12 months", () => {
    const month = new Month(2017, 5);
    const { years, months } = month.durationUntil(new Month(2018, 7));
    expect({ years, months }).to.eql({ years: 1, months: 3 });
  });

  it("should make equivalent fromTotalMonths and totalMonths", () => {
    const exp = new Month(2008, 11),
       { ...act } = Month.fromTotalMonths(exp.totalMonths());
    expect(act).to.eql({...exp});
  });

  it("should add a positive number of months correctly without year switch", () => {
    const {...act} = new Month(2008, 11).add(1);
    expect(act).to.eql({year: 2008, month: 12});
  });

  it("should add a positive number of months correctly with year switch", () => {
    expect(new Month(2018, 5).add(13)).to.eql(new Month(2019, 6));
  });

  it("should subtract positive number of months correctly without year switch", () => {
    expect(new Month(2018, 5).add(-2)).to.eql(new Month(2018, 3));
  });

  it("should subtract positive number of months correctly with year switch", () => {
    expect(new Month(2018, 5).add(-13)).to.eql(new Month(2017, 4));
  });

  it("should return the minimum of two months if the year is the same", () => {
    expect(Month.min(new Month(2007, 5), new Month(2007, 4))).to.eql(
      new Month(2007, 4)
    );
  });

  it("should return the minimum of two months if the year differs", () => {
    expect(Month.min(new Month(2008, 5), new Month(2007, 4))).to.eql(
      new Month(2007, 4)
    );
  });

  it("should return the maximum of two months if the year is the same", () => {
    expect(Month.max(new Month(2007, 5), new Month(2007, 4))).to.eql(
      new Month(2007, 5)
    );
  });

  it("should return the maximum of two months if the year differs", () => {
    expect(Month.max(new Month(2008, 5), new Month(2007, 4))).to.eql(
      new Month(2008, 5)
    );
  });

  it("toString() should return a string in the format yyyy/mm if the month has only a single digit", () => {
    expect(new Month(2008, 5).toString()).to.equal("2008/05");
  });

  it("toString() should return a string in the format yyyy/mm if the month has two digits", () => {
    expect(new Month(2008, 12).toString()).to.equal("2008/12");
  });

  it("should correctly calculate the difference between two months of the same year", () => {
    expect(Month.diff(new Month(2008, 7), new Month(2008, 12))).to.equal(5);
  });

  it("should correctly calculate the difference between two months of different years", () => {
    expect(Month.diff(new Month(2007, 7), new Month(2008, 12))).to.equal(17);
  });

  it("should calculate 0 as the difference between two equal months", () => {
    expect(Month.diff(new Month(2007, 7), new Month(2007, 7))).to.equal(0);
  });
});
