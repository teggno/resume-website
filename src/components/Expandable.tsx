import React from "react";
import { ArrowDown, ArrowUp } from "./icons";

export class Expander extends React.Component<ExpanderProps, ExpanderState> {
  constructor(props: ExpanderProps) {
    super(props);

    this.state = { isExpanded: !!props.isExpanded };
  }
  render() {
    return (
      <React.Fragment>
        <Toggle
          isExpanded={this.state.isExpanded}
          onChange={isExpanded => this.setState({ isExpanded: isExpanded })}
        />
        <Expandable isExpanded={this.state.isExpanded}>
          {this.props.children}
        </Expandable>
      </React.Fragment>
    );
  }
}

function Toggle(props: ToggleProps) {
  const expandedHeader = props.expandedHeader || "Less",
    collapsedHeader = props.collapsedHeader || "More";

  return (
    <button
      className="v-mid dtc"
      type="button"
      onClick={() => {
        props.onChange(!props.isExpanded);
      }}
    >
      {props.isExpanded ? <ArrowUp /> : <ArrowDown />}
      {props.isExpanded ? expandedHeader : collapsedHeader}
    </button>
  );
}

class Expandable extends React.Component<ExpanderProps> {
  constructor(props: ExpanderProps) {
    super(props);

    this.ref = React.createRef<{}>();
  }

  private ref: any;

  render() {
    return (
      <React.Fragment>
        <div
          ref={this.ref}
          style={{
            height: this.props.isExpanded ? this.ref.current.scrollHeight : 0,
            overflowY: "hidden",
            transition: "height .4s"
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

interface ExpanderProps {
  isExpanded?: boolean;
}

interface ToggleProps {
  isExpanded?: boolean;
  onChange: (isExpanded: boolean) => void;
  expandedHeader?: string;
  collapsedHeader?: string;
}

interface ExpanderState {
  isExpanded: boolean;
}
