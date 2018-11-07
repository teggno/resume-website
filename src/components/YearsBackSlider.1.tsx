import 'rheostat/initialize';
import React from "react";
import { fromPairs } from "ramda";
import Rheostat from 'rheostat';
import "rheostat/css/rheostat.css";

export default function YearsBackSlider(props: {
  yearFrom: number;
  yearTo: number;
  year: number;
  onChange?: (year: number) => void;
  onAfterChange?: (year: number) => void;
}) {
  const yearDiff = props.yearTo - props.yearFrom;
  return (
    <Rheostat
      min={0}
      max={yearDiff}
      values={[props.yearTo - props.year]}
      // marks={fromPairs([
      //   ["0", "today"],
      //   [`${yearDiff}`, `${yearDiff} years back`]
      // ])}
      // defaultValue={props.yearTo - props.year}
      onValuesUpdated={s => {
        if (props.onChange) props.onChange(props.yearTo - s.values[0]);
      }}
      onChange={s => {
        if (props.onAfterChange) props.onAfterChange(props.yearTo - s.values[0]);
      }}
    />
  );
}
