import React from "react";
import { chartBackground } from "../css";
import "./TimelineChart.css";
import { min, max } from "ramda";
import { percent } from "../app/format";

export default function TimelineChart(props: TimelineProps) {
  const formatAxisLabel = props.formatAxisLabel || (d => d.toLocaleString()),
    eventsSorted = props.events.sort(
      (a, b) => a.from.valueOf() - b.from.valueOf()
    ),
    [minFrom, maxTo] = extractMinMax(eventsSorted, props.to),
    segmentClassName =
      "bar absolute h1" + (props.onEventClicked ? " pointer" : "");

  return (
    <div className={"pa2 " + chartBackground}>
      <div className="pa2">
        <div className="relative h1">
          <div className="absolute ba b--light-silver left-0 right-0 h1" />
          {eventsSorted.map((e, i) => (
            <div
              key={i}
              className={segmentClassName}
              title={e.label}
              style={{
                left: percent(dateToFraction(minFrom, maxTo, e.from)),
                right: percent(
                  1 - dateToFraction(minFrom, maxTo, e.to || props.to)
                ),
                backgroundColor: e.color
              }}
              onClick={() => {
                if (props.onEventClicked) props.onEventClicked(e);
              }}
            />
          ))}
        </div>
      </div>
      <div className="relative h1">
        <div className="absolute left-0">{formatAxisLabel(minFrom)}</div>
        <div className="absolute right-0">{formatAxisLabel(maxTo)}</div>
      </div>
    </div>
  );
}

function extractMinMax(events: { from: Date; to?: Date }[], defaultTo: Date) {
  const [minFrom, maxTo] = events.reduce(
    (prev, current) => {
      return [
        min(current.from.valueOf(), prev[0]),
        max((current.to || defaultTo).valueOf(), prev[1])
      ];
    },
    [Number.MAX_VALUE, Number.MIN_VALUE]
  );
  return [new Date(minFrom), new Date(maxTo)];
}

function dateToFraction(min: Date, max: Date, date: Date) {
  const diffMinMax = max.valueOf() - min.valueOf(),
    diffDate = date.valueOf() - min.valueOf();

  return diffDate / diffMinMax;
}

interface TimelineProps {
  events: Event[];
  to: Date;
  formatAxisLabel?: (date: Date) => string;
  onEventClicked?: (e: Event) => void;
}

interface Event {
  from: Date;
  to?: Date;
  label?: string;
  color: string;
}
