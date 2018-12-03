import React from "react";
import Me from "../Me";
import TimelineChart from "../common/TimelineChart";
import Sparkline from "../common/Sparkline";
import Month from "../Month";
import { stripedBackground } from "../css";
import {
  min,
  max,
  mapAccum,
  chain,
  sortBy,
  map,
  groupBy,
  values,
  pipe
} from "ramda";
import { Project } from "../Model";
import { applyOrDefault } from "../Functional";
import ProjectColorContext from "./ProjectColorContext";

export default function ProjectTableView(props: ProjectTableViewProps) {
  const now = new Date(),
    projects = props.me
      .projects()
      .sort(
        (a, b) => a.period.from.totalMonths() - b.period.from.totalMonths()
      );
  return (
    <div>
      <ProjectTimelineChart projectsSorted={projects} now={now} />
      <ProjectGanttTable projectsSorted={projects} now={now} />
      <TermList projects={projects} />
    </div>
  );
}

interface ProjectTableViewProps {
  me: Me;
}

function ProjectTimelineChart(props: { projectsSorted: Project[]; now: Date }) {
  const { projectsSorted, now } = props,
    endTimeOrNow = (month?: Month) =>
      applyOrDefault(m => m.endTime(), month, now);
  return (
    <ProjectColorContext.Consumer>
      {colorByKey => (
        <TimelineChart
          to={now}
          events={projectsSorted.map(p => ({
            from: p.period.from.startTime(),
            to: endTimeOrNow(p.period.to),
            label: p.title,
            color: colorByKey(p.title)
          }))}
          formatAxisLabel={() => ""}
        />
      )}
    </ProjectColorContext.Consumer>
  );
}

function ProjectGanttTable(props: { projectsSorted: Project[]; now: Date }) {
  const { projectsSorted, now } = props,
    endTimeOrNow = (month?: Month) =>
      applyOrDefault(m => m.endTime(), month, now),
    [minFrom, maxTo] = projectsSorted.reduce(
      (prev, current) => [
        min(prev[0], current.period.from.startTime()),
        max(prev[1], endTimeOrNow(current.period.to))
      ],
      [now, new Date(0)]
    );
  return (
    <table className="collapse ba br2 b--black-10 pv2 ph3 w-100">
      <thead>
        <tr>
          <th className="pv2 ph3 tl f6 fw6 ttu">Title</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">Company</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">Industry</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">From</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">To</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">Gap</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">Months</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">Techs</th>
          <th className="pv2 ph3 tl f6 fw6 ttu" />
        </tr>
      </thead>
      <tbody>
        {
          mapAccum(
            (prevTo: null | Month, p) => [
              p.period.to || Month.fromDate(now),
              <tr className={stripedBackground} key={p.title}>
                <td className="pv2 ph3">{p.title}</td>
                <td className="pv2 ph3">{p.company}</td>
                <td className="pv2 ph3">{p.industry}</td>
                <td className="pv2 ph3">{p.period.from.toString()}</td>
                <td className="pv2 ph3">
                  {p.period.to ? p.period.to.toString() : ""}
                </td>
                <td className="pv2 ph3 tr">
                  {prevTo ? prevTo.monthsUntil(p.period.from) - 1 || "" : ""}
                </td>
                <td className="pv2 ph3 tr">
                  {p.period.from.monthsUntil(
                    p.period.to || Month.fromDate(now)
                  ) + 1}
                </td>
                <td className="pv2 ph3 tr">{p.technologies.length}</td>
                <td className="pv2 ph3" style={{ width: "50%" }}>
                  <div className="relative w-100 h1">
                    <Sparkline
                      min={minFrom.valueOf()}
                      from={p.period.from.startTime().valueOf()}
                      to={endTimeOrNow(p.period.to).valueOf()}
                      max={maxTo.valueOf()}
                    />
                  </div>
                </td>
              </tr>
            ],
            null,
            projectsSorted
          )[1]
        }
      </tbody>
    </table>
  );
}

function TermList(props: { projects: Project[] }) {
  const { projects } = props,
    sortByName = sortBy((i: [string, number]) => i[0].toLowerCase()),
    toNameLengthTuples = map(
      (techs: { name: string }[]) =>
        [techs[0].name, techs.length] as [string, number]
    ),
    groupByName = groupBy((i: { name: string }) => i.name),
    toListItems = map((i: [string, number]) => (
      <li key={i[0]}>
        {i[0]}
        {" ("}
        {i[1]}
        {")"}
      </li>
    )),
    technologiesOf = chain(
      (p: { technologies: { name: string }[] }) => p.technologies
    );

  return (
    <ul>
      {pipe(
        technologiesOf,
        groupByName,
        values,
        toNameLengthTuples,
        sortByName as any, //won't compile otherwise and I'm too lazy to figure out why
        toListItems
      )(projects)}
    </ul>
  );
}
