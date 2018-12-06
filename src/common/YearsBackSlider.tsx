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
    <>
      <div className="dib v-mid">this year</div>
      {"\n"}
      <input
        type="range"
        min={0}
        max={yearDiff}
        value={props.yearTo - props.year}
        onInput={e => {
          if (props.onDragging)
            props.onDragging(props.yearTo - parseInt(e.currentTarget.value));
        }}
        className="dib v-mid w5-ns"
      />
      {"\n"}
      <div className="dib v-mid">up to {yearDiff} years back</div>
    </>
  );
}
