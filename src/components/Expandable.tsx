import React from "react";

export class Expandable extends React.Component<any, { isExpanded: boolean }> {
  constructor(props: { children: any; isExpanded?: boolean }) {
    super(props);

    this.state = {
      isExpanded: !!props.isExpanded
    };
  }
  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          onClick={(() => {
            this.setState({ isExpanded: !this.state.isExpanded });
          }).bind(this)}
        >
          {this.state.isExpanded ? "Collapse" : "Expand"}
        </button>
        {this.state.isExpanded ? this.props.children : null}
      </React.Fragment>
    );
  }
}