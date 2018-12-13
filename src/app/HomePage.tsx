import React from "react";
import Filters from "./Filters";
import { Technology, TechnologyGroup } from "../Model";
import { bigButton, normalButton } from "../css";
import { scrollIntoView, navBarHeight } from "../scroll";
import Link from "../common/Link";

export default function HomePage(props: {
  technologies: Technology[];
  onFiltersChange?: (technologies: Technology[], yearFrom: number) => void;
  selectedTechnologies: Technology[];
  yearFrom: number;
  technologyGroups?: TechnologyGroup[];
}) {
  const filterDiv = React.createRef() as any;
  return (
    <>
      <div className="bg-near-white pv4 pa5-ns" style={{height: window.innerHeight - navBarHeight()}}>
        <div className="ph2 tc tj-ns mw6 center ma">
          <h3 className="f2 normal pa0 ma0 lh-copy">
            Hi, I'm Christian, the software developer you might want to work
            with.
          </h3>
          <p className="f3 lh-copy mb0">
            I've got quite a bit of experience in web and desktop development as
            well as in data related work. You can use this site to focus on
            what's relevant to you.
          </p>
          <div className="pt4 tc">
            <a
              href="#filterDiv"
              className={bigButton}
              onClick={e => {
                scrollIntoView(filterDiv.current);
                e.preventDefault();
              }}
            >
              Find out how I can help you
            </a>
          </div>
        </div>
      </div>
      <div
        className="pt4 ph4-ns"
        style={{ height: 2000 }}
        ref={filterDiv}
        id="filterDiv"
      >
        <Filters onChange={props.onFiltersChange} {...props} />
        <div className="tc">
          <Link
            className={normalButton}
            href="#technologies"
            scrollToTop={true}
          >
            See technologies
          </Link>{" "}
          <Link className={normalButton} href="#projects" scrollToTop={true}>
            See projects
          </Link>{" "}
          <Link className={normalButton} href="#timeline" scrollToTop={true}>
            See my timeline
          </Link>
        </div>
      </div>
    </>
  );
}
