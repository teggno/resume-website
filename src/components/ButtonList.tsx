import * as React from "react";
import { normalButton, clickedButton } from "../css";

export function ButtonList(props: ToggleMenuProps) {
  return (
    <div>
      {props.buttons.map((b, i) => (
        <a
          type="button"
          key={i}
          onClick={e => {
            props.changed(b.name);
            e.preventDefault();
          }}
          href="#"
          className={b.name === props.value ? clickedButton : normalButton}
        >
          {b.label}
        </a>
      ))}
    </div>
  );
}

export interface ToggleMenuProps {
  value?: string;
  buttons: {
    label: string;
    name: string;
  }[];
  changed: (name: string) => void;
}
