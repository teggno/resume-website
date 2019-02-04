import React from "react";
import HashAware from "./HashAware";
import { mainContainer } from "../../src/css";
import { projectRoute, technologyRoute } from "./Routes";
import HomePage from "./HomePage";
import { min, lens, over, filter, map, assoc } from "ramda";
import Navigation from "./Navigation";
import "./App.css";
import {
  Month,
  TimelinePage,
  Me,
  Project,
  Technology,
  ProjectTablePage,
  TechnologiesPage,
  ProjectsPage
} from "resume-website";
import LogoAdwise from "./LogoAdwise";
import Link from "./Link";
import { navBarHeight } from "./scroll";
import { useState } from "react";

export default function(props: AppProps) {
  const technologies = props.me.technologies(),
    [selectedTechnologies, setSelectedTechnologies] = useState(technologies),
    [yearFrom, setYearFrom] = useState(
      technologies.reduce(
        (prev, current) => min(prev, current.monthStart.year),
        Number.MAX_VALUE
      )
    ),
    certificates = props.me.certificates(),
    projects = filterProjects(),
    jobs = props.me.jobs(),
    [selectedEventTypes, setSelectedEventTypes] = useState(
      TimelinePage.eventTypes({
        certificates: !!certificates.length,
        jobs: !!jobs.length,
        projects: !!projects.length,
        technologies: !!technologies.length
      })
    );

  return (
    <div className={mainContainer}>
      <header
        className={"bg-white shadow-1 fixed w-100 z-999 top-0"}
        id="header"
      >
        <div className="dib h2 w2 v-mid ml2">
          <Link href="#">
            <LogoAdwise />
          </Link>
        </div>
        <Navigation />
      </header>
      <main role="main" style={{ marginTop: navBarHeight() }}>
        <HashAware>
          {(hash: string) => {
            if (hash.indexOf("#projects") === 0) {
              return (
                <ProjectsPage
                  projects={projects}
                  selectedProjectTitle={projectRoute.nameFromHash(hash)}
                  urlOfProject={projectRoute.hashFromName}
                />
              );
            } else if (hash.indexOf("#technologies") === 0) {
              return (
                <TechnologiesPage
                  technologies={technologiesWithFilteredProjects()}
                  selectedTechnologyTitle={technologyRoute.nameFromHash(hash)}
                  urlOfTechnology={technologyRoute.hashFromName}
                  colorOfProject={colorForProject}
                />
              );
            } else if (hash.indexOf("#timeline") === 0) {
              return <TimelinePage
                certificates={certificates}
                jobs={jobs}
                projects={projects}
                technologies={selectedTechnologies}
                selectedEventTypes={selectedEventTypes}
                onSelectedEventTypesChanged={setSelectedEventTypes}
              />;
            } else if (hash.indexOf("#projecttable") === 0) {
              return (
                <ProjectTablePage
                  projects={projects}
                  urlOfProject={projectRoute.hashFromName}
                  colorOfProject={colorForProject}
                />
              );
            } else {
              return (
                <HomePage
                  technologies={technologies}
                  selectedTechnologies={selectedTechnologies}
                  onFiltersChange={handleFiltersChage}
                  yearFrom={yearFrom}
                  technologyGroups={props.me.technologyGroups()}
                />
              );
            }
          }}
        </HashAware>
      </main>
    </div>
  );

  function handleFiltersChage(technologies: Technology[], yearFrom: number) {
    setSelectedTechnologies(technologies);
    setYearFrom(yearFrom);
  }

  function colorForProject(title: string) {
    return "cyan";
  }

  function filterProjects() {
    const techLens = lens(
        t => t.technologies,
        (t: ProjectTech[], p: { technologies: ProjectTech[] }) => {
          p.technologies = t;
          return p;
        }
      ),
      filterTechs = filter((t: ProjectTech) =>
        selectedTechnologies.some(tt => tt.name === t.name)
      ),
      overTechs = over(techLens, filterTechs),
      onlyWithSelectedTechs = (map(overTechs) as any) as (
        projects: Project[]
      ) => Project[];

    return onlyWithSelectedTechs(props.me.projects()).filter(
      p => isProjectInTimeRange(p) && !!p.technologies.length
    );
  }

  function technologiesWithFilteredProjects() {
    let projectProp: keyof Technology = "projects";
    return selectedTechnologies.map(
      t =>
        assoc(
          projectProp,
          t.projects.filter(isProjectInTimeRange),
          t
        ) as Technology
    );
  }

  function isProjectInTimeRange(p: Project) {
    return startMonth().lt(
      p.period.to ? p.period.to : Month.fromDate(new Date())
    );
  }

  function startMonth() {
    return new Month(yearFrom, new Date().getMonth() + 1);
  }
}

interface AppProps {
  me: Me;
}

interface ProjectTech {
  name: string;
  tasks?: string[];
}
