import React from "react";
import TimelineList from "../common/TimelineList";
import { Project, Technology, Job, Certificate } from "./Model";
import { TemplatedCheckboxList } from "../common/CheckboxList";
import ProjectEventFactory from "./timelinePage/ProjectEventFactory";
import CertificateEventFactory from "./timelinePage/CertificateEventFactory";
import JobEventFactory from "./timelinePage/JobEventFactory";
import TechnologyEventFactory from "./timelinePage/TechnologyEventFactory";
import { iconInText } from "../css";



function TimelinePage(props: TimelinePageProps) {
  return (
    <>
      <div className="pa2 pv3 flex">
        <TemplatedCheckboxList
          allItems={TimelinePage.eventTypes({
            certificates: !!props.certificates.length,
            jobs: !!props.jobs.length,
            projects: !!props.projects.length,
            technologies: !!props.technologies.length
          })}
          selectedItems={props.selectedEventTypes}
          onChange={props.onSelectedEventTypesChanged}
          keyOf={s => s}
        >
          {group => (
            <>
              <span>{group}</span>{" "}
              <span className={iconInText + " mr2 mr4-ns"}>
                {eventGroups[group].icon()}
              </span>
            </>
          )}
        </TemplatedCheckboxList>
      </div>
      <TimelineList
        className="ph2 mw8"
        events={new CertificateEventFactory(props.certificates).events()}
      />
    </>
  );
}


namespace TimelinePage {
  /**
   * Returns an array containing the names of event types where the corresponding
   * field of p is true.
   */
  export function eventTypes(p: {
    certificates: boolean;
    jobs: boolean;
    projects: boolean;
    technologies: boolean;
  }) {
    const x: EventType[] = [];

    if (p.certificates) x.push(eventGroups.Certificates.name);
    if (p.jobs) x.push(eventGroups.Jobs.name);
    if (p.projects) x.push(eventGroups.Projects.name);
    if (p.technologies) x.push(eventGroups.Technologies.name);
    return x;
  }
}


export default TimelinePage;

const eventGroups: {
  [key in EventType]: { name: EventType; icon: () => JSX.Element }
} = {
  Certificates: {
    name: "Certificates",
    icon: CertificateEventFactory.icon
  },
  Jobs: {
    name: "Jobs",
    icon: JobEventFactory.icon
  },
  Projects: {
    name: "Projects",
    icon: ProjectEventFactory.icon
  },
  Technologies: {
    name: "Technologies",
    icon: TechnologyEventFactory.icon
  }
};

type EventType = "Certificates" | "Jobs" | "Projects" | "Technologies";

interface TimelinePageProps {
  certificates: Certificate[];
  jobs: Job[];
  projects: Project[];
  technologies: Technology[];
  selectedEventTypes: EventType[];
  onSelectedEventTypesChanged: (newSelection: EventType[]) => void;
}
