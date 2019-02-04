import React from "react";

export enum ThreeStateCheckboxStatus {
  None = "None",
  Some = "Some",
  All = "All"
}

/**
 * A checkbox that can not only be checked or unchecked but also in between aka
 * indeterminate.
 */
export default class ThreeStateCheckbox extends React.Component<
  ThreeStateCheckboxProps
> {
  constructor(props: ThreeStateCheckboxProps) {
    super(props);

    this.ref = React.createRef();
    this.onChange = this.onChange.bind(this);
  }

  static defaultProps: Partial<ThreeStateCheckboxProps> = {
    className: "",
    style: {},
    disabled: false,
    status: ThreeStateCheckboxStatus.None
  };

  private ref: any;

  componentDidUpdate() {
    this.ref.current.indeterminate =
      this.props.status === ThreeStateCheckboxStatus.Some;
  }

  render() {
    return (
      <input
        type="checkbox"
        ref={this.ref}
        className={this.props.className}
        style={this.props.style}
        checked={this.props.status !== ThreeStateCheckboxStatus.None}
        onChange={this.onChange}
        disabled={this.props.disabled}
        // Edge and IE don't change the `checked` value of a checkbox when
        // `indeterminate=true` hence the `onChange` event is not fired. So we
        // also raise this component's `onChange` event when it's clicked.
        onClick={this.onChange}
      />
    );
  }

  private onChange(e: any) {
    if (this.props.onChange)
      this.props.onChange(
        e.currentTarget.checked
          ? ThreeStateCheckboxStatus.All
          : ThreeStateCheckboxStatus.None
      );
  }
}

interface ThreeStateCheckboxProps {
  status: ThreeStateCheckboxStatus;
  className?: string;
  onChange?: (newStatus: ThreeStateCheckboxStatus) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}
