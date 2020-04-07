import React, { useRef, useEffect } from "react";
import { isElementTopLeftInViewport } from "../DomHelpers";
import "./MasterDetail.css";
import { scrollBehavior } from "./scroll";

export default function MasterDetail({
  detail,
  detailsVisible,
  master,
}: MasterDetailProps) {
  const detailsRef: any = useRef(null);
  const scrolling = useRef(false);
  {
    /* overflow-hidden because the way off canvas of the list is done would
       otherwise cause horizontal scrollbars */
  }

  useEffect(scrollTop, [detail]);
  return (
    <div className="overflow-hidden pt2">
      <div className={"flex offc" + (detailsVisible ? " off on-ns" : "")}>
        <div className="w-50 w-30-l ph2 flex-none">{master}</div>
        <div className={"w-50 w-70-l pl4-ns flex-none"} ref={detailsRef}>
          {detailsVisible ? (
            detail
          ) : (
            <div className="f2 tc lh-copy pr4-ns">
              Click an item in the list for details.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function scrollTop() {
    if (scrolling.current) return;
    if (!detailsVisible) return;
    if (isElementTopLeftInViewport(detailsRef.current)) return;

    scrolling.current = true;
    const onScroll = () => {
      if (window.scrollY === 0) {
        scrolling.current = false;
      }
    };
    window.addEventListener("scroll", onScroll);
    window.scroll({
      behavior: scrollBehavior(),
      top: 0,
      left: 0,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }
}

interface MasterDetailProps {
  master: any;
  detail: any;
  detailsVisible: boolean;
  backToListRoute: string;
}
