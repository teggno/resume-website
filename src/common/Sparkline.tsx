import React from "react";
import { Transition } from "react-transition-group";
import { sparkline } from "../css";
import { percent } from "./format";

export default function Sparkline(props: SparklineProps) {
  const { from, to, min } = props,
    range = props.max - min;
  return (
    <Transition timeout={0} appear={true} in={true}>
      {transitionStatus => (
        <div
          className={sparkline}
          style={{
            left:
              transitionStatus === "entered"
                ? percent((from - min) / range)
                : 0,
            width:
              transitionStatus === "entered" ? percent((to - from) / range) : 0
          }}
        />
      )}
    </Transition>
  );
}

interface SparklineProps {
  max: number;
  min: number;
  from: number;
  to: number;
}
