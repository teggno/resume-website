import React from "react";
import Filters from "./Filters";
import { Technology, TechnologyGroup } from "../Model";
import Link from "../common/Link";
import { link } from "../css";

export default function HomePage(props: {
  technologies: Technology[];
  onFiltersChange?: (technologies: Technology[], yearFrom: number) => void;
  selectedTechnologies: Technology[];
  yearFrom: number;
  technologyGroups?: TechnologyGroup[];
}) {
  return (
    <>
      <div className="bg-near-white pv4 pa5-ns">
        <div className="ph2 tc tj-ns mw6 center ma">
          <h3 className="f2 fw1 pa0 ma0">
            Hi, I'm Christian, the software developer you might want to work
            with.
          </h3>
          <p className="f3 lh-copy pa0 ma0">
            If you want to find out what I can do for you, you can do so on this
            site. So please start by specifying what you're interested in.
          </p>
        </div>
      </div>
      <div className="pt4" style={{height: 2000}}>
        <Filters onChange={props.onFiltersChange} {...props} />
      </div>
    </>
  );
}
