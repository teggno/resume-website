import Month from "../src/Month";
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

  it("should initialize correctly from a number of months since B of C", () => {
    expect(Month.fromTotalMonths(24221)).eql(new Month(2018, 5));
  });

  it("should calculate the correct totalMonths", () => {
    const month = new Month(1, 5);
    expect(month.totalMonths()).to.eql(17);
  });

  it("should return the correct startTime", () => {
    const month = new Month(2018, 5);
    const startTime = month.startTime();
    expect(startTime.toISOString()).to.eql("2018-04-30T22:00:00.000Z");
  });

  it("should return the correct startTime", () => {
    const month = new Month(2018, 5);
    const startTime = month.endTime();
    expect(startTime.toISOString()).to.eql("2018-05-31T21:59:59.999Z");
  });

  it ("should calculate the durationUntil correctly if it's less than 12 months", () => {
    const month = new Month(2017, 5);
    const duration = month.durationUntil(new Month (2017, 7));
    expect(duration).to.eql({years: 0, months: 3});
  });

  it ("should calculate the durationUntil correctly if it's more than 12 months", () => {
    const month = new Month(2017, 5);
    const duration = month.durationUntil(new Month (2018, 7));
    expect(duration).to.eql({years: 1, months: 3});
  });

  it("should add a positive number of months correctly without year switch", () =>{
    expect(new Month(2018, 5).add(2)).to.eql(new Month(2018, 7));
  });

  it("should add a positive number of months correctly with year switch", () =>{
    expect(new Month(2018, 5).add(13)).to.eql(new Month(2019, 6));
  });

  it("should subtract positive number of months correctly without year switch", () =>{
    expect(new Month(2018, 5).add(-2)).to.eql(new Month(2018, 3));
  });

  it("should subtract positive number of months correctly with year switch", () =>{
    expect(new Month(2018, 5).add(-13)).to.eql(new Month(2017, 4));
  });
});
