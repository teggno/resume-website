import React from "react";
import { TechnologyList } from "./TechnologyList";
import { ButtonList } from "./ButtonList";
import { descend, sort, ascend, min } from "ramda";
import { Technology } from "../Model";
import TechnologyDetails from "./TechnologyDetails";
import { technologyRoute } from "../Routes";
import "./TechnologiesView.css";
import { comparer } from "../Sorting";
import { isElementTopLeftInViewport } from "../DomHelpers";

export class TechnologiesView extends React.Component<
  TechnologiesViewProps,
  TechnologiesViewState
> {
  constructor(props: Readonly<TechnologiesViewProps>) {
    super(props);
    this.state = {
      sort: sortButtons[0].name,
      selectedTechnology: this.selectedTechnologyFromHash(
        this.props.technologies
      )
    };
    this.technologyDetailsRef = React.createRef();
  }

  render() {
    const sortButton = findSortButton(this.state.sort),
      minNumber = sortButton.chartMin
        ? (sortButton.chartMin as any)(this.props.technologies)
        : undefined,
      chartMin = minNumber ? () => minNumber : undefined;
    {
      /* overflow-hidden because the way off canvas of the list is done would
         otherwise cause horizontal scrollbars */
    }
    return (
      <div className="overflow-hidden">
        <div
          className={
            "flex offc" + (this.state.selectedTechnology ? " off on-ns" : "")
          }
        >
          <div className="w-50 w-30-l ph2">
            <ButtonList
              buttons={sortButtons}
              value={this.state.sort}
              changed={this.sortChanged.bind(this)}
            />
            <TechnologyList
              technologies={sort(
                findSortButton(this.state.sort).comparer,
                this.props.technologies
              )}
              barTo={sortButton.barTo}
              barFrom={sortButton.barFrom}
              chartMin={chartMin}
            />
          </div>
          <div
            className={"w-50 w-70-l pl1 pl4-ns"}
            ref={this.technologyDetailsRef}
          >
            {this.state.selectedTechnology ? (
              <div>
                <div className="ph2">
                  <a className="dn-ns link" href="#">
                    Back to list
                  </a>
                </div>
                <TechnologyDetails technology={this.state.selectedTechnology} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.hashChanged);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.hashChanged);
  }

  private hashChanged = () => {
    const tech = this.selectedTechnologyFromHash(this.props.technologies);
    this.setState({
      selectedTechnology: tech
    });
    if (!tech) return;
    if (isElementTopLeftInViewport(this.technologyDetailsRef.current)) return;

    this.technologyDetailsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
};

  private selectedTechnologyFromHash(technologies: Technology[]) {
    return technologies.filter(
      t => t.name === technologyRoute.nameFromHash(window.location.hash)
    )[0];
  }

  private technologyDetailsRef: any = null;

  private sortChanged(name: string) {
    this.setState({
      sort: name
    });
  }
}

function findSortButton(name: string) {
  return sortButtons.filter(b => b.name === name)[0];
}

const extractName = (tech: any) => tech.name.toLowerCase();
const sortButtons = [
  {
    label: "Experience",
    name: "byExperience",
    comparer: comparer(
      (tech: any) => tech.experienceGross,
      descend,
      extractName,
      ascend
    ),
    barTo: (t: Technology) => t.experienceGross
  },
  {
    label: "Used most recently",
    name: "usedRecently",
    comparer: comparer(
      (tech: any) => tech.yearEnd,
      descend,
      (tech: any) => tech.experienceGross,
      descend
    ),
    barTo: (t: Technology) => t.yearEnd,
    barFrom: (t: Technology) => t.yearStart,
    chartMin: (t: Technology[]) =>
      t.map(t => t.yearStart).reduce(min, Number.MAX_VALUE)
  },
  {
    label: "A...Z",
    name: "alphabetical",
    comparer: ascend(extractName)
  }
];

interface TechnologiesViewProps {
  technologies: Technology[];
}

interface TechnologiesViewState {
  sort: string;
  selectedTechnology: Technology | null;
}
