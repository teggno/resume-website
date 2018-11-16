import { max, reduce } from "ramda";
import React from "react";
import {
  componentSpacingVertical,
  link,
  list,
  skillLinkSub,
  skillLinkTitle,
  skillList,
  skillListBar
} from "../css";
import { Technology } from "../Model";
import { technologyRoute } from "../Routes";
import "./technologyList.css";

const listWidthPx = 270;
const getGraphNumber = (t: Technology) => t.experienceGross;
export function TechnologyList(props: TechnologyListProps) {
  const maxNumber = reduce(max, 0, props.technologies.map(getGraphNumber));
  return (
    <ul className={list + " " + componentSpacingVertical}>
      {props.technologies.map(t => (
        <li className={skillList} key={t.name}>
          <div
            className={skillListBar}
            style={{
              width: (getGraphNumber(t) * listWidthPx) / maxNumber,
              height: 7
            }}
          />
          <a
            href={technologyRoute.hashFromName(t.name)}
            title="Details"
            className={link}
          >
            <div className={skillLinkTitle}>{t.name}</div>
            <div className={skillLinkSub}>
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
