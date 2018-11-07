import * as React from "react";
import { ProjectDetails } from "./ProjectDetail";
import { Project } from "../Model";

export function TechnologyList(props: TechnologyListProps) {
  return (
    <ul>
      {props.technologies.map(t => (
        <li key={t.name}>
          <h3>{t.name}</h3>
          <div>
            {t.experienceGross} years experience in {t.projects.length} projects
            in {t.jobs.length} jobs.
          </div>
          <div>
            Projects:
            <ul>
              {t.projects.map(p => (
                <li key={p.title}>
                  {p.title}
                  <Expandable>
                    <ProjectDetails project={p} />
                  </Expandable>
                </li>
              ))}
            </ul>
          </div>
          <div>
            Jobs:
            <ul>
              {t.jobs.map((j, i) => (
                <li key={i}>
                  {j.title} at {j.company}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

export interface TechnologyListProps {
  technologies: Technology[];
}

export interface Technology {
  name: string;
  projects: Project[];
  jobs: { company: string; title: string }[];
  experienceNet: number;
  experienceGross: number;
  yearStart: number;
  yearEnd: number;
}

export class Expandable extends React.Component<any, { isExpanded: boolean }> {
  constructor(props: { children: any; isExpanded?: boolean }) {
    super(props);

    this.state = {
      isExpanded: !!props.isExpanded
    };
  }
  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          onClick={(() => {
            this.setState({ isExpanded: !this.state.isExpanded });
          }).bind(this)}
        >
          {this.state.isExpanded ? "Collapse" : "Expand"}
        </button>
        {this.state.isExpanded ? this.props.children : null}
      </React.Fragment>
    );
  }
}
