import React from "react";
import { Technology } from "../Model";
import { ProjectDetails } from "./ProjectDetails";
import { wrappingList, wrappingListItem, card, cardTitle } from "../css";

export default (props: { technology: Technology }) => {
  const { technology: t } = props;
  return (
    <React.Fragment>
      <h2>My experience with {t.name}</h2>
      <div>
        Maybe put a chart here showing the timeline of my usage of the tech
      </div>
      <div>
        <h3>Projects:</h3>
        <ul className={wrappingList}>
          {t.projects.map(p => (
            <li key={p.title} className={wrappingListItem}>
              <div className={card}>
                <h4 className={cardTitle}>{p.title}</h4>
                <ProjectDetails project={p} technologyName={t.name} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Jobs:</h3>
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
