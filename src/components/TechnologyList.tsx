import { max, reduce } from "ramda";
import React from "react";
import {
  componentSpacingVertical,
  link,
  list,
  skillLinkSub,
  skillLinkTitle,
  skillListItem,
  skillListBar
} from "../css";
import { Technology } from "../Model";
import { technologyRoute } from "../Routes";

const listWidthPx = 1;
const getGraphKPI = (t: Technology) => t.experienceGross;
export function TechnologyList(props: TechnologyListProps) {
  const maxNumber = reduce(max, 0, props.technologies.map(getGraphKPI));
  return (
    <ul className={list}>
      {props.technologies.map(t => (
        <li className={skillListItem} key={t.name}>
          <a
            href={technologyRoute.hashFromName(t.name)}
            title="Details"
            onClick={props.onClick}
            className={link}
          >
            <div
              className={skillListBar}
              style={{
                width: (getGraphKPI(t) * listWidthPx / maxNumber * 100) + "%",
                height: 7
              }}
            />
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
  onClick?: () => void;
}
