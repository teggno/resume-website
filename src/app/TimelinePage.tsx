import React from "react";
import TimelineList from "../common/TimelineList";
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
import { Project, Technology, Job, Certificate } from "../Model";

export default function TimelinePage(props: {
  projects: Project[];
  technologies: Technology[];
  jobs: Job[];
  certificates: Certificate[];
}) {
  const projects = props.projects.map(p => ({
      component: () => <ProjectComponent project={p} />,
      from: p.period.from,
      key: p.title
    })),
    technologies = props.technologies.map(t => ({
      component: () => <TechnologyComponent technology={t} />,
      from: t.monthStart,
      key: t.name
    })),
    jobTitles = chain(
      j => j.titles.map(t => ({ title: t, job: j })),
      props.jobs
    ).map(t => ({
      component: () => <JobTitleComponent jobTitle={t} />,
      from: t.title.period.from,
      key: t.title.period.from.totalMonths().toString() + t.title.title
    })),
    certificates = props.certificates.map(c => ({
      component: () => <CertificateComponent {...c} />,
      from: Month.parse(c.date.substr(0, 7)),
      key: `Certificate${c.name}`
    })),
    events = technologies
      .concat(projects)
      .concat(jobTitles)
      .concat(certificates)
      .sort(descend(e => e.from.totalMonths()));
  return <TimelineList className="ph2 mw8" events={events} />;
}

function ProjectComponent({ project }: { project: any }) {
  const header = (
    <IconHeader title="Started working in project">
      <PuzzleIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={project.period.from}>
      <Link
        className={link}
        href={projectRoute.hashFromName(project.title)}
        scrollToTop={true}
      >
        {project.title}
      </Link>
    </TimelineCard>
  );
}

function TechnologyComponent({ technology }: { technology: any }) {
  const header = (
    <IconHeader title="First use of technology">
      <CodeIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={technology.monthStart}>
      <Link
        className={link}
        href={technologyRoute.hashFromName(technology.name)}
        scrollToTop={true}
      >
        {technology.name}
      </Link>
    </TimelineCard>
  );
}

function JobTitleComponent({ jobTitle }: { jobTitle: any }) {
  const header = (
    <IconHeader title="New job title">
      <ManWithCompanyIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={jobTitle.title.period.from}>
      {`${jobTitle.title.title} at ${jobTitle.job.company}`}
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
      {name}
    </TimelineCard>
  );
}

function TimelineCard({
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

function IconHeader({ title, children }: { title: string; children: any }) {
  return (
    <div className="tc">
      <div className="h1 h2-ns w1 w2-ns dib v-mid">{children}</div>
      <div className="ph1 ph2-ns dib v-mid">{title}</div>
    </div>
  );
}
