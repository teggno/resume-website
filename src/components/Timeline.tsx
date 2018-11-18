import React from "react";
import { chartBackground } from "../css";
import "./Timeline.css";
import nthColor from "../Colors";

export default function Timeline(props: TimelineProps) {
  const { events } = props;
  const formatAxisLabel = props.formatAxisLabel || (d => d.toLocaleString());

  const eventsSorted = events.sort(
    (a, b) => a.from.valueOf() - b.from.valueOf()
  );
  const [min, max] = extractMinMax(eventsSorted, props.to);

  return (
    <div className={"pa2 " + chartBackground}>
      <div className="pa2">
        <div className="relative h1 w-100">
          <div className="absolute ba b--light-silver left-0 right-0 h1" />
          {eventsSorted.map((e, i) => (
            <div
              key={i}
              className="bar absolute h1"
              title={e.label}
              style={{
                left: dateToFraction(min, max, e.from) * 100 + "%",
                right:
                  (1 - dateToFraction(min, max, e.to || props.to)) * 100 + "%",
                backgroundColor: e.backgroundColor || nthColor(i)
              }}
              onClick={() => {
                if (props.onEventClicked) props.onEventClicked(e);
              }}
            />
          ))}
        </div>
      </div>
      <div className="relative h1">
        <div className="absolute left-0">{formatAxisLabel(min)}</div>
        <div className="absolute right-0">{formatAxisLabel(max)}</div>
      </div>
    </div>
  );
}

function extractMinMax(events: Event[], defaultTo: Date) {
  const [min, max] = events.reduce(
    (prev, current) => {
      const { from, to } = current;
      return [
        from.valueOf() < prev[0] ? from.valueOf() : prev[0],
        (to || defaultTo).valueOf() > prev[1]
          ? (to || defaultTo).valueOf()
          : prev[1]
      ];
    },
    [Number.MAX_VALUE, Number.MIN_VALUE]
  );
  return [new Date(min), new Date(max)];
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
  backgroundColor?: string;
}
