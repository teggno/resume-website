/** Wrapper mostly used for a button and a list of checkboxes where the button
 * checks all or none of the checboxes. */
export default function AllNone<T>(props: {
  children: (
    handleToggleClick: () => void,
    selectionStatus: SelectionStatus
  ) => any;
  allItems: T[];
  selectedItems: T[];
  onChange: ((newSelection: T[]) => void);
}) {
  return props.children(() => {
    props.onChange(
      getSelectionState(props.selectedItems.length, props.allItems.length) ===
        SelectionStatus.None
        ? props.allItems
        : []
    );
  }, getSelectionState(props.selectedItems.length, props.allItems.length));
}

function getSelectionState(selectedCount: number, totalCount: number) {
  return selectedCount === 0
    ? SelectionStatus.None
    : selectedCount === totalCount
    ? SelectionStatus.All
    : SelectionStatus.Some;
}
export enum SelectionStatus {
  None = "None",
  Some = "Some",
  All = "All"
}
