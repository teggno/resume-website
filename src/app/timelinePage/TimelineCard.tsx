import Month from "../Month";
import React from "react";
import { cardTitle, cardContent } from "../../css";

export default function TimelineCard({
  children,
  header,
  from
}: {
  children: any;
  header: any;
  from: Month;
}) {
  const yearMonth = `${from.nameYearShort()}`;
  return (
    <>
      <div className={cardTitle}>
        <div className="tc pa0 ma0 f5 f4-ns">{header}</div>
      </div>
      <div className={cardContent + " f5 f4-ns tc"}>
        {children}
        <div className="fw1 f6 mt3">{yearMonth}</div>
      </div>
    </>
  );
}