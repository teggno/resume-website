import { ascend, descend, min, sort, sortWith } from "ramda";
import React from "react";
import { ButtonList } from "../common/ButtonList";
import { Technology } from "../Model";
import { TechnologyList } from "./TechnologyList";

export default class SortableTechList extends React.Component<
  SortableTechListProps,
  { sort: string }
> {
  constructor(props: SortableTechListProps) {
    super(props);

    this.state = {
      sort: sortButtons[0].name
    };
  }
  render() {
    const sortButton = findSortButton(this.state.sort),
      minNumber = sortButton.chartMin
        ? sortButton.chartMin(this.props.technologies)
        : undefined,
      // minNumber = sortButton.chartMin
      // ? (sortButton.chartMin as any)(this.props.technologies)
      // : undefined,
      chartMin = minNumber ? () => minNumber : undefined;
    return (
      <>
        <ButtonList
          buttons={sortButtons}
          value={this.state.sort}
          changed={this.sortChanged.bind(this)}
        />
        <TechnologyList
          technologies={findSortButton(this.state.sort).sort(
            this.props.technologies
          )}
          chartMin={chartMin}
          barTo={sortButton.barTo}
          barFrom={sortButton.barFrom}
        />
      </>
    );
  }

  private sortChanged(name: string) {
    this.setState({
      sort: name
    });
  }
}

function findSortButton(name: string) {
  return sortButtons.filter(b => b.name === name)[0];
}

const extractName = (tech: Technology) => tech.name.toLowerCase();
const sortButtons = [
  {
    label: "Experience",
    name: "byExperience",
    sort: sortWith([
      descend((t: Technology) => t.experienceGross),
      ascend((t: Technology) => t.name)
    ]),
    barTo: (t: Technology) => t.experienceGross
  },
  {
    label: "Used most recently",
    name: "usedRecently",
    sort: sortWith([
      descend((t: Technology) => t.monthEnd.totalMonths()),
      descend((t: Technology) => t.experienceGross)
    ]),
    barFrom: (t: Technology) => t.monthStart.totalMonths(),
    barTo: (t: Technology) => t.monthEnd.totalMonths(),
    chartMin: (t: Technology[]) =>
      t.map(t => t.monthStart.totalMonths()).reduce(min, Number.MAX_VALUE)
  },
  {
    label: "A...Z",
    name: "alphabetical",
    sort: sort(ascend(extractName))
  }
];

interface SortableTechListProps {
  technologies: Technology[];
  selectedTechnologyName?: string;
}
