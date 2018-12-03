import React from "react";
import { Project } from "../Model";
import { chain } from "ramda";
import { textParagraph, dt, dd, cardContent, dl } from "../css";
import { Expander } from "../common/Expandable";
import StringList from "../common/StringList";

export default function ProjectCard(props: ProjectCardProps) {
  const { project, technologyName } = props,
    now = new Date(),
    technologies = project.technologies.filter(
      t => !technologyName || t.name === technologyName
    );
  return (
    <div className={cardContent}>
      {!!technologies.length && technologies.some(t => !!t.tasks) ? (
        <dl className={dl}>
          <dt className={dt}>Work I did with {technologies[0].name}</dt>
          <dd className={dd}>
            <StringList
              items={chain(
                t => (t.tasks ? t.tasks.map(tt => tt) : []),
                technologies
              )}
            />
          </dd>
        </dl>
      ) : null}
      <Expander>
        <dl className={dl}>
          <dt className={dt}>Project description</dt>
          <dd className={dd}>
            <p className={textParagraph}>{project.description}</p>
          </dd>
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
              <dt className={dt}>My achievements</dt>
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
      </Expander>
    </div>
  );
}

export interface ProjectCardProps {
  project: Project;
  technologyName?: string;
}
