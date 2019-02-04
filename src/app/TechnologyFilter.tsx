import React from "react";
import CheckboxList from "../common/CheckboxList";
import { Technology, TechnologyGroup } from "./Model";
import { deemphasizedButton, grid4 } from "../css";
import { filter, union } from "ramda";
import AllNone, { SelectionStatus } from "../common/AllNone";
import ThreeStateCheckbox, {
  ThreeStateCheckboxStatus
} from "../common/ThreeStateCheckbox";
import GridCellsAutoPlacementCss from "../common/GridCellsAutoPlacementCss";
import { large, medium } from "../common/MediaQueries";

export default function TechnologyFilter(props: TechnologyFilterProps) {
  let allGroups: TechnologyGroup[],
    hasGroups = props.technologyGroups && props.technologyGroups.length;
  if (hasGroups && props.technologyGroups) {
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
            {hasGroups ? (
              <Grouped {...props} allGroups={allGroups} />
            ) : (
              <Ungrouped {...props} nameOf={t => t.name} />
            )}
          </>
        );
      }}
    </AllNone>
  );
}

function Grouped(
  props: { allGroups: TechnologyGroup[] } & TechnologyFilterProps
) {
  return (
    <div className={grid4}>
      <GridCellsAutoPlacementCss
        cellCount={props.allGroups.length}
        cellCssSelector=".cell"
        defaultColumns={1}
        defs={[{ columns: 4, query: large }]}
      />

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
              <div className="pa2 cell">
                <div>
                  <label className="pb1 pointer">
                    <ThreeStateCheckbox
                      className="mr1 mr2-ns v-mid"
                      status={convertStatus(selectionStatus)}
                      onChange={handleToggleClick}
                    />
                    <strong className="v-mid">{g.groupName}</strong>
                  </label>
                </div>
                <CheckboxList {...p} nameOf={n => n.name} />
              </div>
            )}
          </AllNone>
        );
      })}
    </div>
  );
}

function Ungrouped(
  props: TechnologyFilterProps & { nameOf: (tech: Technology) => string }
) {
  return (
    <div className={grid4 + " pa2"}>
      <GridCellsAutoPlacementCss
        cellCount={props.allItems.length}
        cellCssSelector=".cell"
        defaultColumns={1}
        defs={[{ columns: 4, query: large }, { columns: 2, query: medium }]}
      />
      <CheckboxList {...props} itemClassName="cell" />
    </div>
  );
}

function convertStatus(selectionStatus: SelectionStatus) {
  return selectionStatus === SelectionStatus.All
    ? ThreeStateCheckboxStatus.All
    : selectionStatus === SelectionStatus.Some
    ? ThreeStateCheckboxStatus.Some
    : ThreeStateCheckboxStatus.None;
}

interface TechnologyFilterProps {
  technologyGroups?: TechnologyGroup[];
  allItems: Technology[];
  selectedItems: Technology[];
  onChange: (newSelection: Technology[]) => void;
}
