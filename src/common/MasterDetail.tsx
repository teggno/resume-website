import React from "react";
import { isElementTopLeftInViewport } from "../DomHelpers";
import "./MasterDetail.css";

export class MasterDetail extends React.Component<MasterDetailProps> {
  constructor(props: Readonly<MasterDetailProps>) {
    super(props);
    this.detailsRef = React.createRef();
  }

  render() {
    console.debug("MasterDetail render");
    {
      /* overflow-hidden because the way off canvas of the list is done would
         otherwise cause horizontal scrollbars */
    }
    return (
      <div className="overflow-hidden">
        <div
          className={
            "flex offc" + (this.props.detailsVisible ? " off on-ns" : "")
          }
        >
          <div className="w-50 w-30-l ph2">{this.props.master}</div>
          <div
            className={"w-50 w-70-l pl4-ns scroll-hack"}
            ref={this.detailsRef}
          >
            {this.props.detailsVisible ? (
              this.props.detail
            ) : (
              <div className="relative">
                <div className="f2 fixed mt6 mw6 tc lh-copy">
                  Click an item in the list to the left to see what I used it
                  for.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    console.debug("MasterDetail.componentDidUpdate");
    this.scroll();
  }

  private scroll() {
    if (!this.props.detailsVisible) return;
    if (isElementTopLeftInViewport(this.detailsRef.current)) return;

    this.detailsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  private detailsRef: any = null;
}

interface MasterDetailProps {
  master: any;
  detail: any;
  detailsVisible: boolean;
  backToListRoute: string;
}
