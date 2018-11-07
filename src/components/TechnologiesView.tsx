import React from "react";
import { TechnologyFilter } from "./TechnologyFilter";
import { TechnologyList, Technology } from "./TechnologyList";
import { ButtonList } from "./ButtonList";
import Me from "../Me";
import { descend, sort, ascend, sortBy } from "ramda";
import YearsBackSlider from "./YearsBackSlider.1";
const todaysYear = new Date().getFullYear();

export class TechnologiesView extends React.Component<
  TechnologiesViewProps,
  TechnologiesViewState
> {
  constructor(props: Readonly<TechnologiesViewProps>) {
    super(props);
    const technologies = new Me(this.props.me).technologies();
    this.state = {
      technologies: technologies,
      selectedTechnologies: technologies,
      sort: sortButtons[0].name,
      yearFrom: getWorkYears(technologies).min
    };
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ padding: "30px" }}>
          <YearsBackSlider
            yearFrom={getWorkYears(this.state.technologies).min}
            yearTo={todaysYear}
            year={this.state.yearFrom}
            onDragging={this.periodSliderChanged.bind(this)}
          />
        </div>
        <TechnologyFilter
          allItems={sortBy(
            t => t.name.toLowerCase(),
            this.filterTechnologiesByYear(this.state.technologies)
          )}
          selectedItems={this.filterTechnologiesByYear(
            this.state.selectedTechnologies
          )}
          selectionChanged={this.techSelectionChanged.bind(this)}
          isAllNoneButtonAll={false}
        />
        <span>Sort by</span>
        <ButtonList
          buttons={sortButtons}
          value={this.state.sort}
          changed={this.sortChanged.bind(this)}
        />
        <TechnologyList
          technologies={sortTechnologies(
            this.filterTechnologiesByYear(this.state.selectedTechnologies),
            this.state.sort
          )}
        />
      </React.Fragment>
    );
  }

  filterTechnologiesByYear(technologies: Technology[]) {
    return technologies.filter(t => t.yearEnd >= this.state.yearFrom);
  }

  techSelectionChanged(newSelection: Technology[]) {
    this.setState({
      technologies: this.state.technologies,
      selectedTechnologies: newSelection,
      sort: this.state.sort,
      yearFrom: this.state.yearFrom
    });
  }

  sortChanged(name: string) {
    this.setState({
      technologies: this.state.technologies,
      selectedTechnologies: this.state.selectedTechnologies,
      sort: name,
      yearFrom: this.state.yearFrom
    });
  }

  periodSliderChanged(year: number) {
    this.setState({
      technologies: this.state.technologies,
      selectedTechnologies: this.state.selectedTechnologies,
      sort: this.state.sort,
      yearFrom: year
    });
  }
}

function sortTechnologies(technologies: Technology[], name: string) {
  return sort(
    sortButtons.filter(b => b.name === name)[0].comparer,
    technologies
  );
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

interface TechnologiesViewProps {
  me: any;
}

interface TechnologiesViewState {
  technologies: Technology[];
  selectedTechnologies: Technology[];
  sort: string;
  yearFrom: number;
}

const extractName = (tech: any) => tech.name.toLowerCase();
const sortButtons = [
  {
    label: "Used most recently",
    name: "usedRecently",
    comparer: combine((tech: any) => tech.yearEnd, descend, extractName, ascend)
  },
  {
    label: "Experience",
    name: "byExperience",
    comparer: combine(
      (tech: any) => tech.experienceGross,
      descend,
      extractName,
      ascend
    )
  },
  {
    label: "A...Z",
    name: "alphabetical",
    comparer: ascend(extractName)
  }
];

function combine<T, TP1, TP2>(
  p1: (t: T) => TP1,
  d1: (p: (t: T) => TP1) => ((a: T, b: T) => number),
  p2: (t: T) => TP2,
  d2: (p: (t: T) => TP2) => ((a: T, b: T) => number)
) {
  return (a: T, b: T) => (p1(a) === p1(b) ? d2(p2)(a, b) : d1(p1)(a, b));
}
