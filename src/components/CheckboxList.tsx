import * as React from "react";
import * as R from "ramda";
import "./CheckboxList.css";

export function CheckboxList<T extends { name: string }>(
  props: CheckboxListProps<T>
) {
  return (
    <React.Fragment>
      {props.allItems.map(item => (
        <React.Fragment>
          <label className="checkbox-list-item" key={item.name}>
            <input
              type="checkbox"
              checked={props.selectedItems.indexOf(item) !== -1}
              onChange={event => {
                props.selectionChanged(
                  event.currentTarget.checked
                    ? [...props.selectedItems, item]
                    : R.difference(props.selectedItems, [item])
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
