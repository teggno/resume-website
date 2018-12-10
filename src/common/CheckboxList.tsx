import * as React from "react";
import { checkboxListItem } from "../css";
import { difference } from "ramda";

export function FunCheckboxList<T>(
  props: CheckboxListProps<T> & { nameOf: (item: T) => string }
) {
  return (
    <>
      {props.allItems.map(item => (
        <React.Fragment key={props.nameOf(item)}>
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
            <span className="dib v-mid">{props.nameOf(item)}</span>
          </label>
          {"\n" /* needed because otherwise the labels don't wrap */}
        </React.Fragment>
      ))}
    </>
  );
}

export default function CheckboxList<T extends { name: string }>(
  props: CheckboxListProps<T>
) {
  const newProps = { ...props, nameOf: (i: T) => i.name };
  return <FunCheckboxList {...newProps} />;
}

export interface CheckboxListProps<T> {
  allItems: T[];
  selectedItems: T[];
  onChange: (newSelection: T[]) => void;
}
