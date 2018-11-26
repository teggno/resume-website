import { max, reduce } from "ramda";
import React from "react";
import {
  link,
  list,
  skillLinkSub,
  skillLinkTitle,
  skillListItem,
  sparkline,
  skillListBarContainer
} from "../css";
import { Technology } from "../Model";
import { technologyRoute } from "../Routes";
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
      {props.technologies.map(t => (
        <li className={skillListItem} key={t.name}>
          <a
            href={technologyRoute.hashFromName(t.name)}
            title="Details"
            onClick={props.onClick}
            className={link}
          >
            <div className={skillLinkTitle}>{t.name}</div>
            <div>
              <div className={skillLinkSub}>
                {t.experienceGross} years experience in {t.projects.length}{" "}
                projects
              </div>
              <div className={skillListBarContainer}>
                {barTo && maxNumber !== null ? (
                  <Sparkline
                    min={chartMin(t)}
                    from={barFrom(t)}
                    to={barTo(t)}
                    max={maxNumber}
                  />
                ) : null}
              </div>
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

function Sparkline(props: SparklineProps) {
  const { from, to, min, max } = props;
  return (
    <Transition timeout={0} appear={true} in={true}>
      {transitionStatus => (
        <div
          className={sparkline}
          style={{
            left:
              transitionStatus === "entered"
                ? ((from - min) / (max - min)) * 100 + "%"
                : 0,
            width:
              transitionStatus === "entered"
                ? ((to - from) / (max - min)) * 100 + "%"
                : 0
          }}
        />
      )}
    </Transition>
  );
}

interface SparklineProps {
  max: number;
  min: number;
  from: number;
  to: number;
}
