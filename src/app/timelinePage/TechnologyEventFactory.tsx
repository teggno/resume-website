import Month from "../Month";
import { Technology } from "../Model";
import React from "react";
import TechnologyIcon from "./TechnologyIcon";
import IconHeader from "./IconHeader";
import TimelineCard from "./TimelineCard";
import Link from "../../common/Link";
import { link } from "../../css";

export default class TechnologyEventFactory {
  constructor(
    private readonly technologies: Technology[],
    private readonly detailUrlOf: StringInOut
  ) {}

  public events() {
    return this.technologies.map(t => ({
      component: () => (
        <ItemComponent technology={t} detailUrlOf={this.detailUrlOf} />
      ),
      from: t.monthStart,
      key: t.name
    }));
  }

  public any() {
    return !!this.technologies.length;
  }

  public static readonly icon = TechnologyIcon;
}

function ItemComponent({
  technology,
  detailUrlOf
}: {
  technology: { name: string; monthStart: Month };
  detailUrlOf: StringInOut;
}) {
  const header = (
    <IconHeader title="First use of technology">
      <TechnologyIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={technology.monthStart}>
      <Link
        className={link}
        href={detailUrlOf(technology.name)}
        scrollToTop={true}
      >
        {technology.name}
      </Link>
    </TimelineCard>
  );
}

interface StringInOut {
  (name: string): string;
}
