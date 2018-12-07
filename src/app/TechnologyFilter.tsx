import React from "react";
import CheckboxList, { CheckboxListProps } from "../common/CheckboxList";
import { Technology, TechnologyGroup } from "../Model";
import { deemphasizedButton, grid4 } from "../css";
import { filter, union } from "ramda";
import AllNone, { SelectionStatus } from "../common/AllNone";
import ThreeStateCheckbox, {
  ThreeStateCheckboxStatus
} from "../common/ThreeStateCheckbox";

export default function TechnologyFilter(props: TechnologyFilterProps) {
  let allGroups: TechnologyGroup[];
  if (props.technologyGroups && props.technologyGroups.length) {
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
    <AllNone {...props}>
      {(handleToggleClick, selectionState) => {
        return (
          <>
            <div className="ph2">
              <button
                onClick={handleToggleClick}
                className={deemphasizedButton + " w4"}
              >
                {selectionState === SelectionStatus.None
                  ? `Select all`
                  : `Select none`}
              </button>
            </div>

            <div className={grid4 + (allGroups ? "" : " pa2")}>
              {allGroups ? (
                <Grouped {...props} allGroups={allGroups} />
              ) : (
                <Ungrouped {...props} />
              )}
            </div>
          </>
        );
      }}
    </AllNone>
  );
}

interface TechnologyFilterProps extends CheckboxListProps<Technology> {
  technologyGroups?: TechnologyGroup[];
}

function Grouped(
  props: { allGroups: TechnologyGroup[] } & TechnologyFilterProps
) {
  return (
    <>
      {props.allGroups.map(g => {
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
            {(handleToggleClick, selectionStatus) => (
              <div className="pa2">
                <label className="pb1 db">
                  <ThreeStateCheckbox
                    className="mr1 mr2-ns"
                    status={convertStatus(selectionStatus)}
                    onChange={handleToggleClick}
                  />
                  <strong>{g.groupName}</strong>
                </label>
                <CheckboxList {...p} />
              </div>
            )}
          </AllNone>
        );
      })}
    </>
  );
}

const Ungrouped = CheckboxList;

function convertStatus(selectionStatus: SelectionStatus) {
  return selectionStatus === SelectionStatus.All
    ? ThreeStateCheckboxStatus.All
    : selectionStatus === SelectionStatus.Some
    ? ThreeStateCheckboxStatus.Some
    : ThreeStateCheckboxStatus.None;
}
