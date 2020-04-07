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
import HomePage from "./HomePage";
import LogoAdwise from "./LogoAdwise";
import Navigation from "./Navigation";
import ProjectColorContext from "./ProjectColorContext";
import ProjectsPage from "./ProjectsPage";
import ProjectTablePage from "./ProjectTablePage";
import "./PageTransitions.css";
import "./WelcomeTransitions.css";
import TechnologiesPage from "./TechnologiesPage";
import TimelinePage, { timelinePagePropsFactory } from "./TimelinePage";
import Welcome from "./Welcome";

export default function App(props: AppProps) {
  const [welcomeVisible, setWelcomeVisible] = useState(true);

  return (
    <div className={mainContainer + " relative"}>
      <AppContent {...props} />
      <CSSTransition in={welcomeVisible} timeout={600} classNames="welcome">
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
      <ProjectColorContext.Provider
        value={(title: string) => this.colorForProject(title) || "cyan"}
      >
        <header
          className={
            "bg-white shadow-1 fixed w-100 z-999 top-0 flex items-center"
          }
          id="header"
        >
          <div className="h2 w2 ml2">
            <Link href="#">
              <LogoAdwise />
            </Link>
          </div>
          <Navigation />
        </header>
        <main role="main" style={{ paddingTop: navBarHeight() }}>
          <HashAware>
            {(hash: string) => (
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
                      />
                    ),
                    [
                      hash.indexOf("#projects") === 0,
                      () => (
                        <ProjectsPage
                          projects={this.projects()}
                          selectedProjectTitle={projectRoute.nameFromHash(hash)}
                        />
                      ),
                    ],
                    [
                      hash.indexOf("#technologies") === 0,
                      () => (
                        <TechnologiesPage
                          technologies={this.technologiesWithFilteredProjects()}
                          selectedTechnologyTitle={technologyRoute.nameFromHash(
                            hash
                          )}
                        />
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
                          <TimelinePage
                            allEventGroups={tp.eventGroupNames}
                            selectedEventGroups={this.state.selectedEventGroups}
                            events={tp.events(this.state.selectedEventGroups)}
                            onEventGroupSelectionChange={
                              this.handleEventGroupSelectionChange
                            }
                          />
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
            )}
          </HashAware>
        </main>
      </ProjectColorContext.Provider>
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
