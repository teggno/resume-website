import React from "react";
import { ArrowDown, ArrowUp } from "./icons";

export class Expandable extends React.Component<ExpandableProps, any> {
  constructor(props: ExpandableProps) {
    super(props);

    this.state = {
      isExpanded: !!props.isExpanded
    };
  }
  render() {
    const expandedHeader = this.props.expandedHeader || "Less",
      collapsedHeader = this.props.collapsedHeader || "More";

    return (
      <React.Fragment>
        <button
        className="v-mid dtc"
          type="button"
          onClick={(() => {
            this.setState({ isExpanded: !this.state.isExpanded });
          }).bind(this)}
        >

        {this.state.isExpanded
            ? <ArrowUp/>
            : <ArrowDown/>}
          {this.state.isExpanded
            ? expandedHeader
            : collapsedHeader}
        </button>
        {this.state.isExpanded ? this.props.children : null}
      </React.Fragment>
    );
  }
}

interface ExpandableProps {
  isExpanded?: boolean;
  expandedHeader?: string;
  collapsedHeader?: string;
}
