import React from "react";
import { list } from "../css";
import { Technology } from "../Model";
import { technologyRoute } from "../Routes";
import SparklineListItem from "../common/SparklineListItem";
import ListItem from "../common/ListItem";

export function TechnologyList(props: TechnologyListProps) {
  const { technologies, sparklineProps } = props;

  return (
    <ul className={list}>
      {technologies.map(t =>
        sparklineProps ? (
          <SparklineListItem
            title={t.name}
            sub={`${Math.round(t.experienceGross) ||
              "< 1"} years experience in ${t.projects.length} projects`}
            href={technologyRoute.hashFromName(t.name)}
            chartMin={sparklineProps.chartMin}
            barFrom={sparklineProps.barFrom(t)}
            barTo={sparklineProps.barTo(t)}
            chartMax={sparklineProps.chartMax}
          />
        ) : (
          <ListItem
            title={t.name}
            sub={`${Math.round(t.experienceGross) ||
              "< 1"} years experience in ${t.projects.length} projects`}
            href={technologyRoute.hashFromName(t.name)}
          />
        )
      )}
    </ul>
  );
}

export interface TechnologyListProps {
  technologies: Technology[];
  sparklineProps?: SparklineProps;
}

export interface SparklineProps {
  chartMin: number;
  chartMax: number;
  barFrom: (t: Technology) => number;
  barTo: (t: Technology) => number;
}
