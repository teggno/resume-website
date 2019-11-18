import { sortBy, min } from "ramda";
import React from "react";
import YearsBackSlider from "../common/YearsBackSlider";
import { Technology, TechnologyGroup } from "../Model";
import TechnologyFilter from "./TechnologyFilter";
import Month from "../Month";

const todaysYear = new Date().getFullYear();

export default class Filters extends React.Component<FiltersProps> {
  constructor(props: FiltersProps) {
    super(props);

    this.periodSliderChanged = this.periodSliderChanged.bind(this);
    this.techSelectionChanged = this.techSelectionChanged.bind(this);
  }

  render() {
    return (
      <>
        <fieldset className="bn pv0 pa2">
          <legend className="f3">View work from</legend>
          <div className="pv2">
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
        </fieldset>
        <fieldset className="bn pa0">
          <legend className="f3 ph2 mt2">Technologies</legend>
          <div className="pv2">
            <TechnologyFilter
              allItems={sortBy(
                t => t.name.toLowerCase(),
                this.filterTechnologiesByMonth(
                  this.props.technologies,
                  new Month(this.props.yearFrom, new Date().getMonth() + 1)
                )
              )}
              selectedItems={this.filterTechnologiesByMonth(
                this.props.selectedTechnologies,
                new Month(this.props.yearFrom, new Date().getMonth() + 1)
              )}
              onChange={this.techSelectionChanged}
              technologyGroups={this.props.technologyGroups}
            />
          </div>
        </fieldset>
      </>
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
        this.filterTechnologiesByMonth(
          this.props.technologies,
          new Month(year, new Date().getMonth() + 1)
        ),
        year
      );
    }
  }

  private filterTechnologiesByMonth(technologies: Technology[], month: Month) {
    return technologies.filter(t => month.lt(t.monthEnd));
  }
}

interface FiltersProps {
  technologies: Technology[];
  onChange?: (technologies: Technology[], yearFrom: number) => void;
  selectedTechnologies: Technology[];
  yearFrom: number;
  technologyGroups?: TechnologyGroup[];
}
