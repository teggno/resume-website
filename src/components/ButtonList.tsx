import * as React from "react";
import { normalButton, clickedButton } from "../css";
import ToggleButton from "./ToggleButton";

export function ButtonList(props: ButtonListProps) {
  return (
    <div>
      {props.buttons.map((b, i) => (
        <ToggleButton
          key={i}
          isOn={b.name === props.value}
          onChange={() => props.changed(b.name)}
        >
          {b.label}
        </ToggleButton>
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
}
