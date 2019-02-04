import React from "react";
import "./TimelineList.css";
import { card } from "../css";

export default function TimelineList(props: TimelineListProps) {
  return (
    <div
      className={"timeline" + (props.className ? " " + props.className : "")}
    >
      <div className="timeline-line" />
      {props.events.map(e => {
        const ItemComponent = e.component;
        return (
          <div key={e.key} className={card + " timeline-item"}>
            <ItemComponent />
            <div className="timeline-item-line" />
          </div>
        );
      })}
    </div>
  );
}

interface TimelineListProps {
  events: TimelineListEvent[];
  className?: string;
}

export interface TimelineListEvent {
  key: string | number;
  component: () => any;
}
