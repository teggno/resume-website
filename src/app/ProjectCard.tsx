import React from "react";
import { Project } from "../Model";
import { chain } from "ramda";
import { textParagraph, dt, dd, cardContent, dl } from "../css";
import { Expander } from "../common/Expandable";
import StringList from "../common/StringList";

export default function ProjectCard({
  project,
  technologyName
}: ProjectCardProps) {
  const now = new Date(),
    technologies = project.technologies.filter(
      t => !technologyName || t.name === technologyName
    );
  return (
    <div className={cardContent}>
      {!!technologies.length && technologies.some(t => !!t.tasks) ? (
        <dl className={dl}>
          {/* <dt className={dt}>Work I did with {technologies[0].name}</dt> */}
          <dd className={dd}>
            <StringList
              items={chain(t => (t.tasks ? t.tasks : []), technologies)}
            />
          </dd>
        </dl>
      ) : null}
      <Expander>
        <dl className={dl + " pt2"}>
          <dt className={dt}>Project description</dt>
          <dd className={dd}>
            <p className={textParagraph}>{project.description}</p>
          </dd>
          <dt className={dt}>Duration</dt>
          <dd className={dd}>{project.duration(now).text()}</dd>
          {project.achievements && project.achievements.length ? (
            <>
              <dt className={dt}>My achievements</dt>
              <dd className={dd}>
                <StringList items={project.achievements} />
              </dd>
            </>
          ) : null}
        </dl>
      </Expander>
    </div>
  );
}

export interface ProjectCardProps {
  project: Project;
  technologyName?: string;
}
