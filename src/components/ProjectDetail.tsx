import React from "react";
import Period from "../Period";
import Month from "../Month";
import { Project } from "../Model";
import Conditional from "./Conditional";

export function ProjectDetails(props: ProjectDetailsProps) {
  const { project } = props,
    now = new Date(),
    duration = project.period.from.durationUntil(
      project.period.to || Month.fromDate(now)
    );
  return (
    <div>
      <div>{project.title}</div>
      <dl>
        <dt>Duration</dt>
        <dd>
          {duration.years} years
          {duration.months ? `, ${duration.months} months` : ""}
        </dd>
        <dt>Team Size</dt>
        <dd>{project.teamSize}</dd>
        <Conditional test={() => !!project.tasks.length}>
          <React.Fragment>
            <dt>Tasks</dt>
            <dd>
            <UnorderedListOfStrings items={project.tasks}/>
            </dd>
          </React.Fragment>
        </Conditional>
        <Conditional test={() => !!project.tools.length}>
          <React.Fragment>
            <dt>Tools used</dt>
            <dd>
              <UnorderedListOfStrings items={project.tools}/>
            </dd>
          </React.Fragment>
        </Conditional>
      </dl>
    </div>
  );
}

function UnorderedListOfStrings(props: {items: string[]}) {
  return (
    <ul>
      {props.items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  );
}

export interface ProjectDetailsProps {
  project: Project;
}
