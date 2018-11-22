import React from "react";
import { TechnologyFilter } from "./TechnologyFilter";
import YearsBackSlider from "./YearsBackSlider.1";
import { Technology } from "../Model";
import { sortBy } from "ramda";

const todaysYear = new Date().getFullYear();

export class TechnologyFilters extends React.Component<TechnologyFiltersProps, TechnologyFiltersState> {
  constructor(props: TechnologyFiltersProps) {
    super(props);
    this.state = {
      selectedTechnologies: props.technologies,
      yearFrom: getWorkYears(props.technologies).min
    };
  }

  render() {
    return (
      <div>
        <div style={{ padding: "30px" }}>
          <YearsBackSlider
            yearFrom={getWorkYears(this.props.technologies).min}
            yearTo={todaysYear}
            year={this.state.yearFrom}
            onDragging={this.periodSliderChanged.bind(this)}
          />
        </div>
        <TechnologyFilter
          allItems={sortBy(
            t => t.name.toLowerCase(),
            this.filterTechnologiesByYear(this.props.technologies)
          )}
          selectedItems={this.filterTechnologiesByYear(
            this.state.selectedTechnologies
          )}
          selectionChanged={this.techSelectionChanged.bind(this)}
          isAllNoneButtonAll={false}
        />
      </div>
    );
  }
  private techSelectionChanged(newSelection: Technology[]) {
    this.setState({
      selectedTechnologies: newSelection
    });
  }

  private periodSliderChanged(year: number) {
    this.setState({
      yearFrom: year
    });
  }
  private filterTechnologiesByYear(technologies: Technology[]) {
    return technologies.filter(t => t.yearEnd >= this.state.yearFrom);
  }
}

function getWorkYears(technologies: Technology[]) {
  return technologies.reduce(
    (prev, current) => {
      return {
        min: prev.min < current.yearStart ? prev.min : current.yearStart,
        max: prev.max > current.yearEnd ? prev.max : current.yearEnd
      };
    },
    { min: Number.MAX_VALUE, max: Number.MIN_VALUE }
  );
}

interface TechnologyFiltersProps{
  technologies: Technology[]
}

interface TechnologyFiltersState {
  yearFrom: number;
  selectedTechnologies: Technology[];
}
