import React from "react";
import Filters from "./Filters";
import { Technology, TechnologyGroup } from "../Model";
import { normalButton } from "../css";
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
      <div className="pt4 ph4-ns" ref={filterDiv} id="filterDiv">
        <Filters onChange={props.onFiltersChange} {...props} />
        <div className="tc">
          <Link className={normalButton} href="#projects" scrollToTop={true}>
            See projects
          </Link>{" "}
          <Link
            className={normalButton}
            href="#technologies"
            scrollToTop={true}
          >
            See technologies
          </Link>{" "}
          <Link className={normalButton} href="#timeline" scrollToTop={true}>
            See my timeline
          </Link>
        </div>
      </div>
    </>
  );
}
