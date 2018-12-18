import React from "react";
import { Project } from "../Model";
import {
  dd,
  dt,
  textParagraph,
  grid2,
  gridItem,
  gridCard,
  cardTitle,
  cardContent,
  twoColumns,
  list,
  normalFontSize
} from "../css";
import StringList from "../common/StringList";
import GridCellsAutoPlacementCss from "../common/GridCellsAutoPlacementCss";
import { large } from "../common/MediaQueries";
import { partition, sortBy, descend } from "ramda";

export default function ProjectDetails({ project }: { project: Project }) {
  const now = new Date();
  return (
    <>
      <div className="ph2">
        <h2 className="f3 b">{project.title}</h2>
      </div>
      <div className={`ph2 ${twoColumns}`}>
        <p className={textParagraph}>{project.description}</p>
        <div className="noColumnBreak">
          <div className={dt}>Duration</div>
          <div className={dd}>{project.duration(now).text()}</div>
        </div>
        {project.industry ? (
          <div className="noColumnBreak">
            <div className={dt}>Industry</div>
            <div className={dd}>{project.industry}</div>
          </div>
        ) : null}
        {project.teamSize ? (
          <div className="noColumnBreak">
            <div className={dt}>Team Size</div>
            <div className={dd}>{project.teamSize}</div>
          </div>
        ) : null}
        {project.achievements && project.achievements.length ? (
          <div className="noColumnBreak">
            <div className={dt}>My achievements</div>
            <div className={dd}>
              <StringList items={project.achievements} />
            </div>
          </div>
        ) : null}
        {project.tasks && project.tasks.length ? (
          <div className="noColumnBreak">
            <div className={dt}>My tasks in the project</div>
            <div className={dd}>
              <StringList items={project.tasks} />
            </div>
          </div>
        ) : null}
        {project.tools && project.tools.length ? (
          <div className="noColumnBreak">
            <div className={dt}>Tools I used</div>
            <div className={dd}>
              <StringList items={project.tools} />
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <TechnologySection technologies={project.technologies} />
      </div>
    </>
  );
}

function TechnologySection({ technologies }: { technologies: Technology[] }) {
  const [techsHavingTasks, techsHavingNoTasks] = partition(
    t => !!t.tasks && !!t.tasks.length,
    technologies
  );
  return techsHavingTasks.length ? (
    <>
      <h3 className={normalFontSize + " b ph2 mb0 mt4-l"}>
        Project tasks by technology
      </h3>
      <TechnologyGrid
        techsHavingTasks={techsHavingTasks}
        techsHavingNoTasks={techsHavingNoTasks}
      />
    </>
  ) : (
    <>
      <h3 className={normalFontSize + " b ph2 mb0 mt4-l"}>Technologies used</h3>
      <div className="ph2 pt2">
        <StringList items={techsHavingNoTasks.map(t => t.name)} />
      </div>
    </>
  );
}

function TechnologyGrid(props: TechnologyGridProps) {
  const { techsHavingTasks, techsHavingNoTasks } = props,
    cellCount = techsHavingTasks.length + techsHavingNoTasks.length;
  return (
    <>
      <GridCellsAutoPlacementCss
        cellCount={cellCount}
        cellCssSelector=".cell"
        defaultColumns={1}
        defs={[{ columns: 2, query: large }]}
      />
      <ul className={grid2 + " " + list}>
        <>
          {techsHavingTasks
            .sort(descend(t => (t.tasks ? t.tasks.length : 0)))
            .map(t => (
              <TechnologyGridCell title={t.name} lines={t.tasks || []} />
            ))}
          {techsHavingNoTasks.length ? (
            <TechnologyGridCell
              title="Other"
              lines={techsHavingNoTasks.map(t => t.name)}
            />
          ) : null}
        </>
      </ul>
    </>
  );
}

interface Technology {
  name: string;
  tasks?: string[];
}

function TechnologyGridCell({
  title,
  lines
}: {
  title: string;
  lines: string[];
}) {
  return (
    <li key={title} className={gridItem}>
      <div className={gridCard}>
        <h4 className={cardTitle}>{title}</h4>
        <div className={cardContent}>
          <StringList items={lines} />
        </div>
      </div>
    </li>
  );
}

interface TechnologyGridProps {
  techsHavingTasks: { name: string; tasks?: string[] }[];
  techsHavingNoTasks: { name: string; tasks?: string[] }[];
}
