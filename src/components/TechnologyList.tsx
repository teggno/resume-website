import React from "react";
import { Technology } from "../Model";
import "./technologyList.css";
import { max, reduce } from "ramda";

const listWidthPx = 270;
const getGraphNumber = (t: Technology) => t.experienceGross;
export function TechnologyList(props: TechnologyListProps) {
  const maxNumber = reduce(max, 0, props.technologies.map(getGraphNumber));
  return (
    <ul className="technology-list">
      {props.technologies.map(t => (
        <li className="technology-list-item" key={t.name}>
          <div
            className="bar"
            style={{ width: (getGraphNumber(t) * listWidthPx) / maxNumber }}
          />
          <a href={`#technologies/${t.name}`} title="Details">
            <strong>{t.name}</strong>
          </a>
          <div>
            {t.experienceGross} years experience in {t.projects.length} projects
            in {t.jobs.length} jobs.
          </div>
        </li>
      ))}
    </ul>
  );
}

export interface TechnologyListProps {
  technologies: Technology[];
}


