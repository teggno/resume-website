import { Project } from "../../Model";
import React from "react";
import { PuzzleIcon } from "../../common/icons/Icons";
import IconHeader from "./IconHeader";
import TimelineCard from "./TimelineCard";
import Link from "../../common/Link";
import { link } from "../../css";
import { projectRoute } from "../../Routes";
import Period from "../../Period";

export default class ProjectEventFactory {
  constructor(private readonly projects: Project[]) {}

  public events() {
    return this.projects.map(p => ({
      component: () => <ItemComponent project={p} />,
      from: p.period.from,
      key: p.title
    }));
  }

  public readonly name = "Projects";

  public any() {
    return !!this.projects.length;
  }
}

function ItemComponent({
  project
}: {
  project: { title: string; period: Period };
}) {
  const header = (
    <IconHeader title="Started working in project">
      <PuzzleIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={project.period.from}>
      <Link
        className={link}
        href={projectRoute.hashFromName(project.title)}
        scrollToTop={true}
      >
        {project.title}
      </Link>
    </TimelineCard>
  );
}
