import { assoc, filter, lens, map, min, over } from "ramda";
import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import colors from "../Colors";
import HashAware from "../common/HashAware";
import Link from "../common/Link";
import { navBarHeight } from "../common/scroll";
import { mainContainer } from "../css";
import Me from "../Me";
import { Project, Technology } from "../Model";
import Month from "../Month";
import { projectRoute, technologyRoute } from "../Routes";
import "./App.css";
import HomePage from "./FilterPage";
import Navigation from "./Navigation";
import "./NavigationTransitions.css";
import "./PageTransitions.css";
import ProjectColorContext from "./ProjectColorContext";
import ProjectsPage from "./ProjectsPage";
import ProjectTablePage from "./ProjectTablePage";
import TechnologiesPage from "./TechnologiesPage";
import TimelinePage, { timelinePagePropsFactory } from "./TimelinePage";
import Welcome from "./Welcome";
import "./WelcomeTransitions.css";
import About from "./About";

export default function App(props: AppProps) {
  const [welcomeVisible, setWelcomeVisible] = useState(true);

  return (
    <div className={mainContainer + " relative"}>
      <AppContent {...props} />
      {welcomeVisible ? null : <About />}
      <CSSTransition
        in={welcomeVisible}
        timeout={600}
        classNames="welcome"
        unmountOnExit={true}
      >
        <Welcome onHide={() => setWelcomeVisible(false)} />
      </CSSTransition>
    </div>
  );
}
class AppContent extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    const technologies = (this.technologies = props.me.technologies()),
      eventGroupNames = timelinePagePropsFactory({
        certificates: props.me.certificates(),
        jobs: props.me.jobs(),
        projects: props.me.projects(),
        technologies: technologies,
      }).eventGroupNames;

    this.state = {
      selectedTechnologies: technologies,
      yearFrom: technologies.reduce(
        (prev, current) => min(prev, current.monthStart.year),
        Number.MAX_VALUE
      ),
      selectedEventGroups: eventGroupNames,
      welcomeVisible: true,
    };

    this.handleFiltersChage = this.handleFiltersChage.bind(this);
    this.handleEventGroupSelectionChange = this.handleEventGroupSelectionChange.bind(
      this
    );
    this.isProjectInTimeRange = this.isProjectInTimeRange.bind(this);
  }

  private technologies: Technology[];

  render() {
    return (
      <HashAware>
        {(hash: string) => (
          <ProjectColorContext.Provider
            value={(title: string) => this.colorForProject(title) || "cyan"}
          >
            <CSSTransition
              timeout={600}
              classNames="home"
              in={hash.trim() === ""}
              appear={true}
            >
              <header
                className="fixed bg-white left-0 w-100 z-999 shadow-5"
                id="header"
              >
                <Navigation className="navigation" />
              </header>
            </CSSTransition>
            <main role="main">
              <TransitionGroup className="relative">
                <CSSTransition
                  key={hash}
                  classNames="page"
                  timeout={600}
                  in={true}
                >
                  {whenFn(
                    () => (
                      <HomePage
                        technologies={this.technologies}
                        selectedTechnologies={this.state.selectedTechnologies}
                        onFiltersChange={this.handleFiltersChage}
                        yearFrom={this.state.yearFrom}
                        technologyGroups={this.props.me.technologyGroups()}
                        style={{ paddingBottom: navBarHeight() }}
                      />
                    ),
                    [
                      hash.indexOf("#projects") === 0,
                      () => (
                        <div style={{ paddingTop: navBarHeight() }}>
                          <ProjectsPage
                            projects={this.projects()}
                            selectedProjectTitle={projectRoute.nameFromHash(
                              hash
                            )}
                          />
                        </div>
                      ),
                    ],
                    [
                      hash.indexOf("#technologies") === 0,
                      () => (
                        <div style={{ paddingTop: navBarHeight() }}>
                          <TechnologiesPage
                            technologies={this.technologiesWithFilteredProjects()}
                            selectedTechnologyTitle={technologyRoute.nameFromHash(
                              hash
                            )}
                          />
                        </div>
                      ),
                    ],
                    [
                      hash.indexOf("#timeline") === 0,
                      () => {
                        const tp = timelinePagePropsFactory({
                          projects: this.projects(),
                          technologies: this.state.selectedTechnologies,
                          certificates: this.props.me.certificates(),
                          jobs: this.props.me.jobs(),
                        });
                        return (
                          <div style={{ paddingTop: navBarHeight() }}>
                            <TimelinePage
                              allEventGroups={tp.eventGroupNames}
                              selectedEventGroups={
                                this.state.selectedEventGroups
                              }
                              events={tp.events(this.state.selectedEventGroups)}
                              onEventGroupSelectionChange={
                                this.handleEventGroupSelectionChange
                              }
                            />
                          </div>
                        );
                      },
                    ],
                    [
                      hash.indexOf("#projecttable") === 0,
                      () => <ProjectTablePage projects={this.projects()} />,
                    ]
                  )}
                </CSSTransition>
              </TransitionGroup>
              <CSSTransition
                timeout={600}
                appear={true}
                in={hash.trim() === ""}
                classNames="fab"
              >
                <Link
                  href="#"
                  className="pointer h3 w3 br-100 bg-darker-green white f6 fixed bottom-1 flex tc right-1 z-999 items-center pa0 no-underline bn shadow-5"
                >
                  <span className="pa2">Start over</span>
                </Link>
              </CSSTransition>
            </main>
          </ProjectColorContext.Provider>
        )}
      </HashAware>
    );
  }

  private handleEventGroupSelectionChange(newSelection: string[]) {
    this.setState({ selectedEventGroups: newSelection });
  }

  private handleFiltersChage(technologies: Technology[], yearFrom: number) {
    this.setState({
      selectedTechnologies: technologies,
      yearFrom: yearFrom,
    });
  }

  private colorForProject = colors(this.props.me.projects().length).keyed;

  private projects() {
    const techLens = lens(
        (t) => t.technologies,
        (t: ProjectTech[], p: { technologies: ProjectTech[] }) => {
          p.technologies = t;
          return p;
        }
      ),
      filterTechs = filter((t: ProjectTech) =>
        this.state.selectedTechnologies.some((tt) => tt.name === t.name)
      ),
      overTechs = over(techLens, filterTechs),
      onlyWithSelectedTechs = (map(overTechs) as any) as (
        projects: Project[]
      ) => Project[];

    return onlyWithSelectedTechs(this.props.me.projects()).filter(
      (p) => this.isProjectInTimeRange(p) && !!p.technologies.length
    );
  }

  private technologiesWithFilteredProjects() {
    let projectProp: keyof Technology = "projects";
    return this.state.selectedTechnologies.map(
      (t) =>
        assoc(
          projectProp,
          t.projects.filter(this.isProjectInTimeRange),
          t
        ) as Technology
    );
  }

  private isProjectInTimeRange(p: Project) {
    return this.startMonth().lt(
      p.period.to ? p.period.to : Month.fromDate(new Date())
    );
  }

  private startMonth() {
    return new Month(this.state.yearFrom, new Date().getMonth() + 1);
  }
}

interface AppProps {
  me: Me;
}

interface AppState {
  selectedTechnologies: Technology[];
  yearFrom: number;
  selectedEventGroups: string[];
  welcomeVisible: boolean;
}

interface ProjectTech {
  name: string;
  tasks?: string[];
}

function when<T>(dflt: T, ...cases: [boolean, T][]) {
  for (let i = 0; i < cases.length; i++) {
    let [use, v] = cases[i];
    if (use) return v;
  }
  return dflt;
}

function whenFn<T>(dflt: () => T, ...cases: [boolean, () => T][]) {
  return when(dflt, ...cases)();
}
