import React from "react";
import {
  listItem,
  listLink,
  listItemTitle,
  listItemSub,
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
    <li className={listItem} key={title}>
      <a href={href} className={listLink}>
        <div className={listItemTitle}>{title}</div>
        <div>
          <div className={listItemSub}>{sub}</div>
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
