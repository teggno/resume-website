import { ascend, descend, sort, sortWith } from "ramda";
import React from "react";
import { ButtonList } from "../common/ButtonList";
import { Technology } from "../Model";
import { TechnologyList } from "./TechnologyList";
import { fromToChart, zeroBasedCharts } from "../common/ChartConfig";

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
    const sortButton = findSortButton(this.state.sort);
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
          sparklineProps={
            sortButton.sparklineConfig
              ? sortButton.sparklineConfig(this.props.technologies)
              : undefined
          }
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
    sparklineConfig: zeroBasedCharts<Technology>(t => t.experienceGross)
  },
  {
    label: "Used most recently",
    name: "usedRecently",
    sort: sortWith([
      descend((t: Technology) => t.monthEnd.totalMonths()),
      descend((t: Technology) => t.experienceGross)
    ]),
    sparklineConfig: fromToChart<Technology>(
      (t: Technology) => t.monthStart.totalMonths(),
      (t: Technology) => t.monthEnd.totalMonths()
    )
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
