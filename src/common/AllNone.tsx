/** Wrapper mostly used for a button and a list of checkboxes where the button
 * checks all or none of the checboxes. */
export default function AllNone<T>(props: {
  children: (handleToggleClick: () => void, moreThanHalf: boolean) => any;
  allItems: T[];
  selectedItems: T[];
  onChange: ((newSelection: T[]) => void);
}) {
  return props.children(() => {
    props.onChange(
      props.selectedItems.length * 2 > props.allItems.length
        ? []
        : props.allItems
    );
  }, props.selectedItems.length * 2 > props.allItems.length);
}
