import { sortBy } from "ramda";
import React from "react";
import TimelineChart from "../common/TimelineChart";
import { cardTitle, circle, grid2, gridCard, gridItem, list } from "../css";
import { isElementTopLeftInViewport } from "../common/DomHelpers";
import { Project, Technology } from "./Model";
import Month from "./Month";
import ProjectCard from "./ProjectCard";
import "./TechnologyDetails.css";
import GridCellsAutoPlacementCss from "../common/GridCellsAutoPlacementCss";
import { large } from "../common/MediaQueries";
import { scrollIntoView } from "../common/scroll";

export default function TechnologyDetails({
  technology,
  colorOfProject
}: {
  technology: Technology;
  colorOfProject: (title: string) => string;
}) {
  const projectsWithColors = sortBy(
      p => p.period.from.totalMonths(),
      technology.projects
    ).map(p => ({
      project: p,
      color: colorOfProject(p.title)
    })),
    now = new Date();

  return (
    <>
      <div className="ph2 pb2">
        <h2>Projects where I used {technology.name}</h2>
        <ProjectTimeline projects={projectsWithColors} now={now} />
      </div>
      <div>
        <ProjectGrid
          projects={projectsWithColors.sort((...pcs) =>
            Month.descending.apply(null, pcs.map(
              pc => pc.project.period.from
            ) as [Month, Month])
          )}
          technologyName={technology.name}
        />
      </div>
    </>
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
          scrollIntoView(card as HTMLElement);
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
    <>
      <GridCellsAutoPlacementCss
        cellCount={projects.length}
        cellCssSelector=".cell"
        defaultColumns={1}
        defs={[{ columns: 2, query: large }]}
      />
      <ul className={grid2 + " " + list}>
        {projects.map((pc, i) =>
          findableCard(i).makeFindable(
            <li key={pc.project.title} className={gridItem + " flashing-card"}>
              <div className={gridCard}>
                <h4 className={cardTitle}>
                  <div
                    className={circle}
                    style={{ backgroundColor: pc.color }}
                  />
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
    </>
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
