import React from "react";
import { Technology } from "../Model";
import { MasterDetail } from "../common/MasterDetail";
import { sort, ascend, sortWith, descend } from "ramda";
import { technologyRoute } from "../Routes";
import SortableList from "../common/SortableList";
import TechnologyDetails from "./TechnologyDetails";
import { zeroBasedCharts, fromToChart } from "../common/ChartConfig";

export function TechnologiesView(props: TechnologiesViewProps) {
  console.debug("TechnologiesView render");
  const selectedTechnology = props.technologies.filter(
    t => t.name === props.selectedTechnologyTitle
  )[0];
  return (
    <MasterDetail
      backToListRoute={"#technologies"}
      detailsVisible={!!selectedTechnology}
      master={<List technologys={props.technologies} />}
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
  subOf =  (t: Technology) => `${Math.round(t.experienceGross) ||
    "< 1"} years experience in ${t.projects.length} projects`;
const sortButtons = [
  {
    itemTitle: nameOf,
    itemSub: subOf,
    label: "Experience",
    name: "byExperience",
    sort: sortWith([
      descend((t: Technology) => t.experienceGross),
      ascend((t: Technology) => t.name)
    ]),
    sprk: zeroBasedCharts<Technology>(t => t.experienceGross)
  },
  {
    itemTitle: nameOf,
    itemSub: subOf,
    label: "Used most recently",
    name: "usedRecently",
    sort: sortWith([
      descend((t: Technology) => t.monthEnd.totalMonths()),
      descend((t: Technology) => t.experienceGross)
    ]),
    sprk: fromToChart<Technology>(
      (t: Technology) => t.monthStart.totalMonths(),
      (t: Technology) => t.monthEnd.totalMonths()
    )
  },
  {
    itemTitle: nameOf,
    itemSub: subOf,
    label: "A...Z",
    name: "alphabetical",
    sort: sort(ascend(nameNonCase))
  }
];
