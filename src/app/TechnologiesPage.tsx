import { ascend, descend, sort, sortWith } from "ramda";
import React from "react";
import { fromToChart, zeroBasedCharts } from "../common/ChartConfig";
import MasterDetail from "../common/MasterDetail";
import SortableList from "../common/SortableList";
import { Technology } from "./Model";
import TechnologyDetails from "./TechnologyDetails";

export default function TechnologiesPage({
  technologies,
  selectedTechnologyTitle,
  urlOfTechnology,
  colorOfProject
}: TechnologiesPageProps) {
  console.debug("TechnologiesPage render");
  const selectedTechnology = technologies.filter(
    t => t.name === selectedTechnologyTitle
  )[0];
  return (
    <MasterDetail
      backToListRoute={"#technologies"}
      detailsVisible={!!selectedTechnology}
      master={<List technologys={technologies} />}
      detail={<TechnologyDetails technology={selectedTechnology} colorOfProject={colorOfProject}/>}
    />
  );

  function List({ technologys }: { technologys: Technology[] }) {
    return (
      <SortableList
        items={technologys}
        sortConfigs={sortConfigs}
        href={t => urlOfTechnology(t.name)}
      />
    );
  }
}

interface TechnologiesPageProps {
  technologies: Technology[];
  selectedTechnologyTitle?: string;
  urlOfTechnology: (name: string) => string;
  colorOfProject: (title: string) => string;
}

const nameNonCase = (tech: Technology) => tech.name.toLowerCase(),
  nameOf = (t: Technology) => t.name,
  subOf = (t: Technology) =>
    `${Math.round(t.experienceGross) || "< 1"} years experience in ${
      t.projects.length
    } projects`,
  experienceGross = (t: Technology) => t.experienceGross,
  monthStart = (t: Technology) => t.monthStart.totalMonths(),
  monthEnd = (t: Technology) => t.monthEnd.totalMonths(),
  sortConfigs = [
    {
      itemTitle: nameOf,
      itemSub: subOf,
      buttonLabel: "Experience",
      name: "byExperience",
      sort: sortWith([descend(experienceGross), ascend(nameOf)]),
      sparkline: zeroBasedCharts<Technology>(experienceGross)
    },
    {
      itemTitle: nameOf,
      itemSub: subOf,
      buttonLabel: "Last used",
      name: "lastUsed",
      sort: sortWith([descend(monthEnd), descend(experienceGross)]),
      sparkline: fromToChart<Technology>(monthStart, monthEnd)
    },
    {
      itemTitle: nameOf,
      itemSub: subOf,
      buttonLabel: "A...Z",
      name: "alphabetical",
      sort: sort(ascend(nameNonCase))
    }
  ];
