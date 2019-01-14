import { ascend, descend, sort, sortWith } from "ramda";
import React from "react";
import { fromToChart, zeroBasedCharts } from "../common/ChartConfig";
import MasterDetail from "../common/MasterDetail";
import SortableList from "../common/SortableList";
import { Project } from "./Model";
import Month from "./Month";
import ProjectDetails from "./ProjectDetails";
import { string } from "../../demo/node_modules/@types/prop-types";

export default function ProjectsPage({
  projects,
  selectedProjectTitle,
  urlOfProject
}: ProjectsPageProps) {
  console.debug("ProjectsPage render");
  const selectedProject = projects.filter(
    p => p.title === selectedProjectTitle
  )[0];
  return (
    <MasterDetail
      backToListRoute={"#projects"}
      detailsVisible={!!selectedProject}
      master={<List projects={projects} />}
      detail={<ProjectDetails project={selectedProject} />}
    />
  );

  function List({ projects }: { projects: Project[] }) {
    return (
      <SortableList
        items={projects}
        sortConfigs={sortConfigs}
        href={p => urlOfProject(p.title)}
      />
    );
  }
}


interface ProjectsPageProps {
  projects: Project[];
  selectedProjectTitle?: string;
  urlOfProject: (name: string) => string;
}

const now = new Date(),
  nowMonth = Month.fromDate(now),
  titleNonCase = (project: Project) => project.title.toLowerCase(),
  titleOf = (project: Project) => project.title,
  subOf = (project: Project) =>
    `${project.duration(now).text()} until ${(
      project.period.to || nowMonth
    ).nameYearShort()}`,
  totalMonths = (p: Project) =>
    Month.diff(p.period.from, p.period.to || nowMonth),
  startMonth = (p: Project) => p.period.from.totalMonths(),
  endMonth = (p: Project) => (p.period.to || nowMonth).totalMonths(),
  sortConfigs = [
    {
      buttonLabel: "End date",
      name: "enddate",
      sort: sortWith([descend(endMonth), descend(totalMonths)]),
      itemTitle: titleOf,
      itemSub: subOf,
      sparkline: fromToChart<Project>(startMonth, endMonth)
    },
    {
      buttonLabel: "Duration",
      name: "duration",
      sort: sortWith([descend(totalMonths), ascend(titleNonCase)]),
      itemTitle: titleOf,
      itemSub: subOf,
      sparkline: zeroBasedCharts<Project>(totalMonths)
    },
    {
      buttonLabel: "A...Z",
      name: "alphabetical",
      sort: sort(ascend(titleNonCase)),
      itemTitle: titleOf,
      itemSub: subOf
    }
  ];
