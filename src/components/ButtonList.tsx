import * as React from "react";

export function ButtonList(props: ToggleMenuProps) {
  return (
    <div>
      {props.buttons.map((b, i) => (
        <button
          type="button"
          key={i}
          onClick={() => props.changed(b.name)}
          disabled={b.name === props.value}
          className={b.name === props.value ? "selected" : ""}
        >
          {b.label}
        </button>
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
