import React from "react";
import { Transition } from "react-transition-group";
import { sparkline } from "../css";

export default function Sparkline(props: SparklineProps) {
  const { from, to, min, max } = props;
  return (
    <Transition timeout={0} appear={true} in={true}>
      {transitionStatus => (
        <div
          className={sparkline}
          style={{
            left:
              transitionStatus === "entered"
                ? ((from - min) / (max - min)) * 100 + "%"
                : 0,
            width:
              transitionStatus === "entered"
                ? ((to - from) / (max - min)) * 100 + "%"
                : 0
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