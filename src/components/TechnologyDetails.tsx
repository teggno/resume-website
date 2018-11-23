import React from "react";
import { Technology, Project, Job } from "../Model";
import { ProjectDetails } from "./ProjectDetails";
import {
  grid2,
  gridItem,
  cardTitle,
  circle,
  gridCard
} from "../css";
import Timeline from "./Timeline";
import nthColor from "../Colors";
import { isElementInViewport } from "../DomHelpers";
import "./TechnologyDetails.css";
import { formatDateAsYearMonth } from "../Month";
const now = new Date();

export default function(props: { technology: Technology }) {
  const { technology } = props;
  return (
    <React.Fragment>
      <div className="ph2">
        <h2>My {technology.name} experience</h2>
        <ProjectTimeline projects={technology.projects} now={now} />
      </div>
      <div>
        <h3 className="ph2">Projects:</h3>
        <ProjectGrid
          projects={technology.projects}
          technologyName={technology.name}
        />
      </div>
      <div className="ph2">
        <h3>Jobs:</h3>
        <JobList jobs={technology.jobs} />
      </div>
    </React.Fragment>
  );
}

function ProjectTimeline(props: { projects: Project[]; now: Date }) {
  return (
    <Timeline
      events={props.projects.map((project, i) => {
        const { period, title } = project,
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
    <ul className={grid2}>
      {props.projects.map((prj, i) =>
        findableCard(i).makeFindable(
          <li key={prj.title} className={gridItem + " flashing-card"}>
            <div className={gridCard}>
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

// The idea behind this function is to keep adding the data-project-item
// attribute together with retrieving the card using the same attribute.
function findableCard(index: number) {
  return {
    makeFindable: (card: any) =>
      React.cloneElement(card, { "data-project-index": index }),
    find: () => document.querySelector(`[data-project-index='${index}']`)
  };
}
