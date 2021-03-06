import * as React from "react";
import ToggleButton from "./ToggleButton";

export default function ButtonList(props: ButtonListProps) {
  return (
    <div style={{ lineHeight: 1 }} className={props.className}>
      {props.buttons.map((b, i) => (
        <React.Fragment key={i}>
          <ToggleButton
            isOn={b.name === props.value}
            onChange={() => props.changed(b.name)}
          >
            {b.label}
          </ToggleButton>
          {"\n" /* <-- We want a space between the buttons. */}
        </React.Fragment>
      ))}
    </div>
  );
}

export interface ButtonListProps {
  value?: string;
  buttons: {
    label: string;
    name: string;
  }[];
  changed: (name: string) => void;
  className?: string;
}
