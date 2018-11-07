import "rc-slider/assets/index.css";
import React from "react";
import Slider from "rc-slider";
import { fromPairs } from "ramda";

export default function YearsBackSlider(props: {
  yearFrom: number;
  yearTo: number;
  year: number;
  onChange?: (year: number) => void;
  onAfterChange?: (year: number) => void;
}) {
  const yearDiff = props.yearTo - props.yearFrom;
  return (
    <Slider
      min={0}
      max={yearDiff}
      marks={fromPairs([
        ["0", "today"],
        [`${yearDiff}`, `${yearDiff} years back`]
      ])}
      defaultValue={props.yearTo - props.year}
      onChange={value => {
        if (props.onChange) props.onChange(props.yearTo - value);
      }}
      onAfterChange={value => {
        if (props.onAfterChange) props.onAfterChange(props.yearTo - value);
      }}
    />
  );
}
