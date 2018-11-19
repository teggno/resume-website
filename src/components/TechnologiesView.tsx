import React from "react";
import { TechnologyFilter } from "./TechnologyFilter";
import { TechnologyList } from "./TechnologyList";
import { ButtonList } from "./ButtonList";
import Me from "../Me";
import { descend, sort, ascend, sortBy } from "ramda";
import YearsBackSlider from "./YearsBackSlider.1";
import { Technology } from "../Model";
import TechnologyDetails from "./TechnologyDetails";
import { technologyRoute } from "../Routes";
import { componentSpacingVertical } from "../css";
import "./TechnologiesView.css";

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
      yearFrom: getWorkYears(technologies).min,
      selectedTechnology: this.selectedTechnologyFromHash(technologies)
    };
    this.technologyDetailsRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.hashChanged);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.hashChanged);
  }

  render() {
    return (
      <React.Fragment>
        {/* <div>
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
        </div> */}
        {/* overflow-hidden because the way off canvas of the list is done would otherwise cause horizontal scrollbars */}
        <div className="overflow-hidden">
          <div
            className={
              "flex offc" + (this.state.selectedTechnology ? " off on-ns" : "")
            }
          >
            <div className="w-50 w-30-ns">
              <ButtonList
                buttons={sortButtons}
                value={this.state.sort}
                changed={this.sortChanged.bind(this)}
              />
              <TechnologyList
                technologies={sortTechnologies(
                  this.filterTechnologiesByYear(
                    this.state.selectedTechnologies
                  ),
                  this.state.sort
                )}
              />
            </div>
            <div className={"w-50 w-70-ns " + componentSpacingVertical} ref={this.technologyDetailsRef}>
              {this.state.selectedTechnology ? (
                <div>
                  <a className="dn-ns" href="#">Back to list</a>
                  <TechnologyDetails
                    technology={this.state.selectedTechnology}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private hashChanged = () => {
    const tech = this.selectedTechnologyFromHash(this.state.technologies);
    this.setState({
      selectedTechnology: tech
    });
    if (tech) {
      this.technologyDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  private selectedTechnologyFromHash(technologies: Technology[]) {
    return technologies.filter(
      t => t.name === technologyRoute.nameFromHash(window.location.hash)
    )[0];
  }

  private technologyDetailsRef: any = null;

  private filterTechnologiesByYear(technologies: Technology[]) {
    return technologies.filter(t => t.yearEnd >= this.state.yearFrom);
  }

  private techSelectionChanged(newSelection: Technology[]) {
    this.setState({
      selectedTechnologies: newSelection
    });
  }

  private sortChanged(name: string) {
    this.setState({
      sort: name
    });
  }

  private periodSliderChanged(year: number) {
    this.setState({
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
  selectedTechnology: Technology | null;
}

const extractName = (tech: any) => tech.name.toLowerCase();
const sortButtons = [
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
    label: "Used most recently",
    name: "usedRecently",
    comparer: combine((tech: any) => tech.yearEnd, descend, extractName, ascend)
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
