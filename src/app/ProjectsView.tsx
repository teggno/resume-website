import React from "react";
import { Project } from "../Model";
import MasterDetail from "../common/MasterDetail";
import { sort, ascend, sortWith, descend } from "ramda";
import Month from "../Month";
import { projectRoute } from "../Routes";
import SortableList from "../common/SortableList";
import { zeroBasedCharts, fromToChart } from "../common/ChartConfig";
import ProjectDetails from "./ProjectDetails";

export default function ProjectsView(props: ProjectsViewProps) {
  console.debug("ProjectsView render");
  const selectedProject = props.projects.filter(
    p => p.title === props.selectedProjectTitle
  )[0];
  return (
    <MasterDetail
      backToListRoute={"#projects"}
      detailsVisible={!!selectedProject}
      master={<List projects={props.projects} />}
      detail={<ProjectDetails project={selectedProject} />}
    />
  );
}

function List({ projects }: { projects: Project[] }) {
  return (
    <SortableList
      items={projects}
      buttons={sortButtons}
      href={p => projectRoute.hashFromName(p.title)}
    />
  );
}

interface ProjectsViewProps {
  projects: Project[];
  selectedProjectTitle?: string;
}

const now = new Date(),
  nowMonth = Month.fromDate(now),
  titleNonCase = (project: Project) => project.title.toLowerCase(),
  titleOf = (project: Project) => project.title,
  subOf = (project: Project) =>
    `${project.duration(now).text()} until ${(project.period.to || nowMonth).nameYearShort()}`,
  totalMonths = (p: Project) =>
    Month.diff(p.period.from, p.period.to || nowMonth),
  startMonth = (p: Project) => p.period.from.totalMonths(),
  endMonth = (p: Project) => (p.period.to || nowMonth).totalMonths(),
  techsUsed = (p: Project) => p.technologies.length,
  sortButtons = [
    {
      label: "Duration",
      name: "duration",
      sort: sortWith([descend(totalMonths), ascend(titleNonCase)]),
      itemTitle: titleOf,
      itemSub: subOf,
      sprk: zeroBasedCharts<Project>(totalMonths)
    },
    {
      label: "Most recent",
      name: "recent",
      sort: sortWith([descend(endMonth), descend(totalMonths)]),
      itemTitle: titleOf,
      itemSub: subOf,
      sprk: fromToChart<Project>(startMonth, endMonth)
    },
    {
      label: "Technologies used",
      name: "techsUsed",
      sort: sortWith([descend(techsUsed), ascend(titleNonCase)]),
      itemTitle: titleOf,
      itemSub: subOf,
      sprk: zeroBasedCharts(techsUsed)
    },
    {
      label: "A...Z",
      name: "alphabetical",
      sort: sort(ascend(titleNonCase)),
      itemTitle: titleOf,
      itemSub: subOf
    }
  ];
