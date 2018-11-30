import React from "react";
import { Project } from "../Model";
import { MasterDetail } from "../common/MasterDetail";
import { sort, ascend, sortWith, descend } from "ramda";
import Month from "../Month";
import { projectRoute } from "../Routes";
import SortableList from "../common/SortableList";
import { zeroBasedCharts, fromToChart } from "../common/ChartConfig";

export function ProjectsView(props: ProjectsViewProps) {
  console.debug("ProjectsView render");
  const selectedProject = props.projects.filter(
    p => p.title === props.selectedProjectTitle
  )[0];
  return (
    <MasterDetail
      backToListRoute={"#projects"}
      detailsVisible={!!selectedProject}
      master={<List projects={props.projects} />}
      detail={
        <div>
          Details for project {selectedProject ? selectedProject.title : ""} go
          here
        </div>
      }
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

const titleNonCase = (project: Project) => project.title.toLowerCase(),
  nowMonth = Month.fromDate(new Date()),
  titleOf = (project: Project) => project.title,
  subOf = (project: Project) =>
    `until ${(project.period.to || nowMonth).toString()}`,
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
