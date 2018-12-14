import React from "react";
import TimelineList, { TimelineListEvent } from "../common/TimelineList";
import { chain, descend } from "ramda";
import { Project, Technology, Job, Certificate } from "../Model";
import { TemplatedCheckboxList } from "../common/CheckboxList";
import ProjectEventFactory from "./timelinePage/ProjectEventFactory";
import CertificateEventFactory from "./timelinePage/CertificateEventFactory";
import JobEventFactory from "./timelinePage/JobEventFactory";
import TechnologyEventFactory from "./timelinePage/TechnologyEventFactory";
import { iconInText } from "../css";

export default function TimelinePage(props: TimelinePageProps) {
  return (
    <>
      <div className="pa2 pv3 flex">
        <TemplatedCheckboxList
          allItems={props.allEventGroups}
          selectedItems={props.selectedEventGroups}
          onChange={props.onEventGroupSelectionChange}
          keyOf={s => s}
        >
          {group => (
            <>
              <span>{group}</span>{" "}
              <span className={iconInText + " mr2 mr4-ns"}>{eventGroupByName(group).icon()}</span>
            </>
          )}
        </TemplatedCheckboxList>
      </div>
      <TimelineList className="ph2 mw8" events={props.events} />
    </>
  );
}

const eventGroups = [
  {
    name: "Technologies",
    eventFactory: (props: TimelinePageSources) =>
      new TechnologyEventFactory(props.technologies),
    icon: TechnologyEventFactory.icon
  },
  {
    name: "Projects",
    eventFactory: (props: TimelinePageSources) =>
      new ProjectEventFactory(props.projects),
    icon: ProjectEventFactory.icon
  },
  {
    name: "Jobs",
    eventFactory: (props: TimelinePageSources) => new JobEventFactory(props.jobs),
    icon: JobEventFactory.icon
  },
  {
    name: "Certificates",
    eventFactory: (props: TimelinePageSources) =>
      new CertificateEventFactory(props.certificates),
    icon: CertificateEventFactory.icon
  }
];

function eventGroupByName(name: string) {
  return eventGroups.filter(f => f.name === name)[0];
}

export function timelinePagePropsFactory(props: TimelinePageSources) {
  return {
    eventGroupNames: eventGroups
      .filter(f => f.eventFactory(props).any())
      .map(f => f.name),
    events: (selectedEventGroups: string[]) =>
      chain(
        f => f.eventFactory(props).events(),
        eventGroups.filter(f =>
          selectedEventGroups.some(ii => ii === f.name)
        )
      ).sort(descend(e => e.from.totalMonths()))
  };
}

interface TimelinePageSources {
  projects: Project[];
  technologies: Technology[];
  jobs: Job[];
  certificates: Certificate[];
}

interface TimelinePageProps {
  allEventGroups: string[];
  selectedEventGroups: string[];
  onEventGroupSelectionChange: (newSelection: string[]) => void;
  events: TimelineListEvent[];
}
