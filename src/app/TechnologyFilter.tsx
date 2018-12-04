import React from "react";
import CheckboxList, { CheckboxListProps } from "../common/CheckboxList";
import { Technology } from "../Model";

export default function TechnologyFilter(props: CheckboxListProps<Technology>) {
  return (
    <fieldset>
      <legend>Technologies</legend>
      <div>
        <button type="button" onClick={allNoneClicked}>
          {lessThanHalfChecked() ? "All" : "None"}
        </button>
      </div>
      <CheckboxList
        allItems={props.allItems}
        selectedItems={props.selectedItems}
        selectionChanged={props.selectionChanged}
      />
    </fieldset>
  );

  function allNoneClicked() {
    props.selectionChanged(lessThanHalfChecked() ? props.allItems : []);
  }

  function lessThanHalfChecked() {
    return props.selectedItems.length * 2 < props.allItems.length;
  }
}
