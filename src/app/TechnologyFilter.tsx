import React from "react";
import CheckboxList, { CheckboxListProps } from "../common/CheckboxList";
import { Technology, TechnologyGroup } from "../Model";
import { deemphasizedButton } from "../css";
import { filter, union } from "ramda";
import AllNone from "../common/AllNone";

export default function TechnologyFilter(props: TechnologyFilterProps) {
  let allGroups: TechnologyGroup[];
  if (props.technologyGroups) {
    const groups = props.technologyGroups.filter(g =>
        g.technologies.some(t => props.allItems.some(tt => t === tt.name))
      ),
      inNoGroup = props.allItems
        .map(t => t.name)
        .filter(t => !groups.some(g => g.technologies.some(tt => tt === t)));
    allGroups = inNoGroup.length
      ? [...groups, { groupName: "Other", technologies: inNoGroup }]
      : groups;
  }
  return (
    <fieldset className="bn">
      <legend className="fw7 mb2">Technologies</legend>
      <AllNone {...props}>
        {(handleToggleClick, moreThanHalf) => {
          return (
            <>
              <div>
                <button
                  onClick={handleToggleClick}
                  className={deemphasizedButton + " w3"}
                >
                  {moreThanHalf ? "None" : "All"}
                </button>
              </div>

              {allGroups ? (
                grouped(allGroups, props)
              ) : (
                <CheckboxList {...props} />
              )}
            </>
          );
        }}
      </AllNone>
    </fieldset>
  );
}

interface TechnologyFilterProps extends CheckboxListProps<Technology> {
  technologyGroups?: TechnologyGroup[];
}

function grouped(allGroups: TechnologyGroup[], props: TechnologyFilterProps) {
  return allGroups.map(g => {
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
      <AllNone key={g.groupName} {...p}>
        {handleToggleClick => (
          <>
            <button onClick={handleToggleClick}>{g.groupName}</button>
            <CheckboxList {...p} />
          </>
        )}
      </AllNone>
    );
  });
}
