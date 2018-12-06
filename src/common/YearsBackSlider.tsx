import React from "react";

export default function YearsBackSlider(props: {
  yearFrom: number;
  yearTo: number;
  year: number;
  onDragging?: (year: number) => void;
  // no implementation of onDragged because this would map to
  // input[@type="range"].onChange but this behaves like onInput in some
  // browsers.
}) {
  const yearDiff = props.yearTo - props.yearFrom;
  return (
    <div className="flex mw7-l">
      <div className="v-mid">this year</div>
      <input
        type="range"
        min={0}
        max={yearDiff}
        value={props.yearTo - props.year}
        onInput={onChange}
        className="v-mid ph2"
        style={{ flex: 1 }}
      />
      <input
        className="w2 mr2 tr"
        value={props.yearTo - props.year}
        onChange={onChange}
        type="number"
        max={yearDiff}
        onClick={e => e.currentTarget.select()}
      />
      <div className="v-mid"> years back</div>
    </div>
  );

  function calcYear(value: string) {
    return props.yearTo - parseInt(value);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.onDragging) props.onDragging(calcYear(e.currentTarget.value));
  }
}
