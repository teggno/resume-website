import { max, reduce } from "ramda";
import React from "react";
import {
  link,
  list,
  skillLinkSub,
  skillLinkTitle,
  skillListItem,
  skillListBar,
  skillListBarContainer
} from "../css";
import { Technology } from "../Model";
import { technologyRoute } from "../Routes";
import "./TechnologyList.css";
import { Transition } from "react-transition-group";

export function TechnologyList(props: TechnologyListProps) {
  const { barTo, barFrom: bf, chartMin: cMin } = props,
    barFrom = bf || (() => 0),
    chartMin = cMin || (() => 0);

  const maxNumber = barTo
    ? reduce(max, 0, props.technologies.map(barTo))
    : null;

  return (
    <ul className={list}>
      <Transition timeout={400} appear={true} in={true}>
        {state =>
          props.technologies.map(t => (
            <li className={skillListItem} key={t.name}>
              <a
                href={technologyRoute.hashFromName(t.name)}
                title="Details"
                onClick={props.onClick}
                className={link}
              >
                <div className={skillLinkTitle}>{t.name}</div>
                <div className={skillListBarContainer}>
                  {barTo && maxNumber !== null ? (
                    <div
                      className={skillListBar + " sparkline"}
                      style={{
                        left:
                          state === "entered"
                            ? ((barFrom(t) - chartMin(t)) /
                                (maxNumber - chartMin(t))) *
                                100 +
                              "%"
                            : 0,
                        width:
                          state === "entered"
                            ? ((barTo(t) - barFrom(t)) /
                                (maxNumber - chartMin(t))) *
                                100 +
                              "%"
                            : 0,
                        height: 7
                      }}
                    />
                  ) : null}
                </div>
                <div className={skillLinkSub}>
                  {t.experienceGross} years experience in {t.projects.length}{" "}
                  projects in {t.jobs.length} jobs
                </div>
              </a>
            </li>
          ))
        }
      </Transition>
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
