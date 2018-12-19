import React from "react";
import ProjectColorContext from "./app/ProjectColorContext";
import ProjectsPage from "./app/ProjectsPage";
import ProjectTablePage from "./app/ProjectTablePage";
import TechnologiesPage from "./app/TechnologiesPage";
import TimelinePage, { timelinePagePropsFactory } from "./app/TimelinePage";
import colors from "./Colors";
import HashAware from "./common/HashAware";
import { mainContainer } from "./css";
import Me from "./Me";
import { projectRoute, technologyRoute } from "./Routes";
import HomePage from "./app/HomePage";
import { Technology, Project } from "./Model";
import { min, lens, over, filter, map, assoc } from "ramda";
import Navigation from "./app/Navigation";
import "./compatibility.css";
import Month from "./Month";
import LogoAdwise from "./app/LogoAdwise";
import Link from "./common/Link";
import { navBarHeight } from "./scroll";

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    const technologies = (this.technologies = props.me.technologies()),
      eventGroupNames = timelinePagePropsFactory({
        certificates: props.me.certificates(),
        jobs: props.me.jobs(),
        projects: props.me.projects(),
        technologies: technologies
      }).eventGroupNames;

    this.state = {
      selectedTechnologies: technologies,
      yearFrom: technologies.reduce(
        (prev, current) => min(prev, current.monthStart.year),
        Number.MAX_VALUE
      ),
      selectedEventGroups: eventGroupNames
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
      <div className={mainContainer}>
        <ProjectColorContext.Provider
          value={(title: string) => this.colorForProject(title) || "cyan"}
        >
          <header className={"bg-white shadow-1 fixed w-100 z-999 top-0"} id="header">
            <div className="dib h2 w2 v-mid ml2">
              <Link href="#"><LogoAdwise /></Link>
            </div>
            <Navigation />
          </header>
          <main role="main" style={{ marginTop: navBarHeight() }}>
            <HashAware>
              {(hash: string) => {
                if (hash.indexOf("#projects") === 0) {
                  return (
                    <ProjectsPage
                      projects={this.projects()}
                      selectedProjectTitle={projectRoute.nameFromHash(hash)}
                    />
                  );
                } else if (hash.indexOf("#technologies") === 0) {
                  return (
                    <TechnologiesPage
                      technologies={this.technologiesWithFilteredProjects()}
                      selectedTechnologyTitle={technologyRoute.nameFromHash(
                        hash
                      )}
                    />
                  );
                } else if (hash.indexOf("#timeline") === 0) {
                  const tp = timelinePagePropsFactory({
                    projects: this.projects(),
                    technologies: this.state.selectedTechnologies,
                    certificates: this.props.me.certificates(),
                    jobs: this.props.me.jobs()
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
                } else if (hash.indexOf("#projecttable") === 0) {
                  return <ProjectTablePage projects={this.projects()} />;
                } else {
                  return (
                    <HomePage
                      technologies={this.technologies}
                      selectedTechnologies={this.state.selectedTechnologies}
                      onFiltersChange={this.handleFiltersChage}
                      yearFrom={this.state.yearFrom}
                      technologyGroups={this.props.me.technologyGroups()}
                    />
                  );
                }
              }}
            </HashAware>
          </main>
        </ProjectColorContext.Provider>
      </div>
    );
  }

  private handleEventGroupSelectionChange(newSelection: string[]) {
    this.setState({ selectedEventGroups: newSelection });
  }

  private handleFiltersChage(technologies: Technology[], yearFrom: number) {
    this.setState({
      selectedTechnologies: technologies,
      yearFrom: yearFrom
    });
  }

  private colorForProject = colors(this.props.me.projects().length).keyed;

  private projects() {
    const techLens = lens(
        t => t.technologies,
        (t: ProjectTech[], p: { technologies: ProjectTech[] }) => {
          p.technologies = t;
          return p;
        }
      ),
      filterTechs = filter((t: ProjectTech) =>
        this.state.selectedTechnologies.some(tt => tt.name === t.name)
      ),
      overTechs = over(techLens, filterTechs),
      onlyWithSelectedTechs = (map(overTechs) as any) as (
        projects: Project[]
      ) => Project[];

    return onlyWithSelectedTechs(this.props.me.projects()).filter(
      p => this.isProjectInTimeRange(p) && !!p.technologies.length
    );
  }

  private technologiesWithFilteredProjects() {
    let projectProp: keyof Technology = "projects";
    return this.state.selectedTechnologies.map(
      t =>
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
}

interface ProjectTech {
  name: string;
  tasks?: string[];
}
