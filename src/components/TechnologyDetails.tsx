import React from "react";
import { Technology } from "../Model";
import { ProjectDetails } from "./ProjectDetail";

export default (props: { technology: Technology }) => {
  const { technology: t } = props;
  return (
    <React.Fragment>
      <div>My experience with <strong>{t.name}</strong></div>
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
    </React.Fragment>
  );
};

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