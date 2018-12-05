import React from "react";
import CheckboxList, { CheckboxListProps } from "../common/CheckboxList";
import { Technology } from "../Model";
import { deemphasizedButton } from "../css";
import { filter, union } from "ramda";
import AllNone from "../common/AllNone";

export default function TechnologyFilter(props: CheckboxListProps<Technology>) {
  const groups = [
      {
        name: "Programming Languages",
        technologies: ["c#", "TypeScript", "JavaScript"]
      },
      { name: "Web Frontend", technologies: ["Bootstrap", "CSS", "HTML"] },
      {
        name: "Backend",
        technologies: ["SQL Server", "SQL Server Integrateion Services"]
      }
    ].filter(g =>
      g.technologies.some(t => props.allItems.some(tt => t === tt.name))
    ),
    inNoGroup = props.allItems
      .map(t => t.name)
      .filter(t => !groups.some(g => g.technologies.some(tt => tt === t))),
    allGroups = inNoGroup.length
      ? [...groups, { name: "Other", technologies: inNoGroup }]
      : groups;
  return (
    <fieldset className="bn">
      <legend className="fw7 mb2">Technologies</legend>
      <AllNone {...props}>
        {(handleToggleClick, moreThanHalf) => {
          return (
            <>
              <div>
                <button onClick={handleToggleClick} className={deemphasizedButton + " w3"}>
                  {moreThanHalf ? "None" : "All"}
                </button>
              </div>

              {allGroups.map(g => {
                const techsOfGroup = filter<Technology>(i =>
                    g.technologies.some(ii => ii === i.name)
                  ),
                  techsNotInGroup = filter<Technology>(
                    i => !g.technologies.some(ii => ii === i.name)
                  ),
                  p = {
                    allItems: techsOfGroup(props.allItems),
                    selectedItems: techsOfGroup(props.selectedItems),
                    onChange: (newSelection: Technology[]) => {
                      newSelection = union(
                        techsNotInGroup(props.selectedItems),
                        newSelection
                      );
                      props.onChange(newSelection);
                    }
                  };
                return (
                  <AllNone key={g.name} {...p}>
                    {handleToggleClick => (
                      <>
                        <button onClick={handleToggleClick}>{g.name}</button>
                        <CheckboxList {...p} />
                      </>
                    )}
                  </AllNone>
                );
              })}
            </>
          );
        }}
      </AllNone>
    </fieldset>
  );
}


