import Month from "../Month";
import { Technology } from "../Model";
import React from "react";
import { CodeIcon } from "../../common/icons/Icons";
import IconHeader from "./IconHeader";
import TimelineCard from "./TimelineCard";
import Link from "../../common/Link";
import { technologyRoute } from "../../demo/Routes";
import { link } from "../../css";

export default class TechnologyEventFactory {
  constructor(
    private readonly technologies: Technology[]
  ) {}

  public events() {
    return this.technologies.map(t => ({
      component: () => <ItemComponent technology={t} />,
      from: t.monthStart,
      key: t.name
    }));
  }

  public any() {
    return !!this.technologies.length;
  }

  public static readonly icon = CodeIcon;
}

function ItemComponent({
  technology
}: {
  technology: { name: string; monthStart: Month };
}) {
  const header = (
    <IconHeader title="First use of technology">
      <CodeIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={technology.monthStart}>
      <Link
        className={link}
        href={technologyRoute.hashFromName(technology.name)}
        scrollToTop={true}
      >
        {technology.name}
      </Link>
    </TimelineCard>
  );
}
