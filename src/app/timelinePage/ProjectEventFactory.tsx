import { Project } from "../Model";
import React from "react";
import ProjectIcon from "./ProjectIcon";
import IconHeader from "./IconHeader";
import TimelineCard from "./TimelineCard";
import Link from "../../common/Link";
import { link } from "../../css";
import Period from "../Period";

export default class ProjectEventFactory {
  constructor(
    private readonly projects: Project[],
    private readonly detailUrlOf: StringInOut
  ) {}

  public events() {
    return this.projects.map(p => ({
      component: () => (
        <ItemComponent project={p} detailUrlOf={this.detailUrlOf} />
      ),
      from: p.period.from,
      key: p.title
    }));
  }

  public any() {
    return !!this.projects.length;
  }

  public static readonly icon = ProjectIcon;
}

function ItemComponent({
  project,
  detailUrlOf
}: {
  project: { title: string; period: Period };
  detailUrlOf: StringInOut;
}) {
  const header = (
    <IconHeader title="Started working in project">
      <ProjectIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={project.period.from}>
      <Link
        className={link}
        href={detailUrlOf(project.title)}
        scrollToTop={true}
      >
        {project.title}
      </Link>
    </TimelineCard>
  );
}

interface StringInOut {
  (name: string): string;
}
