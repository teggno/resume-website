import React from "react";
import { icon } from "../css";

export function ArrowDown(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 40 40"
      preserveAspectRatio="true"
      className={icon}
    >
      {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/  */}
      <g>
        <path
          d="m10,15l10,10l10,-10"
          stroke-width="4"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke={props.color || "#000"}
          fill="none"
        />
      </g>
    </svg>
  );
}

export function ArrowUp(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 40 40"
      preserveAspectRatio="true"
      className={icon}
    >
      {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/  */}
      <g>
        <path
          d="m10,25l10,-10l10,10"
          stroke-width="4"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke={props.color || "#000"}
          fill="none"
        />
      </g>
    </svg>
  );
}

export interface IconProps {
  color?: string;
}
