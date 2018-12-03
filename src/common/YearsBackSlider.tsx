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
      <span>today</span>
      <input
        type="range"
        min={0}
        max={yearDiff}
        onInput={e => {
          if (props.onDragging)
            props.onDragging(props.yearTo - parseInt(e.currentTarget.value));
        }}
      />
      <span>{yearDiff} years back</span>
    </>
  );
}
