import React from "react";
import CheckboxList, { CheckboxListProps } from "../common/CheckboxList";
import { Technology, TechnologyGroup } from "../Model";
import { deemphasizedButton, grid4 } from "../css";
import { filter, union } from "ramda";
import AllNone from "../common/AllNone";

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
      {(handleToggleClick, moreThanHalf) => {
        return (
          <>
            <div className="ph2">
              <button
                onClick={handleToggleClick}
                className={deemphasizedButton + " w5"}
              >
                {moreThanHalf
                  ? `Select none (${props.selectedItems.length}/${
                      props.allItems.length
                    })`
                  : `Select all (${props.selectedItems.length}/${
                      props.allItems.length
                    })`}
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
            {handleToggleClick => (
              <div className="pa2">
                <div className="pb1">
                  <button
                    className={deemphasizedButton + " w-100 dib"}
                    onClick={handleToggleClick}
                  >
                    {`${g.groupName} (${p.selectedItems.length}/${
                      p.allItems.length
                    })`}
                  </button>
                </div>
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
