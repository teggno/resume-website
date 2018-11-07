import * as React from "react";
import * as R from "ramda";

export function CheckboxList<T extends {name: string}>(props: CheckboxListProps<T>) {
  return (
    <React.Fragment>
      {props.allItems.map(item => (
        <label key={item.name}>
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
        </label>
      ))}
    </React.Fragment>
  );
}

export interface CheckboxListProps<T> {
  allItems: T[];
  selectedItems: T[];
  selectionChanged: (newSelection: T[]) => void;
}