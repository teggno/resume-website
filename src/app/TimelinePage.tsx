import React from "react";
import TimelineList, { TimelineListEvent } from "../common/TimelineList";
import { chain, descend } from "ramda";
import { Project, Technology, Job, Certificate } from "../Model";
import CheckboxList from "../common/CheckboxList";
import ProjectEventFactory from "./timelinePage/ProjectEventFactory";
import CertificateEventFactory from "./timelinePage/CertificateEventFactory";
import JobEventFactory from "./timelinePage/JobEventFactory";
import TechnologyEventFactory from "./timelinePage/TechnologyEventFactory";

export default function TimelinePage(props: TimelinePageProps) {
  return (
    <>
      <div className="pa2">
        <CheckboxList
          allItems={props.allEventGroups}
          selectedItems={props.selectedEventGroups}
          onChange={props.onEventGroupSelectionChange}
          nameOf={s => s}
        />
      </div>
      <TimelineList className="ph2 mw8" events={props.events} />
    </>
  );
}

export function timelineEventFactory(props: TimelinePageSources) {
  const eventFactories = [
    new TechnologyEventFactory(props.technologies),
    new ProjectEventFactory(props.projects),
    new JobEventFactory(props.jobs),
    new CertificateEventFactory(props.certificates)
  ];

  return {
    eventGroupNames: eventFactories.filter(f => f.any()).map(f => f.name),
    events: (selectedEventGroups: string[]) =>
      chain(
        f => f.events(),
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
