import React from "react";
import { Technology, Project, Job } from "../Model";
import { ProjectDetails } from "./ProjectDetails";
import {
  wrappingList,
  wrappingListItem,
  card,
  cardTitle,
  circle
} from "../css";
import Timeline from "./Timeline";
import nthColor from "../Colors";
import { isElementInViewport } from "../DomHelpers";
import "./TechnologyDetails.css";
import { formatDateAsYearMonth } from "../Month";
const now = new Date();

export default (props: { technology: Technology }) => {
  const { technology: t } = props;
  return (
    <React.Fragment>
      <div className="ph2">
        <h2>My {t.name} experience</h2>
        <ProjectTimeline projects={t.projects} now={now} />
      </div>
      <div>
        <h3 className="ph2">Projects:</h3>
        <ProjectGrid projects={t.projects} technologyName={t.name} />
      </div>
      <div className="ph2">
        <h3>Jobs:</h3>
        <JobList jobs={t.jobs} />
      </div>
    </React.Fragment>
  );
};

// The idea behind this function is to keep adding the data-project-item
// attribute together with retrieving the card using the same attribute.
function findableCard(index: number) {
  return {
    makeFindable: (card: any) =>
      React.cloneElement(card, { "data-project-index": index }),
    find: () => document.querySelector(`[data-project-index='${index}']`)
  };
}

function ProjectTimeline(props: { projects: Project[]; now: Date }) {
  return (
    <Timeline
      events={props.projects.map((prj, i) => {
        const { period, title } = prj,
          from = period.from.startTime(),
          to = period.to ? period.to.endTime() : props.now;
        return {
          from: from,
          to: to,
          label: `${title}, ${formatDateAsYearMonth(
            from
          )} - ${formatDateAsYearMonth(to)}`,
          color: nthColor(i),
          projectIndex: i
        };
      })}
      to={props.now}
      formatAxisLabel={formatDateAsYearMonth}
      onEventClicked={e => {
        const card = findableCard((e as any).projectIndex).find();
        if (!card) return;
        if (!isElementInViewport(card))
          card.scrollIntoView({ behavior: "smooth" });
        const oldClassName = card.className;
        card.className += " flashing";
        setTimeout(() => {
          card.className = oldClassName;
        }, 250);
      }}
    />
  );
}

function ProjectGrid(props: { projects: Project[]; technologyName: string }) {
  return (
    <ul className={wrappingList}>
      {props.projects.map((prj, i) =>
        findableCard(i).makeFindable(
          <li key={prj.title} className={wrappingListItem + " flashing-card"}>
            <div className={card}>
              <h4 className={cardTitle}>
                <div
                  className={circle}
                  style={{ backgroundColor: nthColor(i) }}
                />
                {prj.title}
              </h4>
              <ProjectDetails
                project={prj}
                technologyName={props.technologyName}
              />
            </div>
          </li>
        )
      )}
    </ul>
  );
}

function JobList(props: { jobs: Job[] }) {
  return (
    <ul>
      {props.jobs.map((job, i) => (
        <li key={i}>
          {job.title} at {job.company}
        </li>
      ))}
    </ul>
  );
}
