import React from "React";
import Me from "../Me";
import TimelineChart from "./TimelineChart";
import Sparkline from "./Sparkline";
import Month from "../Month";
import { stripedBackground } from "../css";

export default function TimelineView(props: TimelineViewViewProps) {
  const projects = props.me
    .projects()
    .sort((a, b) => a.period.from.totalMonths() - b.period.from.totalMonths());
  const now = new Date(),
    nowMonth = Month.fromDate(now),
    [min, max] = projects.reduce(
      (prev, current) => [
        prev[0] > current.period.from.startTime()
          ? current.period.from.startTime()
          : prev[0],
        prev[1] < (current.period.to ? current.period.to.endTime() : now)
          ? current.period.to
            ? current.period.to.endTime()
            : now
          : prev[1]
      ],
      [new Date(9999, 11), new Date(0)]
    );
  return (
    <div>
      <TimelineChart
        to={now}
        events={projects.map(p => ({
          from: p.period.from.startTime(),
          to: p.period.to ? p.period.to.endTime() : now,
          label: p.title
        }))}
        formatAxisLabel={() => ""}
      />
      <table className="w-100">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>From</th>
            <th>To</th>
            <th>Months</th>
            <th>Techs</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr className={stripedBackground} key={p.title}>
              <td>{p.title}</td>
              <td>{p.company}</td>
              <td>{`${p.period.from.year}/${p.period.from.month}`}</td>
              <td>
                {p.period.to ? `${p.period.to.year}/${p.period.to.month}` : ""}
              </td>
              <td className="tr">
                {(p.period.to
                  ? p.period.to
                  : Month.fromDate(now)
                ).totalMonths() - p.period.from.totalMonths()}
              </td>
              <td className="tr">{p.technologies.length}</td>
              <td style={{ width: "50%" }} className="relative">
                <Sparkline
                  min={min.valueOf()}
                  from={p.period.from.startTime().valueOf()}
                  to={
                    p.period.to
                      ? p.period.to.endTime().valueOf()
                      : now.valueOf()
                  }
                  max={max.valueOf()}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TimelineViewViewProps {
  me: Me;
}
