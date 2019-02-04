import React from "react";
import { clickedButton, normalButton } from "../css";

export default function ToggleButton(props: {
  isOn: boolean;
  onChange: (isOn: boolean) => void;
  children: any;
}) {
  return (
    <button
      onClick={e => {
        if(!props.isOn)props.onChange(true);
        e.preventDefault();
      }}
      className={props.isOn ? clickedButton : normalButton}
    >
      {props.children}
    </button>
  );
}
