import React from "react";
import { ArrowDown, ArrowUp } from "./icons/Icons";
import { deemphasizedButton } from "../css";

export class Expander extends React.Component<ExpanderProps, ExpanderState> {
  constructor(props: ExpanderProps) {
    super(props);

    this.state = { isExpanded: !!props.isExpanded };
  }
  render() {
    return (
      <>
        <Toggle
          isExpanded={this.state.isExpanded}
          onChange={isExpanded => this.setState({ isExpanded: isExpanded })}
        />
        <Expandable isExpanded={this.state.isExpanded}>
          {this.props.children}
        </Expandable>
      </>
    );
  }
}

function Toggle(props: ToggleProps) {
  const expandedHeader = props.expandedHeader || "Less",
    collapsedHeader = props.collapsedHeader || "More";

  return (
    <a
      href="#"
      className={deemphasizedButton + " v-mid"}
      onClick={e => {
        props.onChange(!props.isExpanded);
        e.preventDefault();
      }}
    >
      {props.isExpanded ? (
        <ArrowUp addPaddingLeft={false} />
      ) : (
        <ArrowDown addPaddingLeft={false} />
      )}
      {/* Added a span and gave it a width to retain the same width no matter the label */}
      <span className="w2 dib">
        {props.isExpanded ? expandedHeader : collapsedHeader}
      </span>
    </a>
  );
}

class Expandable extends React.Component<ExpanderProps> {
  constructor(props: ExpanderProps) {
    super(props);

    this.ref = React.createRef();
  }

  private ref: any;

  render() {
    return (
      <div
        ref={this.ref}
        className={this.props.className}
        style={{
          height: this.props.isExpanded ? this.ref.current.scrollHeight : 0,
          overflowY: "hidden",
          transition: "height .4s"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

interface ExpanderProps {
  isExpanded?: boolean;
  className?: string;
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
