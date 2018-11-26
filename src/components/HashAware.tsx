import React from "React";

export default class HashAware extends React.Component<
  HasAwareProps,
  { hash: string }
> {
  constructor(props: HasAwareProps) {
    super(props);

    this.hashChanged = this.hashChanged.bind(this);
    this.state = {
      hash: this.extractRelevantPartFromHash()
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", this.hashChanged);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.hashChanged);
  }

  private hashChanged() {
    const newValue = this.extractRelevantPartFromHash();
    if (newValue === this.state.hash) return;
    this.setState({ hash: newValue });
  }

  private extractRelevantPartFromHash() {
    return this.props.extractRelevantPart
      ? this.props.extractRelevantPart(window.location.hash)
      : window.location.hash;
  }

  render() {
    if (typeof this.props.children === "function")
      return this.props.children(this.state.hash);
    return React.Children.only(this.props.children);
  }
}

interface HasAwareProps {
  extractRelevantPart?: (hash: string) => string;
}
