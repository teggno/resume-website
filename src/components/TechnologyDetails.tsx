import React from "react";
import { Technology } from "../Model";
import { ProjectDetails } from "./ProjectDetails";
import { wrappingList, wrappingListItem, card, cardTitle } from "../css";
import Timeline from "./Timeline";
import nthColor from "../Colors";
import { isElementInViewport } from "../DomHelpers";
import "./TechnologyDetails.css";

const now = new Date();

export default (props: { technology: Technology }) => {
  const { technology: t } = props;
  return (
    <React.Fragment>
      <h2>My {t.name} experience</h2>
      <div>
        <Timeline
          events={t.projects.map((prj, i) => {
            const { period, title } = prj,
              from = period.from.startTime(),
              to = period.to ? period.to.endTime() : now;
            return {
              from: from,
              to: to,
              label: `${title}, ${formatDateAsYearMonth(
                from
              )} - ${formatDateAsYearMonth(to)}`,
              color: nthColor(i),
              projectIndex: i
            };
          })}
          to={now}
          formatAxisLabel={formatDateAsYearMonth}
          onEventClicked={e => {
            const card = findableCard((e as any).projectIndex).find();
            if (!card) return;
            if (!isElementInViewport(card))
              card.scrollIntoView({ behavior: "smooth" });
            const oldClassName = card.className;
            card.className += " flashing";
            setTimeout(() => {
              card.className = oldClassName;
            }, 250);
          }}
        />
      </div>
      <div>
        <h3>Projects:</h3>
        <ul className={wrappingList}>
          {t.projects.map((prj, i) =>
            findableCard(i).makeFindable(
              <li key={prj.title} className={wrappingListItem + " flashing-card"}>
                <div className={card}>
                  <h4 className={cardTitle}>{prj.title}</h4>
                  <ProjectDetails project={prj} technologyName={t.name} />
                </div>
              </li>
            )
          )}
        </ul>
      </div>
      <div>
        <h3>Jobs:</h3>
        <ul>
          {t.jobs.map((j, i) => (
            <li key={i}>
              {j.title} at {j.company}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

function formatDateAsYearMonth(d: Date) {
  return `${d.getFullYear()}/${d.getMonth() + 1}`;
}

// The idea behind this function is to keep adding the data-project-item
// attribute together with retrieving the card using the same attribute.
function findableCard(index: number) {
  return {
    makeFindable: (card: any) =>
      React.cloneElement(card, { "data-project-index": index }),
    find: () => document.querySelector(`[data-project-index='${index}']`)
  };
}


