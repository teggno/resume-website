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
      itemClassName={props.itemClassName}
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
          {/*
          the wrapping <div> below is needed to have individual lines.
          This could also be achieved by making the label display:block
          but then the clickable surface of the labels would be too wide.
          */}
          <div className={props.itemClassName}>
            <label className={checkboxListItem + " pointer lh-copy"}>
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
          </div>
          {"\n" /* needed because otherwise the labels don't wrap */}
        </React.Fragment>
      ))}
    </>
  );
}

interface CheckboxListProps<T> extends CheckboxListPropsBase<T> {
  nameOf: (item: T) => string;
}

interface TemplatedCheckboxListProps<T> extends CheckboxListPropsBase<T> {
  keyOf: (item: T) => string;
  children: (item: T) => any;
}

interface CheckboxListPropsBase<T> {
  allItems: T[];
  selectedItems: T[];
  onChange: (newSelection: T[]) => void;
  itemClassName?: string;
}
