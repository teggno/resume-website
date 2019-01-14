import React from "react";
import TimelineChart from "../common/TimelineChart";
import Sparkline from "../common/Sparkline";
import Month from "./Month";
import { stripedBackground, link } from "../css";
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
import { Project } from "./Model";
import ProjectColorContext from "./ProjectColorContext";
import Link from "../common/Link";

export default function ProjectTablePage({
  projects,
  urlOfProject
}: {
  projects: Project[];
  urlOfProject: StringInOut;
}) {
  const now = new Date(),
    projectsSorted = sortBy(p => p.period.from.totalMonths(), projects);
  return (
    <div>
      <ProjectTimelineChart projectsSorted={projectsSorted} now={now} />
      <ProjectGanttTable projectsSorted={projectsSorted} now={now} urlOfProject={urlOfProject}/>
      <TermList projects={projectsSorted} />
    </div>
  );
}

function ProjectTimelineChart({
  projectsSorted,
  now
}: {
  projectsSorted: Project[];
  now: Date;
}) {
  return (
    <ProjectColorContext.Consumer>
      {colorByKey => (
        <TimelineChart
          to={now}
          events={projectsSorted.map(p => ({
            from: p.period.from.startTime(),
            to: endTimeOrNow(now, p.period.to),
            label: `${p.company ? p.company + "\n" : ""}${
              p.title
            }\n${p.period.from.nameYearShort()}-${formatDateAsMonth(
              endTimeOrNow(now, p.period.to)
            )}`,
            color: colorByKey(p.title)
          }))}
          formatAxisLabel={formatDateAsMonth}
        />
      )}
    </ProjectColorContext.Consumer>
  );
}

function formatDateAsMonth(date: Date) {
  return Month.fromDate(date).nameYearShort();
}

function ProjectGanttTable({
  projectsSorted,
  now,
  urlOfProject
}: {
  projectsSorted: Project[];
  now: Date;
  urlOfProject: StringInOut;
}) {
  const [minFrom, maxTo] = projectsSorted.reduce(
    (prev, current) => [
      min(prev[0], current.period.from.startTime().valueOf()),
      max(prev[1], endTimeOrNow(now, current.period.to).valueOf())
    ],
    [now.valueOf(), new Date(0).valueOf()]
  );
  return (
    <table className="collapse ba br2 b--black-10 pv2 ph3 w-100">
      <thead>
        <tr>
          <th className="pv2 ph3 tl f6 fw6 ttu">Company</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">Project</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">Industry</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">From</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">To</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">Gap</th>
          <th className="pv2 ph3 tl f6 fw6 ttu">Mnt</th>
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
                <td className="pv2 ph3">{p.company}</td>
                <td className="pv2 ph3">
                  <Link
                    className={link}
                    href={urlOfProject(p.title)}
                    scrollToTop={true}
                  >
                    {p.title}
                  </Link>
                </td>
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
                      min={minFrom}
                      from={p.period.from.startTime().valueOf()}
                      to={endTimeOrNow(now, p.period.to).valueOf()}
                      max={maxTo}
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

function TermList({ projects }: { projects: Project[] }) {
  const sortByName = sortBy((i: [string, number]) => i[0].toLowerCase()),
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

function endTimeOrNow(now: Date, month?: Month) {
  return month ? month.endTime() : now;
}

interface StringInOut {
  (name: string): string;
}
