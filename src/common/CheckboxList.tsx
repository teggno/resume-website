import * as React from "react";
import { checkboxListItem } from "../css";
import { difference } from "ramda";

export default function CheckboxList<T>(props: CheckboxListProps<T>) {
  return (
    <TemplatedCheckboxList
      allItems={props.allItems}
      selectedItems={props.selectedItems}
      onChange={props.onChange}
      keyOf={props.nameOf}
    >
      {props.nameOf}
    </TemplatedCheckboxList>
  );
}

export function TemplatedCheckboxList<T>(props: TemplatedCheckboxListProps<T>) {
  return (
    <>
      {props.allItems.map(item => (
        <React.Fragment key={props.keyOf(item)}>
          <label className={checkboxListItem + " db lh-copy"}>
            <input
              className="mr1 mr2-ns dib v-mid"
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
            <span className="dib v-mid">{props.children(item)}</span>
          </label>
          {"\n" /* needed because otherwise the labels don't wrap */}
        </React.Fragment>
      ))}
    </>
  );
}

interface CheckboxListProps<T> {
  allItems: T[];
  selectedItems: T[];
  onChange: (newSelection: T[]) => void;
  nameOf: (item: T) => string;
}

interface TemplatedCheckboxListProps<T> {
  allItems: T[];
  selectedItems: T[];
  onChange: (newSelection: T[]) => void;
  keyOf: (item: T) => string;
  children: (item: T) => any;
}
