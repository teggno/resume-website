import React from "react";
import TimelineList, { TimelineListEvent } from "../common/TimelineList";
import { chain, descend, any } from "ramda";
import { Project, Technology, Job, Certificate } from "../Model";
import { TemplatedCheckboxList } from "../common/CheckboxList";
import ProjectEventFactory from "./timelinePage/ProjectEventFactory";
import CertificateEventFactory from "./timelinePage/CertificateEventFactory";
import JobEventFactory from "./timelinePage/JobEventFactory";
import TechnologyEventFactory from "./timelinePage/TechnologyEventFactory";

export default function TimelinePage(props: TimelinePageProps) {
  return (
    <>
      <div className="pa2 flex">
        <TemplatedCheckboxList
          allItems={props.allEventGroups}
          selectedItems={props.selectedEventGroups}
          onChange={props.onEventGroupSelectionChange}
          keyOf={s => s}
        >
          {group => (
            <>
              <span>{group}</span>{" "}
              <span className="w1 h1 mr4 dib relative" style={{top:3}}>{factoryByName(group).icon()}</span>
            </>
          )}
        </TemplatedCheckboxList>
      </div>
      <TimelineList className="ph2 mw8" events={props.events} />
    </>
  );
}

const eventFactories = [
  {
    name: "Technologies",
    factory: (props: TimelinePageSources) =>
      new TechnologyEventFactory(props.technologies),
    icon: TechnologyEventFactory.icon
  },
  {
    name: "Projects",
    factory: (props: TimelinePageSources) =>
      new ProjectEventFactory(props.projects),
    icon: ProjectEventFactory.icon
  },
  {
    name: "Jobs",
    factory: (props: TimelinePageSources) => new JobEventFactory(props.jobs),
    icon: JobEventFactory.icon
  },
  {
    name: "Certificates",
    factory: (props: TimelinePageSources) =>
      new CertificateEventFactory(props.certificates),
    icon: CertificateEventFactory.icon
  }
];

function factoryByName(name: string) {
  return eventFactories.filter(f => f.name === name)[0];
}

export function timelineEventFactory(props: TimelinePageSources) {
  return {
    eventGroupNames: eventFactories
      .filter(f => f.factory(props).any())
      .map(f => f.name),
    events: (selectedEventGroups: string[]) =>
      chain(
        f => f.factory(props).events(),
        eventFactories.filter(f =>
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
