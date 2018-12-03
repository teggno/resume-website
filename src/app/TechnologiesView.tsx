import { ascend, descend, sort, sortWith } from "ramda";
import React from "react";
import { fromToChart, zeroBasedCharts } from "../common/ChartConfig";
import MasterDetail from "../common/MasterDetail";
import SortableList from "../common/SortableList";
import { Technology } from "../Model";
import { technologyRoute } from "../Routes";
import TechnologyDetails from "./TechnologyDetails";

export default function TechnologiesView({
  technologies,
  selectedTechnologyTitle
}: TechnologiesViewProps) {
  console.debug("TechnologiesView render");
  const selectedTechnology = technologies.filter(
    t => t.name === selectedTechnologyTitle
  )[0];
  return (
    <MasterDetail
      backToListRoute={"#technologies"}
      detailsVisible={!!selectedTechnology}
      master={<List technologys={technologies} />}
      detail={<TechnologyDetails technology={selectedTechnology} />}
    />
  );
}

function List({ technologys }: { technologys: Technology[] }) {
  return (
    <SortableList
      items={technologys}
      buttons={sortButtons}
      href={t => technologyRoute.hashFromName(t.name)}
    />
  );
}

interface TechnologiesViewProps {
  technologies: Technology[];
  selectedTechnologyTitle?: string;
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
  sortButtons = [
    {
      itemTitle: nameOf,
      itemSub: subOf,
      label: "Experience",
      name: "byExperience",
      sort: sortWith([descend(experienceGross), ascend(nameOf)]),
      sprk: zeroBasedCharts<Technology>(experienceGross)
    },
    {
      itemTitle: nameOf,
      itemSub: subOf,
      label: "Used most recently",
      name: "usedRecently",
      sort: sortWith([descend(monthEnd), descend(experienceGross)]),
      sprk: fromToChart<Technology>(monthStart, monthEnd)
    },
    {
      itemTitle: nameOf,
      itemSub: subOf,
      label: "A...Z",
      name: "alphabetical",
      sort: sort(ascend(nameNonCase))
    }
  ];
