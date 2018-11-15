import React from "react";
import { Technology } from "../Model";
import "./technologyList.css";
import { max, reduce } from "ramda";
import { technologyRoute } from "../Routes";

const listWidthPx = 270;
const getGraphNumber = (t: Technology) => t.experienceGross;
export function TechnologyList(props: TechnologyListProps) {
  const maxNumber = reduce(max, 0, props.technologies.map(getGraphNumber));
  return (
    <ul className="list pa0 ma0 mr4">
      {props.technologies.map(t => (
        <li className="relative bt b--light-silver pa2" key={t.name}>
          <div
            className="absolute top-0 left-0 bg-lightest-blue"
            style={{ width: (getGraphNumber(t) * listWidthPx) / maxNumber, height: 7 }}
          />
          <a
            href={technologyRoute.hashFromName(t.name)}
            title="Details"
            className="black link hover-blue"
          >
            <div className="f4 fw6">{t.name}</div>
            <div className="f6 ">
              {t.experienceGross} years experience in {t.projects.length}{" "}
              projects in {t.jobs.length} jobs
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export interface TechnologyListProps {
  technologies: Technology[];
}
