import React from "react";
import ProjectColorContext from "./app/ProjectColorContext";
import ProjectsPage from "./app/ProjectsPage";
import ProjectTablePage from "./app/ProjectTablePage";
import TechnologiesPage from "./app/TechnologiesPage";
import TimelinePage from "./app/TimelinePage";
import colors from "./Colors";
import HashAware from "./common/HashAware";
import { mainContainer } from "./css";
import Me from "./Me";
import { projectRoute, technologyRoute } from "./Routes";
import HomePage from "./app/HomePage";
import { Technology, Project } from "./Model";
import { min, lens, over, filter, map } from "ramda";
import Navigation from "./app/Navigation";

export default class App extends React.Component<
  AppProps,
  { selectedTechnologies: Technology[]; yearFrom: number }
> {
  constructor(props: AppProps) {
    super(props);

    this.technologies = props.me.technologies();

    this.state = {
      selectedTechnologies: this.technologies,
      yearFrom: this.technologies.reduce(
        (prev, current) => min(prev, current.monthStart.year),
        Number.MAX_VALUE
      )
    };

    this.handleFiltersChage = this.handleFiltersChage.bind(this);
  }

  private technologies: Technology[];

  render() {
    return (
      <div className={mainContainer}>
        <ProjectColorContext.Provider
          value={(title: string) => this.colorForProject(title) || "cyan"}
        >
          <Navigation />
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
                    technologies={this.state.selectedTechnologies}
                    selectedTechnologyTitle={technologyRoute.nameFromHash(hash)}
                  />
                );
              } else if (hash.indexOf("#timeline") === 0) {
                return (
                  <TimelinePage
                    projects={this.projects()}
                    technologies={this.state.selectedTechnologies}
                    certificates={this.props.me.certificates()}
                    jobs={this.props.me.jobs()}
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
        </ProjectColorContext.Provider>
      </div>
    );
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
      p =>
        (p.period.to ? p.period.to.year : new Date().getFullYear()) >=
          this.state.yearFrom && !!p.technologies.length
    );
  }
}

interface AppProps {
  me: Me;
}

interface ProjectTech {
  name: string;
  tasks?: string[];
}
