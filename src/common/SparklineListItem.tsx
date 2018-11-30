import React from "react";
import {
  sparklineListItem,
  blackLink,
  sparklineListItemTitle,
  sparklineListItemSub,
  sparklineContainer
} from "../css";
import Sparkline from "./Sparkline";

interface SparklineListItemProps {
  title: string;
  href: string;
  sub: string;
  chartMin: number;
  barFrom: number;
  barTo?: number;
  chartMax: number | null;
}

export default function SparklineListItem({
  title,
  sub,
  href,
  chartMin,
  barTo,
  barFrom,
  chartMax
}: SparklineListItemProps) {
  return (
    <li className={sparklineListItem} key={title}>
      <a href={href} title="Details" className={blackLink}>
        <div className={sparklineListItemTitle}>{title}</div>
        <div>
          <div className={sparklineListItemSub}>{sub}</div>
          <div className={sparklineContainer}>
            {barTo && chartMax !== null ? (
              <Sparkline
                min={chartMin}
                from={barFrom}
                to={barTo}
                max={chartMax}
              />
            ) : null}
          </div>
        </div>
      </a>
    </li>
  );
}
