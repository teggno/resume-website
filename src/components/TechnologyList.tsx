import { max, reduce } from "ramda";
import React from "react";
import {
  link,
  list,
  skillLinkSub,
  skillLinkTitle,
  skillListItem,
  skillListBar
} from "../css";
import { Technology } from "../Model";
import { technologyRoute } from "../Routes";
import "./TechnologiesList.css";

export function TechnologyList(props: TechnologyListProps) {
  const { barTo, barFrom: bf, chartMin: cMin } = props,
    barFrom = bf || (() => 0),
    chartMin = cMin || (() => 0);

  const maxNumber = barTo
    ? reduce(max, 0, props.technologies.map(barTo))
    : null;

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
            {barTo && maxNumber !== null ? (
              <div
                className={skillListBar + " sparkline"}
                style={{
                  left: ((barFrom(t) - chartMin(t)) / (maxNumber - chartMin(t))) * 100 + "%",
                  width:
                    ((barTo(t) - barFrom(t)) / (maxNumber - chartMin(t))) *
                      100 +
                    "%",
                  height: 7
                }}
              />
            ) : null}
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
  barTo?: (t: Technology) => number;
  barFrom?: (t: Technology) => number;
  chartMin?: (t: Technology) => number;
}
