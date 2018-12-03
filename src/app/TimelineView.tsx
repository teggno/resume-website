import React from "react";
import TimelineList from "../common/TimelineList";
import Me from "../Me";
import { chain, descend } from "ramda";
import { cardTitle, cardContent, link } from "../css";
import Month from "../Month";
import { technologyRoute, projectRoute } from "../Routes";
import Link from "../common/Link";
import {
  CertificateIcon,
  CodeIcon,
  PuzzleIcon,
  ManWithCompanyIcon
} from "../common/icons/Icons";

export default function TimelineView(props: { me: Me }) {
  const projects = props.me.projects().map(p => ({
      component: () => <ProjectComponent project={p} />,
      from: p.period.from,
      key: p.title
    })),
    technologies = props.me.technologies().map(t => ({
      component: () => <TechnologyComponent technology={t} />,
      from: t.monthStart,
      key: t.name
    })),
    jobTitles = chain(
      j => j.titles.map(t => ({ title: t, job: j })),
      props.me.jobs()
    ).map(t => ({
      component: () => <JobTitleComponent jobTitle={t} />,
      from: t.title.period.from,
      key: t.title.period.from.totalMonths().toString() + t.title.title
    })),
    certificates = props.me.certificates().map(c => ({
      component: () => <CertificateComponent {...c} />,
      from: Month.parse(c.date.substr(0, 7)),
      key: `Certificate${c.name}`
    })),
    events = projects
      .concat(technologies)
      .concat(jobTitles)
      .concat(certificates)
      .sort(descend(e => e.from.totalMonths()));
  return <TimelineList className="ph2 mw8" events={events} />;
}

function ProjectComponent(props: { project: any }) {
  const header = (
    <IconHeader title="Started working in project">
      <PuzzleIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={props.project.period.from}>
      <Link
        className={link}
        href={projectRoute.hashFromName(props.project.title)}
        scrollToTop={true}
      >
        {props.project.title}
      </Link>
    </TimelineCard>
  );
}

function TechnologyComponent(props: { technology: any }) {
  const header = (
    <IconHeader title="First use of technology">
      <CodeIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={props.technology.monthStart}>
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
  const header = (
    <IconHeader title="New job title">
      <ManWithCompanyIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={props.jobTitle.title.period.from}>
      {`${props.jobTitle.title.title} at ${props.jobTitle.job.company}`}
    </TimelineCard>
  );
}

function CertificateComponent({ name, date }: { name: string; date: string }) {
  const header = (
    <IconHeader title="Certification">
      <CertificateIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={Month.parse(date.substr(0, 7))}>
      <div>
        <div className="w2 h2" />
        {`${name}`}
      </div>
    </TimelineCard>
  );
}

function TimelineCard(props: { children: any; header: any; from: Month }) {
  const yearMonth = `${props.from.nameYearShort()}`;
  return (
    <>
      <div className={cardTitle}>
        <div className="tc pa0 ma0 f5 f4-ns">{props.header}</div>
      </div>
      <div className={cardContent + " f5 f4-ns tc"}>
        {props.children}
        <div className="fw1 f6 mt3">{yearMonth}</div>
      </div>
    </>
  );
}

function IconHeader({ title, children }: { title: string; children: any }) {
  return (
    <div>
      <div className="h1 h2-ns dib ph1 ph2-ns v-mid">{children}</div>
      {title}
    </div>
  );
}
