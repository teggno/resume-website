import "rheostat/initialize";
import React from "react";
import { fromPairs, range } from "ramda";
import Rheostat from "rheostat";
import "rheostat/css/rheostat.css";

export default function YearsBackSlider(props: {
  yearFrom: number;
  yearTo: number;
  year: number;
  onDragging?: (year: number) => void;
  // no implementation of onDragged because this would map to input[@type="range"].onChange but this behaves like onInput in some browsers.
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
    // <Rheostat
    //   min={0}
    //   max={yearDiff}
    //   values={[props.yearTo - props.year]}
    //   snap={true}
    //   snapPoints={range(0, yearDiff + 1)}
    //   onValuesUpdated={s => {
    //     if (props.onChange) props.onChange(props.yearTo - s.values[0]);
    //   }}
    //   onChange={s => {
    //     if (props.onAfterChange)
    //       props.onAfterChange(props.yearTo - s.values[0]);
    //   }}
    // />
  );
}
