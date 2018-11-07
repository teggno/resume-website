import * as React from "react";
import { CheckboxListProps, CheckboxList } from "./CheckboxList";

export interface TechnologyFilterProps<T> extends CheckboxListProps<T>{
  isAllNoneButtonAll: boolean
}

export class TechnologyFilter<
  T extends { name: string }
> extends React.Component<TechnologyFilterProps<T>, { all: boolean }> {
  constructor(props: TechnologyFilterProps<T>) {
    super(props);

    this.state = {
      all: props.isAllNoneButtonAll
    };
  }

  render() {
    return (
      <fieldset>
        <legend>Technologies</legend>
        <button type="button" onClick={this.allNoneClicked.bind(this)}>
          {this.state.all ? "All" : "None"}
        </button>
        <CheckboxList
          allItems={this.props.allItems}
          selectedItems={this.props.selectedItems}
          selectionChanged={this.props.selectionChanged}
        />
      </fieldset>
    );
  }

  allNoneClicked() {
    this.setState({ all: !this.state.all });
    this.props.selectionChanged(this.state.all ? this.props.allItems : []);
  }
}
