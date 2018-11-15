import React from "react";
import Month from "../Month";
import { Project } from "../Model";
import Conditional from "./Conditional";
import { chain } from "ramda";

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
    <div className="pa3 bt b--black-10">
      <p className="f6 f5-ns lh-copy measure">{project.description}</p>
      <dl>
        <dt className="fw6">Duration</dt>
        <dd className="ma0 mb2">
          {duration.years ? `${duration.years} years`: ""}
          {duration.years && duration.months ? ", " : ""}
          {duration.months ? `${duration.months} months`: ""}
        </dd>
        <dt className="fw6">Team Size</dt>
        <dd className="ma0 mb2">{project.teamSize}</dd>
        {/* <Conditional test={() => !!project.tasks.length}>
          <React.Fragment>
            <dt>Tasks</dt>
            <dd>
              <UnorderedListOfStrings items={project.tasks} />
            </dd>
          </React.Fragment>
        </Conditional>
        <Conditional test={() => !!project.tools.length}>
          <React.Fragment>
            <dt>Tools used</dt>
            <dd>
              <UnorderedListOfStrings items={project.tools} />
            </dd>
          </React.Fragment>
        </Conditional>{" "} */}
        <Conditional test={() => !!technologies.length && technologies.some(t => !!t.tasks)}>
          <React.Fragment>
            <dt className="fw6">Work I did with {technologies[0].name}</dt>
            <dd className="ma0">
              <UnorderedListOfStrings
                items={chain(
                  t => (t.tasks ? t.tasks.map(tt => tt) : []),
                  technologies
                )}
              />
            </dd>
          </React.Fragment>
        </Conditional>
      </dl>
    </div>
  );
}

function UnorderedListOfStrings(props: { items: string[] }) {
  return (
    <ul className="list pa0">
      {props.items.map((x, i) => (
        <li className="lh-copy striped--near-white pa2" key={i}>{x}</li>
      ))}
    </ul>
  );
}

export interface ProjectDetailsProps {
  project: Project;
  technologyName?: string;
}
