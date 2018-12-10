import { Job } from "../../Model";
import React from "react";
import { ManWithCompanyIcon } from "../../common/icons/Icons";
import IconHeader from "./IconHeader";
import TimelineCard from "./TimelineCard";
import { chain } from "ramda";

export default class JobEventFactory {
  constructor(private readonly jobs: Job[]) {}

  public events() {
    return chain(j => j.titles.map(t => ({ title: t, job: j })), this.jobs).map(
      t => ({
        component: () => <JobTitleComponent jobTitle={t} />,
        from: t.title.period.from,
        key: t.title.period.from.totalMonths().toString() + t.title.title
      })
    );
  }
  public any() {
    return !!this.jobs.length;
  }

  public static readonly icon = ManWithCompanyIcon;
}

function JobTitleComponent({ jobTitle }: { jobTitle: any }) {
  const header = (
    <IconHeader title="New job title">
      <ManWithCompanyIcon />
    </IconHeader>
  );
  return (
    <TimelineCard header={header} from={jobTitle.title.period.from}>
      {`${jobTitle.title.title} at ${jobTitle.job.company}`}
    </TimelineCard>
  );
}
