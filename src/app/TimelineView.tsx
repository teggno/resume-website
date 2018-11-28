import React from "React";
import Month from "../Month";
import { by } from "../Functional";
import "./TimelineView.css";

export default function TimelineView(props: TimelineViewProps) {
  return (
    <div className="timeline">
      <div className="timeline-line" />
      {props.events.sort(by(e => e.from.totalMonths())).map(e => {
        return (
          <div className="ba b--light-silver timeline-item">
            {e.title}
            <div className="timeline-item-icon" />
          </div>
        );
      })}
    </div>
  );
}

interface TimelineViewProps {
  events: { from: Month; title: string }[];
}
