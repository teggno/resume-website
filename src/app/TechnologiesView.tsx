import { ascend, descend, min, sort } from "ramda";
import React from "react";
import { ButtonList } from "../common/ButtonList";
import { isElementTopLeftInViewport } from "../DomHelpers";
import { Technology } from "../Model";
import { comparer } from "../Sorting";
import "./TechnologiesView.css";
import TechnologyDetails from "./TechnologyDetails";
import { TechnologyList } from "./TechnologyList";

export class TechnologiesView extends React.Component<
  TechnologiesViewProps,
  TechnologiesViewState
> {
  constructor(props: Readonly<TechnologiesViewProps>) {
    super(props);
    this.state = {
      sort: sortButtons[0].name
    };
    this.technologyDetailsRef = React.createRef();
  }

  render() {
    console.debug("TechnologiesView render");
    const sortButton = findSortButton(this.state.sort),
      minNumber = sortButton.chartMin
        ? (sortButton.chartMin as any)(this.props.technologies)
        : undefined,
      chartMin = minNumber ? () => minNumber : undefined,
      selectedTechnology = this.selectedTechnology();
    {
      /* overflow-hidden because the way off canvas of the list is done would
         otherwise cause horizontal scrollbars */
    }
    return (
      <div className="overflow-hidden">
        <div className={"flex offc" + (selectedTechnology ? " off on-ns" : "")}>
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
            {selectedTechnology ? (
              <div>
                <div className="ph2">
                  <a className="dn-ns link" href="#technologies">
                    Back to list
                  </a>
                </div>
                <TechnologyDetails technology={selectedTechnology} />
              </div>
            ) : (
              <div className="relative">
                <div className="f2 fixed mt6 mw6 tc lh-copy">
                  Click a technology in the list to the left to see what I used
                  it for.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    console.debug("TechnologiesView.componentDidUpdate");
    this.scroll();
  }

  private scroll() {
    if (!this.props.selectedTechnologyName) return;
    if (isElementTopLeftInViewport(this.technologyDetailsRef.current)) return;

    this.technologyDetailsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  private selectedTechnology() {
    return this.props.technologies.filter(
      t => t.name === this.props.selectedTechnologyName
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
      (tech: any) => tech.monthEnd.totalMonths(),
      descend,
      (tech: any) => tech.experienceGross,
      descend
    ),
    barFrom: (t: Technology) => t.monthStart.totalMonths(),
    barTo: (t: Technology) => t.monthEnd.totalMonths(),
    chartMin: (t: Technology[]) =>
      t.map(t => t.monthStart.totalMonths()).reduce(min, Number.MAX_VALUE)
  },
  {
    label: "A...Z",
    name: "alphabetical",
    comparer: ascend(extractName)
  }
];

interface TechnologiesViewProps {
  technologies: Technology[];
  selectedTechnologyName?: string;
}

interface TechnologiesViewState {
  sort: string;
}
