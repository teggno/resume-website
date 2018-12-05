import { sortBy, min } from "ramda";
import React from "react";
import YearsBackSlider from "../common/YearsBackSlider";
import { Technology } from "../Model";
import TechnologyFilter from "./TechnologyFilter";

const todaysYear = new Date().getFullYear();

export default class TechnologyFilters extends React.Component<
  TechnologyFiltersProps
> {
  constructor(props: TechnologyFiltersProps) {
    super(props);

    this.periodSliderChanged = this.periodSliderChanged.bind(this);
    this.techSelectionChanged = this.techSelectionChanged.bind(this);
  }

  render() {
    return (
      <div>
        <div style={{ padding: "30px" }}>
          <div>consider work from</div>
          <YearsBackSlider
            yearFrom={this.props.technologies.reduce(
              (p, c) => min(p, c.monthStart.year),
              Number.MAX_VALUE
            )}
            yearTo={todaysYear}
            year={this.props.yearFrom}
            onDragging={this.periodSliderChanged}
          />
        </div>
        <TechnologyFilter
          allItems={sortBy(
            t => t.name.toLowerCase(),
            this.filterTechnologiesByYear(this.props.technologies)
          )}
          selectedItems={this.filterTechnologiesByYear(
            this.props.selectedTechnologies
          )}
          onChange={this.techSelectionChanged}
        />
      </div>
    );
  }

  private techSelectionChanged(newSelection: Technology[]) {
    if (this.props.onChange) {
      this.props.onChange(newSelection, this.props.yearFrom);
    }
  }

  private periodSliderChanged(year: number) {
    if (this.props.onChange) {
      this.props.onChange(
        this.filterTechnologiesByYear(this.props.technologies, year),
        year
      );
    }
  }

  private filterTechnologiesByYear(technologies: Technology[], year?: number) {
    return technologies.filter(t => t.monthEnd.year >= (year || this.props.yearFrom));
  }
}

interface TechnologyFiltersProps {
  technologies: Technology[];
  onChange?: (technologies: Technology[], yearFrom: number) => void;
  selectedTechnologies: Technology[];
  yearFrom: number;
}
