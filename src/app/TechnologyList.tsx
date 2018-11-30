import { max, reduce } from "ramda";
import React from "react";
import { list } from "../css";
import { Technology } from "../Model";
import { technologyRoute } from "../Routes";
import SparklineListItem from "../common/SparklineListItem";
import { applyToOrDefault } from "../Functional";

export function TechnologyList(props: TechnologyListProps) {
  const { barTo } = props,
    chartMax = barTo ? reduce(max, 0, props.technologies.map(barTo)) : null;

  return (
    <ul className={list}>
      {props.technologies.map(t => (
        <SparklineListItem
          title={t.name}
          sub={`${Math.round(t.experienceGross) || "< 1"} years experience in ${
            t.projects.length
          } projects`}
          href={technologyRoute.hashFromName(t.name)}
          chartMin={applyToOrDefault(props.chartMin, t, 0)}
          barFrom={applyToOrDefault(props.barFrom, t, 0)}
          barTo={applyToOrDefault(props.barTo, t, undefined)}
          chartMax={chartMax}
        />
      ))}
    </ul>
  );
}

export interface TechnologyListProps {
  chartMin?: (t: Technology) => number;
  barFrom?: (t: Technology) => number;
  barTo?: (t: Technology) => number;
  technologies: Technology[];
}
