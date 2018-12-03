import React from "react";
import { Project, Technology } from "../Model";
import {
  dd,
  dt,
  textParagraph,
  grid2,
  gridItem,
  gridCard,
  cardTitle,
  cardContent,
  twoColumns
} from "../css";
import StringList from "../common/StringList";

export default function ProjectDetails({ project }: { project: Project }) {
  const now = new Date();
  return (
    <>
      <div className="ph2">
        <h2>{project.title}</h2>
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
        <h3 className="ph2">Project tasks by technology:</h3>
        <TechnologyGrid technologies={project.technologies} />
      </div>
    </>
  );
}

function TechnologyGrid({
  technologies
}: {
  technologies: { name: string; tasks?: string[] }[];
}) {
  return (
    <ul className={grid2}>
      {technologies.map((t, i) => (
        <li key={t.name} className={gridItem}>
          <div className={gridCard}>
            <h4 className={cardTitle}>{t.name}</h4>
            <div className={cardContent}>
              {t.tasks ? <StringList items={t.tasks} /> : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
