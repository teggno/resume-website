import * as React from "react";

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
          // disabled={b.name === props.value}
          href="#"
          className={
            b.name === props.value
              ? "f6 link br1 ph3 pv2 mb2 dib white bg-light-blue mh2"
              : "f6 link br1 ph3 pv2 mb2 dib white bg-blue mh2"
          }
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
