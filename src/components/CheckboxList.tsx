import * as React from "react";
import { checkboxListItem } from "../css";
import { difference } from "ramda";

export function CheckboxList<T extends { name: string }>(
  props: CheckboxListProps<T>
) {
  return (
    <React.Fragment>
      {props.allItems.map(item => (
        <React.Fragment key={item.name}>
          <label className={checkboxListItem}>
            <input
              type="checkbox"
              checked={props.selectedItems.indexOf(item) !== -1}
              onChange={event => {
                props.selectionChanged(
                  event.currentTarget.checked
                    ? [...props.selectedItems, item]
                    : difference(props.selectedItems, [item])
                );
              }}
            />
            {item.name}
          </label>{"\n"/* needed because otherwise the labels don't wrap */}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

export interface CheckboxListProps<T> {
  allItems: T[];
  selectedItems: T[];
  selectionChanged: (newSelection: T[]) => void;
}
