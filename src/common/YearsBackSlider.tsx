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
  const yearDiff = props.yearTo - props.yearFrom,
    value = props.yearTo - props.year;
  return (
    <div className="flex mw7-l">
      <input
        className="v-mid pr2 pv0" // <-- the pv0 is for IE11
        type="range"
        min={1}
        max={yearDiff}
        value={value}
        onChange={onChange}
        style={{ flex: 1 }}
      />
      <input
        className="w2 mr2 tr"
        type="number"
        min={1}
        max={yearDiff}
        value={value}
        onChange={onChange}
        onClick={e => e.currentTarget.select()}
      />
      <div className="v-mid w4">{value === 1 ? " year back" : " years back"}</div>
    </div>
  );

  function calcYear(value: string) {
    return props.yearTo - parseInt(value);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.onDragging) props.onDragging(calcYear(e.currentTarget.value));
  }
}
