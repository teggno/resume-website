import React from "react";
import { Project } from "../Model";
import { MasterDetail } from "../common/MasterDetail";
import { sort, ascend, sortWith, descend } from "ramda";
import Month from "../Month";
import { projectRoute } from "../Routes";
import SortableList from "../common/SortableList";

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
          Details for project{" "}
          {
            selectedProject ?
            selectedProject.title
            : ""
          }{" "}
          go here
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

const titleNonCase = (project: Project) => project.title.toLowerCase();
const nowMonth = Month.fromDate(new Date());
const titleOf = (project: Project) => project.title;
const subOf = (project: Project) =>
  `until ${(project.period.to || nowMonth).toString()}`;
const sortButtons = [
  {
    label: "Duration",
    name: "duration",
    sort: sortWith([
      descend((p: Project) =>
        Month.diff(p.period.from, p.period.to || nowMonth)
      ),
      ascend((p: Project) => p.title)
    ]),
    itemTitle: titleOf,
    itemSub: subOf
  },
  {
    label: "A...Z",
    name: "alphabetical",
    sort: sort(ascend(titleNonCase)),
    itemTitle: titleOf,
    itemSub: subOf
  }
];
