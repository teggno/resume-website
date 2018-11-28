import React from "react";
import Month from "../Month";
import { Project } from "../Model";
import { chain } from "ramda";
import {
  stripedStringList,
  textParagraph,
  dt,
  dd,
  list,
  cardContent,
  dl
} from "../css";
import { Expander } from "../common/Expandable";

export function ProjectDetails(props: ProjectDetailsProps) {
  const { project, technologyName } = props,
    now = new Date(),
    duration = project.period.from.durationUntil(
      project.period.to || Month.fromDate(now)
    ),
    technologies = project.technologies.filter(
      t => !technologyName || t.name === technologyName
    );
  return (
    <div className={cardContent}>
      {!!technologies.length && technologies.some(t => !!t.tasks) ? (
        <dl className={dl}>
          <dt className={dt}>Work I did with {technologies[0].name}</dt>
          <dd className={dd}>
            <UnorderedListOfStrings
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
          <dd className={dd}>
            {duration.years ? `${duration.years} years` : ""}
            {duration.years && duration.months ? ", " : ""}
            {duration.months ? `${duration.months} months` : ""}
          </dd>
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
                <UnorderedListOfStrings items={project.achievements} />
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

function UnorderedListOfStrings(props: { items: string[] }) {
  return (
    <ul className={list}>
      {props.items.map((x, i) => (
        <li className={stripedStringList} key={i}>
          {x}
        </li>
      ))}
    </ul>
  );
}

export interface ProjectDetailsProps {
  project: Project;
  technologyName?: string;
}
