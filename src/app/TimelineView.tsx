import React from "react";
import TimelineList from "../common/TimelineList";
import Me from "../Me";
import { by } from "../Functional";
import { chain } from "ramda";
import { cardTitle, cardContent, link } from "../css";
import Month from "../Month";
import { technologyRoute } from "../Routes";
import Link from "../common/Link";

export default function TimelineView(props: { me: Me }) {
  return (
    <TimelineList
      className="ph2 mw8"
      events={props.me
        .projects()
        .map(p => ({
          component: () => <ProjectComponent project={p} />,
          from: p.period.from,
          key: p.title
        }))
        .concat(
          props.me.technologies().map(t => ({
            component: () => <TechnologyComponent technology={t} />,
            from: t.monthStart,
            key: t.name
          }))
        )
        .concat(
          chain(
            j => j.titles.map(t => ({ title: t, job: j })),
            props.me.jobs()
          ).map(t => ({
            component: () => <JobTitleComponent jobTitle={t} />,
            from: t.title.period.from,
            key: t.title.period.from.totalMonths().toString() + t.title.title
          }))
        )
        .sort(by(e => e.from.totalMonths()))}
    />
  );
}

function ProjectComponent(props: { project: any }) {
  return (
    <TimelineCard
      title="Started working in project"
      from={props.project.period.from}
    >
      {props.project.title}
    </TimelineCard>
  );
}

function TechnologyComponent(props: { technology: any }) {
  return (
    <TimelineCard
      title="First use of technology"
      from={props.technology.monthStart}
    >
      <Link
        className={link}
        href={technologyRoute.hashFromName(props.technology.name)}
        scrollToTop={true}
      >
        {props.technology.name}
      </Link>
    </TimelineCard>
  );
}

function JobTitleComponent(props: { jobTitle: any }) {
  return (
    <TimelineCard title="New job title" from={props.jobTitle.title.period.from}>
      {`${props.jobTitle.title.title} at ${props.jobTitle.job.company}`}
    </TimelineCard>
  );
}

function TimelineCard(props: { children: any; title: string; from: Month }) {
  const yearMonth = `${props.from.name()} ${props.from.year}`;
  return (
    <>
      <div className={cardTitle}>
        <h4 className="tc pa0 ma0">{`${props.title}`}</h4>
      </div>
      <div className={cardContent + " f5 f3-ns tc"}>
        {props.children}
        <div className="fw1 f6 mt3">{yearMonth}</div>
      </div>
    </>
  );
}
