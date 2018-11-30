import React from "react";
import { Project, Technology } from "../Model";
import {
  dl,
  dd,
  dt,
  textParagraph,
  grid2,
  gridItem,
  gridCard,
  cardTitle,
  cardContent
} from "../css";
import StringList from "../common/StringList";

export default function ProjectDetails({ project }: { project: Project }) {
  const now = new Date();
  return (
    <>
      <div className="ph2">
        <h2>{project.title}</h2>
        <p className={textParagraph}>{project.description}</p>
      </div>
      <div className="ph2">
        <dl className={dl}>
          <dt className={dt}>Duration</dt>
          <dd className={dd}>{project.duration(now).text()}</dd>
          {project.teamSize ? (
            <>
              <dt className={dt}>Team Size</dt>
              <dd className={dd}>{project.teamSize}</dd>
            </>
          ) : null}
          {project.achievements && project.achievements.length ? (
            <>
              <dt className={dt}>Achievements</dt>
              <dd className={dd}>
                <StringList items={project.achievements} />
              </dd>
            </>
          ) : null}

          {/* <Conditional test={() => !!project.tasks.length}>
          <>
            <dt>Tasks</dt>
            <dd>
              <UnorderedListOfStrings items={project.tasks} />
            </dd>
          </>
        </Conditional>
        <Conditional test={() => !!project.tools.length}>
          <>
            <dt>Tools used</dt>
            <dd>
              <UnorderedListOfStrings items={project.tools} />
            </dd>
          </>
        </Conditional>{" "} */}
        </dl>
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
