import { sortBy } from "ramda";
import React from "react";
import TimelineChart from "../common/TimelineChart";
import { cardTitle, circle, grid2, gridCard, gridItem } from "../css";
import { isElementTopLeftInViewport } from "../DomHelpers";
import { Project, Technology } from "../Model";
import Month from "../Month";
import ProjectCard from "./ProjectCard";
import ProjectColorContext from "./ProjectColorContext";
import "./TechnologyDetails.css";

export default function TechnologyDetails({
  technology
}: {
  technology: Technology;
}) {
  return (
    <ProjectColorContext.Consumer>
      {colorByKey => {
        const sortByDuration = sortBy<Project>(p =>
            p.period.from.totalMonths()
          ),
          projectsWithColors = sortByDuration(technology.projects).map(p => ({
            project: p,
            color: colorByKey(p.title)
          })),
          now = new Date();

        return (
          <>
            <div className="ph2">
              <h2>My {technology.name} experience</h2>
              <ProjectTimeline projects={projectsWithColors} now={now} />
            </div>
            <div>
              <h3 className="ph2">Projects:</h3>
              <ProjectGrid
                projects={projectsWithColors}
                technologyName={technology.name}
              />
            </div>
          </>
        );
      }}
    </ProjectColorContext.Consumer>
  );
}

function ProjectTimeline({
  projects,
  now
}: {
  projects: ProjectWithColor[];
  now: Date;
}) {
  return (
    <TimelineChart
      events={projects.map((pc, i) => {
        const { period, title } = pc.project,
          from = period.from.startTime(),
          to = period.to ? period.to.endTime() : now;
        return {
          from: from,
          to: to,
          label: `${title}, ${Month.fromDate(
            from
          ).nameYearShort()} - ${Month.fromDate(to).nameYearShort()}`,
          color: pc.color,
          projectIndex: i
        };
      })}
      to={now}
      formatAxisLabel={date => Month.fromDate(date).nameYearShort()}
      onEventClicked={e => {
        const card = findableCard((e as any).projectIndex).find();
        if (!card) return;
        var flashDelay = 0;
        if (!isElementTopLeftInViewport(card)) {
          card.scrollIntoView({ behavior: "smooth" });
          flashDelay = 500; /* Wait with flashing the card a bit to let the scrolling happen first. */
        }
        setTimeout(() => {
          const oldClassName = card.className;
          card.className += " flashing";
          setTimeout(() => {
            card.className = oldClassName;
          }, 250);
        }, flashDelay);
      }}
    />
  );
}

function ProjectGrid({
  projects,
  technologyName
}: {
  projects: ProjectWithColor[];
  technologyName: string;
}) {
  return (
    <ul className={grid2}>
      {projects.map((pc, i) =>
        findableCard(i).makeFindable(
          <li key={pc.project.title} className={gridItem + " flashing-card"}>
            <div className={gridCard}>
              <h4 className={cardTitle}>
                <div className={circle} style={{ backgroundColor: pc.color }} />
                {pc.project.title}
              </h4>
              <ProjectCard
                project={pc.project}
                technologyName={technologyName}
              />
            </div>
          </li>
        )
      )}
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

interface ProjectWithColor {
  project: Project;
  color: string;
}
