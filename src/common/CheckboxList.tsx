import * as React from "react";
import { checkboxListItem } from "../css";
import { difference } from "ramda";

export default function CheckboxList<T extends { name: string }>(
  props: CheckboxListProps<T>
) {
  return (
    <>
      {props.allItems.map(item => (
        <React.Fragment key={item.name}>
          <label className={checkboxListItem + " db lh-copy"}>
            <input
              className="mr2 dib"
              type="checkbox"
              checked={props.selectedItems.indexOf(item) !== -1}
              onChange={event => {
                props.onChange(
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
    </>
  );
}

export interface CheckboxListProps<T> {
  allItems: T[];
  selectedItems: T[];
  onChange: (newSelection: T[]) => void;
}
